import { Stack } from '@aws-cdk/core';
import { mocked } from 'ts-jest/utils';
import {
  InlineJavaScriptCode,
  InlineJsxCode,
  InlineTsxCode,
  InlineTypeScriptCode,
} from '../src';
import { printBuildMessages } from '../src/formatMessages';

jest.mock('../src/formatMessages', () => ({
  printBuildMessages: jest.fn(),
}));

describe('inline-code', () => {
  beforeEach(() => {
    mocked(printBuildMessages).mockReset();
  });

  describe('given some js code', () => {
    it('should transform the code', () => {
      const code = new InlineJavaScriptCode(
        "const banana = 'fruit' ?? 'vegetable'",
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('const banana = "fruit";\n');
    });
  });

  describe('given some jsx code', () => {
    it('should transform the code', () => {
      const code = new InlineJsxCode(
        'const App = () => (<div>Hello World</div>)',
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n',
      );
    });
  });

  describe('given some ts code', () => {
    it('should transform the code', () => {
      const code = new InlineTypeScriptCode('let x: number = 1');

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe('let x = 1;\n');
    });
  });

  describe('given some tsx code', () => {
    it('should transform the code', () => {
      const code = new InlineTsxCode(
        'const App = (): JSX.Element => (<div>Hello World</div>)',
      );

      const { inlineCode } = code.bind(new Stack());

      expect(inlineCode).toBe(
        'const App = () => /* @__PURE__ */ React.createElement("div", null, "Hello World");\n',
      );
    });
  });

  describe('given some broken ts code', () => {
    it('should display errors and warnings', () => {
      expect(() => {
        const code = new InlineTypeScriptCode('let : d ===== 1');
        code.bind(new Stack());
      }).toThrowError('Failed to transform InlineCode');

      expect(mocked(printBuildMessages)).toHaveBeenCalledTimes(1);
    });
  });
});
