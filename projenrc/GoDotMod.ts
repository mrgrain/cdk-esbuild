import { existsSync, readFileSync } from 'fs';
import { Project, TextFile } from 'projen';

/**
 * Options for `GoDotMod`.
 */
export interface GoDotModOptions {
  /**
   * Path of the go.mod file, relative to the project root.
   *
   * @default "go.mod"
   */
  readonly filePath?: string;

  /**
   * The minimum version of Go required by the module, e.g. "1.25".
   *
   * A more specific existing version (e.g. "1.25.0" written by `go mod tidy`)
   * is preserved.
   */
  readonly goVersion: string;

  /**
   * The module path, e.g. "github.com/user/repo".
   */
  readonly moduleName: string;
}

/**
 * A projen component managing a go.mod file.
 *
 * `require()` and `replace()` declare expectations. If the file already
 * exists on disk (e.g. after `go mod tidy` reformatted it and added indirect
 * dependencies), it is parsed into an AST and expectations are applied to it,
 * preserving the current structure and any additional contents. If no file
 * exists, the same expectations are applied to an empty AST.
 */
export class GoDotMod extends TextFile {
  private readonly requires: {
    [modulePath: string]: string;
  } = {};

  private readonly replaces: {
    [pkg: string]: {
      modulePath: string;
      moduleVersion: string | undefined;
      replacementPath: string | undefined;
      replacementVersion: string | undefined;
    };
  } = {};


  public constructor(project: Project, private readonly options: GoDotModOptions) {
    super(project, options.filePath ?? 'go.mod', {
      marker: true,
      committed: true,
      readonly: false,
    });
  }

  /**
   * Declare a required module.
   *
   * If the module is already present in the file, its version is updated in
   * place. Otherwise a new require directive is added.
   *
   * @param pkg The module and expected version, e.g. "github.com/aws/aws-cdk-go/awscdk/v2@v2.100.0"
   */
  public require(pkg: string) {
    const [modulePath, moduleVersion] = pkg.split('@');
    this.requires[modulePath] = moduleVersion;
  }

  /**
   * Declare a module replacement.
   *
   * If a replace directive for the same module and version is already present
   * in the file, its replacement is updated in place. Otherwise a new replace
   * directive is added.
   *
   * @param pkg The module to replace, with an optional version, e.g. "github.com/user/repo@v0.0.0-unpublished"
   * @param replacement The replacement path, with an optional version, e.g. "./dist/go/repo"
   */
  public replace(pkg: string, replacement: string) {
    const [modulePath, moduleVersion] = pkg.split('@');
    const [replacementPath, replacementVersion] = replacement.split('@');
    this.replaces[pkg] = {
      modulePath,
      moduleVersion,
      replacementPath,
      replacementVersion,
    };
  }

  protected synthesizeContent(): string {
    const existing = this.tryReadExistingFile();
    const ast = existing !== undefined ? GoModAst.parse(existing) : new GoModAst();

    if (this.marker) {
      ast.ensureMarker(`// ${this.marker}`);
    }

    ast.setModule(this.options.moduleName);

    // keep a more specific existing go version (e.g. `go mod tidy`
    // expands "1.25" to "1.25.0"), only rewrite on actual mismatch
    const goVersion = ast.goVersion;
    const goSatisfied = goVersion !== undefined && (
      goVersion === this.options.goVersion
      || goVersion.startsWith(`${this.options.goVersion}.`)
    );
    if (!goSatisfied) {
      ast.setGoVersion(this.options.goVersion);
    }

    for (const [modulePath, version] of Object.entries(this.requires)) {
      ast.require(modulePath, version);
    }

    for (const { modulePath, moduleVersion, replacementPath, replacementVersion } of Object.values(this.replaces)) {
      ast.replace({ modulePath, moduleVersion, replacementPath: replacementPath ?? '', replacementVersion });
    }

    return ast.render();
  }

  /**
   * Read the current go.mod file from disk, if it exists and is not empty.
   */
  private tryReadExistingFile(): string | undefined {
    try {
      if (!existsSync(this.absolutePath)) {
        return undefined;
      }
      const content = readFileSync(this.absolutePath, 'utf-8');
      return content.trim() ? content : undefined;
    } catch {
      return undefined;
    }
  }
}

/**
 * An entry that could not be parsed, preserved verbatim.
 */
interface RawEntry {
  readonly raw: string;
}

/**
 * A single entry of a require directive.
 */
interface RequireEntry {
  /** The module path, e.g. "github.com/user/repo" */
  modulePath: string;

  /** The module version, e.g. "v1.2.3" */
  version: string;

  /** Trailing comment incl. leading whitespace, e.g. " // indirect" */
  suffix: string;
}

/**
 * A single entry of a replace directive.
 */
interface ReplaceEntry {
  /** The module path to replace, e.g. "github.com/user/repo" */
  modulePath: string;

