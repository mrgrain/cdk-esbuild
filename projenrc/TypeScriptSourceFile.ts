import { FileBase, FileBaseOptions, Project as ProjenProject } from 'projen';
import { execCapture } from 'projen/lib/util';
import { Project, SourceFile } from 'ts-morph';

interface TypeScriptSourceFileOptions extends Omit<FileBaseOptions, 'readonly'> {
  source: string;
  transformer?: (sourcefile: SourceFile) => void;
  format?: boolean;
  marker?: boolean;
}

export class TypeScriptSourceFile extends FileBase {
  public readonly options: TypeScriptSourceFileOptions;

  constructor(project: ProjenProject, filePath: string, options: TypeScriptSourceFileOptions) {
    super(project, filePath, { ...options, readonly: false });

    this.options = {
      format: true,
      marker: true,
      ...options,
    };
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
    execCapture(`npx eslint --ext .ts --fix ${this.absolutePath}`, { cwd: outdir });
  }
}
