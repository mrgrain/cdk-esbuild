// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".

export type Platform = 'browser' | 'node' | 'neutral'
export type Format = 'iife' | 'cjs' | 'esm'
export type Loader = 'base64' | 'binary' | 'copy' | 'css' | 'dataurl' | 'default' | 'empty' | 'file' | 'js' | 'json' | 'jsx' | 'local-css' | 'text' | 'ts' | 'tsx'
export type LogLevel = 'verbose' | 'debug' | 'info' | 'warning' | 'error' | 'silent'
export type Charset = 'ascii' | 'utf8'
export type Drop = 'console' | 'debugger'

interface CommonOptions {
  /** Documentation: https://esbuild.github.io/api/#sourcemap */
  readonly sourcemap?: boolean | 'linked' | 'inline' | 'external' | 'both';
  /** Documentation: https://esbuild.github.io/api/#legal-comments */
  readonly legalComments?: 'none' | 'inline' | 'eof' | 'linked' | 'external';
  /** Documentation: https://esbuild.github.io/api/#source-root */
  readonly sourceRoot?: string;
  /** Documentation: https://esbuild.github.io/api/#sources-content */
  readonly sourcesContent?: boolean;

  /** Documentation: https://esbuild.github.io/api/#format */
  readonly format?: Format;
  /** Documentation: https://esbuild.github.io/api/#global-name */
  readonly globalName?: string;
  /** Documentation: https://esbuild.github.io/api/#target */
  readonly target?: string | string[];
  /** Documentation: https://esbuild.github.io/api/#supported */
  readonly supported?: Record<string, boolean>;
  /** Documentation: https://esbuild.github.io/api/#platform */
  readonly platform?: Platform;

  /** Documentation: https://esbuild.github.io/api/#mangle-props */
  readonly mangleProps?: any;
  /** Documentation: https://esbuild.github.io/api/#mangle-props */
  readonly reserveProps?: any;
  /** Documentation: https://esbuild.github.io/api/#mangle-props */
  readonly mangleQuoted?: boolean;
  /** Documentation: https://esbuild.github.io/api/#mangle-props */
  readonly mangleCache?: Record<string, string | false>;
  /** Documentation: https://esbuild.github.io/api/#drop */
  readonly drop?: Drop[];
  /** Documentation: https://esbuild.github.io/api/#drop-labels */
  readonly dropLabels?: string[];
  /** Documentation: https://esbuild.github.io/api/#minify */
  readonly minify?: boolean;
  /** Documentation: https://esbuild.github.io/api/#minify */
  readonly minifyWhitespace?: boolean;
  /** Documentation: https://esbuild.github.io/api/#minify */
  readonly minifyIdentifiers?: boolean;
  /** Documentation: https://esbuild.github.io/api/#minify */
  readonly minifySyntax?: boolean;
  /** Documentation: https://esbuild.github.io/api/#line-limit */
  readonly lineLimit?: number;
  /** Documentation: https://esbuild.github.io/api/#charset */
  readonly charset?: Charset;
  /** Documentation: https://esbuild.github.io/api/#tree-shaking */
  readonly treeShaking?: boolean;
  /** Documentation: https://esbuild.github.io/api/#ignore-annotations */
  readonly ignoreAnnotations?: boolean;

  /** Documentation: https://esbuild.github.io/api/#jsx */
  readonly jsx?: 'transform' | 'preserve' | 'automatic';
  /** Documentation: https://esbuild.github.io/api/#jsx-factory */
  readonly jsxFactory?: string;
  /** Documentation: https://esbuild.github.io/api/#jsx-fragment */
  readonly jsxFragment?: string;
  /** Documentation: https://esbuild.github.io/api/#jsx-import-source */
  readonly jsxImportSource?: string;
  /** Documentation: https://esbuild.github.io/api/#jsx-development */
  readonly jsxDev?: boolean;
  /** Documentation: https://esbuild.github.io/api/#jsx-side-effects */
  readonly jsxSideEffects?: boolean;