  /**
   * The module version to replace.
   *
   * @default - the replacement applies to all versions of the module
   */
  moduleVersion?: string;

  /** The replacement module path or file path, e.g. "./dist/go/repo" */
  replacementPath: string;

  /**
   * The replacement module version.
   *
   * @default - no version, required when replacing with a local file path
   */
  replacementVersion?: string;
}

interface RawNode {
  readonly kind: 'raw';
  lines: string[];
}
interface ModuleNode {
  readonly kind: 'module';
  name: string;
}
interface GoNode {
  readonly kind: 'go';
  version: string;
}
interface RequireNode {
  readonly kind: 'require';
  block: boolean;
  entries: Array<RequireEntry | RawEntry>;
}
interface ReplaceNode {
  readonly kind: 'replace';
  block: boolean;
  entries: Array<ReplaceEntry | RawEntry>;
}

type GoModNode = RawNode | ModuleNode | GoNode | RequireNode | ReplaceNode;

function isRawEntry(entry: object): entry is RawEntry {
  return 'raw' in entry;
}

/**
 * A simple AST for go.mod files.
 *
 * The file is a list of top-level statements. Statements this component
 * manages (module, go, require, replace) are parsed into structured nodes,
 * anything else (comments, exclude/retract, unknown lines) is preserved
 * verbatim as raw nodes. Statements are rendered separated by a blank line,
 * matching gofmt formatting.
 */
class GoModAst {
  /**
   * Parse the contents of a go.mod file into an AST.
   */
  public static parse(content: string): GoModAst {
    const ast = new GoModAst();

    let rawLines: string[] = [];
    const flushRaw = () => {
      if (rawLines.length > 0) {
        ast.nodes.push({ kind: 'raw', lines: rawLines });
        rawLines = [];
      }
    };

    // currently open `require ( ... )` / `replace ( ... )` block
    let block: RequireNode | ReplaceNode | undefined;
    // currently open block of any other directive, preserved verbatim
    let rawBlockLines: string[] | undefined;

    for (const rawLine of content.split('\n')) {
      const line = rawLine.trim();

      if (block) {
        if (line === ')') {
          block = undefined;
        } else if (line !== '') {
          if (block.kind === 'require') {
            block.entries.push(parseRequireEntry(line) ?? { raw: line });
          } else {
            block.entries.push(parseReplaceEntry(line) ?? { raw: line });
          }
        }
        continue;
      }

      if (rawBlockLines) {
        rawBlockLines.push(rawLine);
        if (line === ')') {
          ast.nodes.push({ kind: 'raw', lines: rawBlockLines });
          rawBlockLines = undefined;
        }
        continue;
      }

      // blank lines separate statements and are re-created by the renderer
      if (line === '') {
        flushRaw();
        continue;
      }

      const blockStart = line.match(/^(\w+)\s+\($/);
      if (blockStart) {
        flushRaw();
        const keyword = blockStart[1];
        if (keyword === 'require' || keyword === 'replace') {
          const newBlock: RequireNode | ReplaceNode = { kind: keyword, block: true, entries: [] };
          ast.nodes.push(newBlock);
          block = newBlock;
        } else {
          rawBlockLines = [rawLine];
        }
        continue;
      }

      const moduleMatch = line.match(/^module\s+(\S+)$/);
      if (moduleMatch) {
        flushRaw();
        ast.nodes.push({ kind: 'module', name: moduleMatch[1] });
        continue;
      }

      const goMatch = line.match(/^go\s+(\S+)$/);
      if (goMatch) {
        flushRaw();
        ast.nodes.push({ kind: 'go', version: goMatch[1] });
        continue;
      }

      if (line.startsWith('require ')) {
        const entry = parseRequireEntry(line.slice('require '.length));
        if (entry) {
          flushRaw();
          ast.nodes.push({ kind: 'require', block: false, entries: [entry] });
          continue;
        }
      }

      if (line.startsWith('replace ')) {
        const entry = parseReplaceEntry(line.slice('replace '.length));
        if (entry) {
          flushRaw();
          ast.nodes.push({ kind: 'replace', block: false, entries: [entry] });
          continue;
        }
      }

      // anything else is preserved verbatim
      rawLines.push(rawLine);
    }

    // salvage an unterminated block
    if (rawBlockLines) {
      ast.nodes.push({ kind: 'raw', lines: rawBlockLines });
    }
    flushRaw();

    return ast;
  }

  private readonly nodes: GoModNode[] = [];

  /**
   * The version of the go directive, if present.
   */
  public get goVersion(): string | undefined {
    return this.findNode('go')?.version;
  }

  /**
   * Ensure the file starts with the given marker comment.
   */
  public ensureMarker(marker: string) {
    const first = this.nodes[0];
    if (first?.kind === 'raw' && first.lines[0]?.startsWith('// ~~')) {
      first.lines[0] = marker;
      return;
    }
    this.nodes.unshift({ kind: 'raw', lines: [marker] });
  }

  /**
   * Set the module name, updating an existing directive in place.
   */
  public setModule(name: string) {
    const node = this.findNode('module');
    if (node) {
      node.name = name;
      return;
    }
    this.insertAfterLast({ kind: 'module', name }, []);
  }

  /**
   * Set the go version, updating an existing directive in place.
   */
  public setGoVersion(version: string) {
    const node = this.findNode('go');
    if (node) {
      node.version = version;
      return;
    }
    this.insertAfterLast({ kind: 'go', version }, ['module']);
  }

  /**
   * Declare a required module.
   *
   * An existing directive for the module is updated in place, keeping its
   * position and trailing comment. Otherwise a new standalone require
   * directive is added after the last require directive.
   */
  public require(modulePath: string, version: string) {
    for (const node of this.nodes) {
      if (node.kind !== 'require') {
        continue;
      }
      for (const entry of node.entries) {
        if (!isRawEntry(entry) && entry.modulePath === modulePath) {
          entry.version = version;
          return;
        }
      }
    }

    this.insertAfterLast({
      kind: 'require',
      block: false,
      entries: [{ modulePath, version, suffix: '' }],
    }, ['require', 'go', 'module']);
  }

  /**
   * Declare a module replacement.
   *
   * An existing directive for the same module path and version is updated in
   * place. Otherwise a new standalone replace directive is added after the
   * last replace directive, or at the end of the file.
   */
  public replace(replacement: ReplaceEntry) {
    for (const node of this.nodes) {
      if (node.kind !== 'replace') {
        continue;
      }
      for (const entry of node.entries) {
        if (!isRawEntry(entry)
          && entry.modulePath === replacement.modulePath
          && entry.moduleVersion === replacement.moduleVersion) {
          entry.replacementPath = replacement.replacementPath;
          entry.replacementVersion = replacement.replacementVersion;
          return;
        }
      }
    }

    this.insertAfterLast({
      kind: 'replace',
      block: false,
      entries: [{ ...replacement }],
    }, ['replace']);
  }

  /**
   * Render the AST back into go.mod file contents.
   */
  public render(): string {
    return this.nodes.map(renderNode).join('\n\n') + '\n';
  }

  private findNode<K extends GoModNode['kind']>(kind: K): Extract<GoModNode, { kind: K }> | undefined {
    return this.nodes.find((node): node is Extract<GoModNode, { kind: K }> => node.kind === kind);
  }

  /**
   * Insert a node after the last node of the first matching kind.
   * Falls back to the end of the file.
   */
  private insertAfterLast(node: GoModNode, afterKinds: Array<GoModNode['kind']>) {
    for (const kind of afterKinds) {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        if (this.nodes[i].kind === kind) {
          this.nodes.splice(i + 1, 0, node);
          return;
        }
      }
    }
    this.nodes.push(node);
  }
}

