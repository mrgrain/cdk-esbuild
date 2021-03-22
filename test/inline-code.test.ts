import { Stack } from "@aws-cdk/core";
import {
  InlineJavaScriptCode,
  InlineJsxCode,
  InlineTsxCode,
  InlineTypeScriptCode,
} from "../lib";

describe("inline-code", () => {
  describe("given some js code", () => {
    it("should transform the code", () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'"
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('const banana = "fruit";\n');
    });
  });

  describe("given some jsx code", () => {
    it("should transform the code", () => {
      const code = new InlineJsxCode(
        "const App = () => (<div>Hello World</div>)"
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n'
      );
    });
  });

  describe("given some ts code", () => {
    it("should transform the code", () => {
      const code = new InlineTypeScriptCode("let x: number = 1");

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe("let x = 1;\n");
    });
  });

  describe("given some tsx code", () => {
    it("should transform the code", () => {
      const code = new InlineTsxCode(
        "const App = (): JSX.Element => (<div>Hello World</div>)"
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n'
      );
    });
  });
});