  /** Documentation: https://esbuild.github.io/api/#define */
  readonly define?: { [key: string]: string };
  /** Documentation: https://esbuild.github.io/api/#pure */
  readonly pure?: string[];
  /** Documentation: https://esbuild.github.io/api/#keep-names */
  readonly keepNames?: boolean;

  /** Documentation: https://esbuild.github.io/api/#color */
  readonly color?: boolean;
  /** Documentation: https://esbuild.github.io/api/#log-level */
  readonly logLevel?: LogLevel;
  /** Documentation: https://esbuild.github.io/api/#log-limit */
  readonly logLimit?: number;
  /** Documentation: https://esbuild.github.io/api/#log-override */
  readonly logOverride?: Record<string, LogLevel>;

  /** Documentation: https://esbuild.github.io/api/#tsconfig-raw */
  readonly tsconfigRaw?: string | TsconfigOptions;
}

export interface TsconfigRaw {
  compilerOptions?: {
    alwaysStrict?: boolean;
    baseUrl?: string;
    experimentalDecorators?: boolean;
    importsNotUsedAsValues?: 'remove' | 'preserve' | 'error';
    jsx?: 'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev';
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    jsxImportSource?: string;
    paths?: Record<string, string[]>;
    preserveValueImports?: boolean;
    strict?: boolean;
    target?: string;
    useDefineForClassFields?: boolean;
    verbatimModuleSyntax?: boolean;
  };
}

export interface BuildOptions extends CommonOptions {
  /** Documentation: https://esbuild.github.io/api/#bundle */
  readonly bundle?: boolean;
  /** Documentation: https://esbuild.github.io/api/#splitting */
  readonly splitting?: boolean;
  /** Documentation: https://esbuild.github.io/api/#preserve-symlinks */
  readonly preserveSymlinks?: boolean;
  /** Documentation: https://esbuild.github.io/api/#outfile */
  readonly outfile?: string;
  /** Documentation: https://esbuild.github.io/api/#metafile */
  readonly metafile?: boolean;
  /** Documentation: https://esbuild.github.io/api/#outdir */
  readonly outdir?: string;
  /** Documentation: https://esbuild.github.io/api/#outbase */
  readonly outbase?: string;
  /** Documentation: https://esbuild.github.io/api/#external */
  readonly external?: string[];
  /** Documentation: https://esbuild.github.io/api/#packages */
  readonly packages?: 'external';
  /** Documentation: https://esbuild.github.io/api/#alias */
  readonly alias?: Record<string, string>;
  /** Documentation: https://esbuild.github.io/api/#loader */
  readonly loader?: { [ext: string]: Loader };
  /** Documentation: https://esbuild.github.io/api/#resolve-extensions */
  readonly resolveExtensions?: string[];
  /** Documentation: https://esbuild.github.io/api/#main-fields */
  readonly mainFields?: string[];
  /** Documentation: https://esbuild.github.io/api/#conditions */
  readonly conditions?: string[];
  /** Documentation: https://esbuild.github.io/api/#write */
  readonly write?: boolean;
  /** Documentation: https://esbuild.github.io/api/#allow-overwrite */
  readonly allowOverwrite?: boolean;
  /** Documentation: https://esbuild.github.io/api/#tsconfig */
  readonly tsconfig?: string;
  /** Documentation: https://esbuild.github.io/api/#out-extension */
  readonly outExtension?: { [ext: string]: string };
  /** Documentation: https://esbuild.github.io/api/#public-path */
  readonly publicPath?: string;
  /** Documentation: https://esbuild.github.io/api/#entry-names */
  readonly entryNames?: string;
  /** Documentation: https://esbuild.github.io/api/#chunk-names */
  readonly chunkNames?: string;
  /** Documentation: https://esbuild.github.io/api/#asset-names */
  readonly assetNames?: string;
  /** Documentation: https://esbuild.github.io/api/#inject */
  readonly inject?: string[];
  /** Documentation: https://esbuild.github.io/api/#banner */
  readonly banner?: { [type: string]: string };
  /** Documentation: https://esbuild.github.io/api/#footer */
  readonly footer?: { [type: string]: string };
  /** Documentation: https://esbuild.github.io/api/#working-directory */
  readonly absWorkingDir?: string;
  /** Documentation: https://esbuild.github.io/api/#node-paths */
  readonly nodePaths?: string[]; // The "NODE_PATH" variable from Node.js
}

