import { InlineCode } from "@aws-cdk/aws-lambda";
import { transformSync, TransformOptions, Loader } from "esbuild";

abstract class BaseInlineCode extends InlineCode {
  public constructor(
    code: string,
    loader: Loader,
    transformOptions: TransformOptions = {}
  ) {
    const transformedCode = transformSync(code, {
      loader,
      ...transformOptions,
    });

    super(transformedCode.code);
  }
}

export class InlineJavaScriptCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, "js", transformOptions);
  }
}

export class InlineJsxCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, "jsx", transformOptions);
  }
}

export class InlineTypeScriptCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, "ts", transformOptions);
  }
}

export class InlineTsxCode extends BaseInlineCode {
  public constructor(code: string, transformOptions?: TransformOptions) {
    super(code, "tsx", transformOptions);
  }
}