function parseRequireEntry(text: string): RequireEntry | undefined {
  const match = text.match(/^(\S+)\s+(\S+?)(\s*\/\/.*)?$/);
  if (!match) {
    return undefined;
  }
  return {
    modulePath: match[1],
    version: match[2],
    suffix: match[3] ?? '',
  };
}

function parseReplaceEntry(text: string): ReplaceEntry | undefined {
  const match = text.match(/^(\S+)(?:\s+(\S+))?\s*=>\s*(\S+)(?:\s+(\S+))?$/);
  if (!match) {
    return undefined;
  }
  return {
    modulePath: match[1],
    moduleVersion: match[2],
    replacementPath: match[3],
    replacementVersion: match[4],
  };
}

function renderNode(node: GoModNode): string {
  switch (node.kind) {
    case 'raw':
      return node.lines.join('\n');
    case 'module':
      return `module ${node.name}`;
    case 'go':
      return `go ${node.version}`;
    case 'require':
      return renderDirective('require', node.block, node.entries.map(renderRequireEntry));
    case 'replace':
      return renderDirective('replace', node.block, node.entries.map(renderReplaceEntry));
  }
}

function renderDirective(keyword: string, block: boolean, entries: string[]): string {
  if (!block && entries.length === 1) {
    return `${keyword} ${entries[0]}`;
  }
  return [
    `${keyword} (`,
    ...entries.map((entry) => `\t${entry}`),
    ')',
  ].join('\n');
}

function renderRequireEntry(entry: RequireEntry | RawEntry): string {
  if (isRawEntry(entry)) {
    return entry.raw;
  }
  return `${entry.modulePath} ${entry.version}${entry.suffix}`;
}

function renderReplaceEntry(entry: ReplaceEntry | RawEntry): string {
  if (isRawEntry(entry)) {
    return entry.raw;
  }
  const lhs = [entry.modulePath, entry.moduleVersion].filter(Boolean).join(' ');
  const rhs = [entry.replacementPath, entry.replacementVersion].filter(Boolean).join(' ');
  return `${lhs} => ${rhs}`;
}