export interface StdinOptions {
  contents: string | Uint8Array;
  resolveDir?: string;
  sourcefile?: string;
  loader?: Loader;
}

export interface Message {
  id: string;
  pluginName: string;
  text: string;
  location: Location | null;
  notes: Note[];

  /**
   * Optional user-specified data that is passed through unmodified. You can
   * use this to stash the original error, for example.
   */
  detail: any;
}

export interface Note {
  text: string;
  location: Location | null;
}

export interface Location {
  file: string;
  namespace: string;
  /** 1-based */
  line: number;
  /** 0-based, in bytes */
  column: number;
  /** in bytes */
  length: number;
  lineText: string;
  suggestion: string;
}

export interface OutputFile {
  readonly path: string;
  readonly contents: Uint8Array;
  readonly hash: string;
  /** "contents" as text (changes automatically with "contents") */
  readonly text: string;
}

export interface BuildResult<ProvidedOptions extends BuildOptions = BuildOptions> {
  errors: Message[];
  warnings: Message[];
  /** Only when "write: false" */
  outputFiles: OutputFile[] | (ProvidedOptions['write'] extends false ? never : undefined);
  /** Only when "metafile: true" */
  metafile: Metafile | (ProvidedOptions['metafile'] extends true ? never : undefined);
  /** Only when "mangleCache" is present */
  mangleCache: Record<string, string | false> | (ProvidedOptions['mangleCache'] extends Object ? never : undefined);
}

export interface BuildFailure extends Error {
  errors: Message[];
  warnings: Message[];
}

/** Documentation: https://esbuild.github.io/api/#serve-arguments */
export interface ServeOptions {
  port?: number;
  host?: string;
  servedir?: string;
  keyfile?: string;
  certfile?: string;
  fallback?: string;
  onRequest?: (args: ServeOnRequestArgs) => void;
}

export interface ServeOnRequestArgs {
  remoteAddress: string;
  method: string;
  path: string;
  status: number;
  /** The time to generate the response, not to send it */
  timeInMS: number;
}

/** Documentation: https://esbuild.github.io/api/#serve-return-values */
export interface ServeResult {
  port: number;
  host: string;
}

export interface TransformOptions extends CommonOptions {
  /** Documentation: https://esbuild.github.io/api/#sourcefile */
  readonly sourcefile?: string;
  /** Documentation: https://esbuild.github.io/api/#loader */
  readonly loader?: Loader;
  /** Documentation: https://esbuild.github.io/api/#banner */
  readonly banner?: string;
  /** Documentation: https://esbuild.github.io/api/#footer */
  readonly footer?: string;
}

export interface TransformResult<ProvidedOptions extends TransformOptions = TransformOptions> {
  code: string;
  map: string;
  warnings: Message[];
  /** Only when "mangleCache" is present */
  mangleCache: Record<string, string | false> | (ProvidedOptions['mangleCache'] extends Object ? never : undefined);
  /** Only when "legalComments" is "external" */
  legalComments: string | (ProvidedOptions['legalComments'] extends 'external' ? never : undefined);
}

export interface TransformFailure extends Error {
  errors: Message[];
  warnings: Message[];
}

export interface Plugin {
  name: string;
  setup: (build: PluginBuild) => (void | Promise<void>);
}

export interface PluginBuild {
  /** Documentation: https://esbuild.github.io/plugins/#build-options */
  initialOptions: BuildOptions;

