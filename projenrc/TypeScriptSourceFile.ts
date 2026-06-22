import { Component, FileBase, FileBaseOptions, javascript, Project as ProjenProject, Task } from 'projen';
import { execCapture } from 'projen/lib/util';
import type { IConstruct } from 'projenConstructs';
import { Project, SourceFile } from 'ts-morph';

interface TypeScriptSourceFileOptions extends Omit<FileBaseOptions, 'readonly'> {
  source: string;
  transformer?: (sourcefile: SourceFile) => void;
  format?: boolean;
  marker?: boolean;
}

export class TypeScriptSourceFile extends FileBase {
  public readonly options: TypeScriptSourceFileOptions;
  private readonly task: Task;

  constructor(project: ProjenProject, filePath: string, options: TypeScriptSourceFileOptions) {
    super(project, filePath, { ...options, readonly: false });

    this.options = {
      format: true,
      marker: true,
      ...options,
    };

    this.task = TypeScriptSourceFileLinter.singleton(project).task;

    const eslint = javascript.Eslint.of(project);
    eslint?.addOverride({
      files: [filePath],
      rules: {
        '@stylistic/max-len': 'off',
      },
    });
  }

  protected synthesizeContent(): string {
    const tsProject = new Project({
      tsConfigFilePath: 'tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });

    const sourceFile = tsProject.addSourceFileAtPath(this.options.source);

    if (this.options.transformer) {
      this.options.transformer(sourceFile);
    }

    return [
      ...(this.options.marker ? [`// ${this.marker}`] : []),
      '',
      sourceFile.getFullText(),
    ].join('\n');
  }

  public postSynthesize() {
    super.postSynthesize();

    const outdir = this.project.outdir;
    try {
      execCapture(this.project.runTaskCommand(this.task) + ' ' + this.absolutePath, { cwd: outdir });
    } catch (error: any) {
      const msg = error.stdout?.toString() ?? error.message;
      throw Error(msg);
    }
  }
}

export class TypeScriptSourceFileLinter extends Component {
  public readonly task: Task;

  public static singleton(scope: IConstruct): TypeScriptSourceFileLinter {
    const root = scope.node.root;
    return (root.node.findAll().find((c) => c instanceof TypeScriptSourceFileLinter) ??
      new TypeScriptSourceFileLinter(root)) as TypeScriptSourceFileLinter;
  }

  private constructor(scope: IConstruct) {
    super(scope, 'TypeScriptSourceFileLinter');

    this.task = this.project.addTask('lint:ts', {
      exec: 'npx eslint --ext .ts --fix $@',
      receiveArgs: true,
      env: {
        ESLINT_USE_FLAT_CONFIG: 'false',
      },
    });
  }
}