  /** Documentation: https://esbuild.github.io/plugins/#resolve */
  resolve(path: string, options?: ResolveOptions): Promise<ResolveResult>;

  /** Documentation: https://esbuild.github.io/plugins/#on-start */
  onStart(callback: () =>
  (OnStartResult | null | void | Promise<OnStartResult | null | void>)): void;

  /** Documentation: https://esbuild.github.io/plugins/#on-end */
  onEnd(callback: (result: BuildResult) =>
  (OnEndResult | null | void | Promise<OnEndResult | null | void>)): void;

  /** Documentation: https://esbuild.github.io/plugins/#on-resolve */
  onResolve(options: OnResolveOptions, callback: (args: OnResolveArgs) =>
  (OnResolveResult | null | undefined | Promise<OnResolveResult | null | undefined>)): void;

  /** Documentation: https://esbuild.github.io/plugins/#on-load */
  onLoad(options: OnLoadOptions, callback: (args: OnLoadArgs) =>
  (OnLoadResult | null | undefined | Promise<OnLoadResult | null | undefined>)): void;

  /** Documentation: https://esbuild.github.io/plugins/#on-dispose */
  onDispose(callback: () => void): void;

  // This is a full copy of the esbuild library in case you need it
  esbuild: {
    context: typeof context;
    build: typeof build;
    buildSync: typeof buildSync;
    transform: typeof transform;
    transformSync: typeof transformSync;
    formatMessages: typeof formatMessages;
    formatMessagesSync: typeof formatMessagesSync;
    analyzeMetafile: typeof analyzeMetafile;
    analyzeMetafileSync: typeof analyzeMetafileSync;
    initialize: typeof initialize;
    version: typeof version;
  };
}

/** Documentation: https://esbuild.github.io/plugins/#resolve-options */
export interface ResolveOptions {
  pluginName?: string;
  importer?: string;
  namespace?: string;
  resolveDir?: string;
  kind?: ImportKind;
  pluginData?: any;
}

/** Documentation: https://esbuild.github.io/plugins/#resolve-results */
export interface ResolveResult {
  errors: Message[];
  warnings: Message[];

  path: string;
  external: boolean;
  sideEffects: boolean;
  namespace: string;
  suffix: string;
  pluginData: any;
}

export interface OnStartResult {
  errors?: PartialMessage[];
  warnings?: PartialMessage[];
}

export interface OnEndResult {
  errors?: PartialMessage[];
  warnings?: PartialMessage[];
}

/** Documentation: https://esbuild.github.io/plugins/#on-resolve-options */
export interface OnResolveOptions {
  filter: RegExp;
  namespace?: string;
}

/** Documentation: https://esbuild.github.io/plugins/#on-resolve-arguments */
export interface OnResolveArgs {
  path: string;
  importer: string;
  namespace: string;
  resolveDir: string;
  kind: ImportKind;
  pluginData: any;
}

export type ImportKind =
  | 'entry-point'

  // JS
  | 'import-statement'
  | 'require-call'
  | 'dynamic-import'
  | 'require-resolve'

  // CSS
  | 'import-rule'
  | 'composes-from'
  | 'url-token'

/** Documentation: https://esbuild.github.io/plugins/#on-resolve-results */
export interface OnResolveResult {
  pluginName?: string;

  errors?: PartialMessage[];
  warnings?: PartialMessage[];

  path?: string;
  external?: boolean;
  sideEffects?: boolean;
  namespace?: string;
  suffix?: string;
  pluginData?: any;

  watchFiles?: string[];
  watchDirs?: string[];
}

/** Documentation: https://esbuild.github.io/plugins/#on-load-options */
export interface OnLoadOptions {
  filter: RegExp;
  namespace?: string;
}

/** Documentation: https://esbuild.github.io/plugins/#on-load-arguments */
export interface OnLoadArgs {
  path: string;
  namespace: string;
  suffix: string;
  pluginData: any;
}

/** Documentation: https://esbuild.github.io/plugins/#on-load-results */
export interface OnLoadResult {
  pluginName?: string;

  errors?: PartialMessage[];
  warnings?: PartialMessage[];

  contents?: string | Uint8Array;
  resolveDir?: string;
  loader?: Loader;
  pluginData?: any;

  watchFiles?: string[];
  watchDirs?: string[];
}

export interface PartialMessage {
  id?: string;
  pluginName?: string;
  text?: string;
  location?: Partial<Location> | null;
  notes?: PartialNote[];
  detail?: any;
}

export interface PartialNote {
  text?: string;
  location?: Partial<Location> | null;
}

/** Documentation: https://esbuild.github.io/api/#metafile */
export interface Metafile {
  inputs: {
    [path: string]: {
      bytes: number;
      imports: {
        path: string;
        kind: ImportKind;
        external?: boolean;
        original?: string;
      }[];
      format?: 'cjs' | 'esm';
    };
  };
  outputs: {
    [path: string]: {
      bytes: number;
      inputs: {
        [path: string]: {
          bytesInOutput: number;
        };
      };
      imports: {
        path: string;
        kind: ImportKind | 'file-loader';
        external?: boolean;
      }[];
      exports: string[];
      entryPoint?: string;
      cssBundle?: string;
    };
  };
}

export interface FormatMessagesOptions {
  kind: 'error' | 'warning';
  color?: boolean;
  terminalWidth?: number;
}

export interface AnalyzeMetafileOptions {
  color?: boolean;
  verbose?: boolean;
}

export interface WatchOptions {
}

export interface BuildContext<ProvidedOptions extends BuildOptions = BuildOptions> {
  /** Documentation: https://esbuild.github.io/api/#rebuild */
  rebuild(): Promise<BuildResult<ProvidedOptions>>;

  /** Documentation: https://esbuild.github.io/api/#watch */
  watch(options?: WatchOptions): Promise<void>;

  /** Documentation: https://esbuild.github.io/api/#serve */
  serve(options?: ServeOptions): Promise<ServeResult>;

  cancel(): Promise<void>;
  dispose(): Promise<void>;
}

// This is a TypeScript type-level function which replaces any keys in "In"
// that aren't in "Out" with "never". We use this to reject properties with
// typos in object literals. See: https://stackoverflow.com/questions/49580725
type SameShape<Out, In extends Out> = In & { [Key in Exclude<keyof In, keyof Out>]: never }

/**
 * This function invokes the "esbuild" command-line tool for you. It returns a
 * promise that either resolves with a "BuildResult" object or rejects with a
 * "BuildFailure" object.
 *
 * - Works in node: yes
 * - Works in browser: yes
 *
 * Documentation: https://esbuild.github.io/api/#build
 */
export declare function build<T extends BuildOptions>(options: SameShape<BuildOptions, T>): Promise<BuildResult<T>>

/**
 * This is the advanced long-running form of "build" that supports additional
 * features such as watch mode and a local development server.
 *
 * - Works in node: yes
 * - Works in browser: no
 *
 * Documentation: https://esbuild.github.io/api/#build
 */
export declare function context<T extends BuildOptions>(options: SameShape<BuildOptions, T>): Promise<BuildContext<T>>

/**
 * This function transforms a single JavaScript file. It can be used to minify
 * JavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript
 * to older JavaScript. It returns a promise that is either resolved with a
 * "TransformResult" object or rejected with a "TransformFailure" object.
 *
 * - Works in node: yes
 * - Works in browser: yes
 *
 * Documentation: https://esbuild.github.io/api/#transform
 */
export declare function transform<T extends TransformOptions>(input: string | Uint8Array, options?: SameShape<TransformOptions, T>): Promise<TransformResult<T>>

/**
 * Converts log messages to formatted message strings suitable for printing in
 * the terminal. This allows you to reuse the built-in behavior of esbuild's
 * log message formatter. This is a batch-oriented API for efficiency.
 *
 * - Works in node: yes
 * - Works in browser: yes
 */
export declare function formatMessages(messages: PartialMessage[], options: FormatMessagesOptions): Promise<string[]>

/**
 * Pretty-prints an analysis of the metafile JSON to a string. This is just for
 * convenience to be able to match esbuild's pretty-printing exactly. If you want
 * to customize it, you can just inspect the data in the metafile yourself.
 *
 * - Works in node: yes
 * - Works in browser: yes
 *
 * Documentation: https://esbuild.github.io/api/#analyze
 */
export declare function analyzeMetafile(metafile: Metafile | string, options?: AnalyzeMetafileOptions): Promise<string>

/**
 * A synchronous version of "build".
 *
 * - Works in node: yes
 * - Works in browser: no
 *
 * Documentation: https://esbuild.github.io/api/#build
 */
export declare function buildSync<T extends BuildOptions>(options: SameShape<BuildOptions, T>): BuildResult<T>

/**
 * A synchronous version of "transform".
 *
 * - Works in node: yes
 * - Works in browser: no
 *
 * Documentation: https://esbuild.github.io/api/#transform
 */
export declare function transformSync<T extends TransformOptions>(input: string | Uint8Array, options?: SameShape<TransformOptions, T>): TransformResult<T>

/**
 * A synchronous version of "formatMessages".
 *
 * - Works in node: yes
 * - Works in browser: no
 */
export declare function formatMessagesSync(messages: PartialMessage[], options: FormatMessagesOptions): string[]

/**
 * A synchronous version of "analyzeMetafile".
 *
 * - Works in node: yes
 * - Works in browser: no
 *
 * Documentation: https://esbuild.github.io/api/#analyze
 */
export declare function analyzeMetafileSync(metafile: Metafile | string, options?: AnalyzeMetafileOptions): string

/**
 * This configures the browser-based version of esbuild. It is necessary to
 * call this first and wait for the returned promise to be resolved before
 * making other API calls when using esbuild in the browser.
 *
 * - Works in node: yes
 * - Works in browser: yes ("options" is required)
 *
 * Documentation: https://esbuild.github.io/api/#browser
 */
export declare function initialize(options: InitializeOptions): Promise<void>

export interface InitializeOptions {
  /**
   * The URL of the "esbuild.wasm" file. This must be provided when running
   * esbuild in the browser.
   */
  wasmURL?: string | URL;

  /**
   * The result of calling "new WebAssembly.Module(buffer)" where "buffer"
   * is a typed array or ArrayBuffer containing the binary code of the
   * "esbuild.wasm" file.
   *
   * You can use this as an alternative to "wasmURL" for environments where it's
   * not possible to download the WebAssembly module.
   */
  wasmModule?: any;

  /**
   * By default esbuild runs the WebAssembly-based browser API in a web worker
   * to avoid blocking the UI thread. This can be disabled by setting "worker"
   * to false.
   */
  worker?: boolean;
}

export let version: string;

export interface CompilerOptions {
  readonly alwaysStrict?: boolean;
  readonly baseUrl?: boolean;
  readonly experimentalDecorators?: boolean;
  readonly importsNotUsedAsValues?: 'remove' | 'preserve' | 'error';
  readonly jsx?: 'preserve' | 'react-native' | 'react' | 'react-jsx' | 'react-jsxdev';
  readonly jsxFactory?: string;
  readonly jsxFragmentFactory?: string;
  readonly jsxImportSource?: string;
  readonly paths?: Record<string, string[]>;
  readonly preserveValueImports?: boolean;
  readonly strict?: boolean;
  readonly target?: string;
  readonly useDefineForClassFields?: boolean;
  readonly verbatimModuleSyntax?: boolean;
}

export interface TsconfigOptions {
  readonly compilerOptions?: CompilerOptions;
}
