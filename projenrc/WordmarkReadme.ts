import { Component } from 'projen';
import { JsiiProject } from 'projen/lib/cdk';

enum WordmarkStyle {
  DEFAULT,
  DYNAMIC,
  DARK,
  LIGHT
}

export interface WordmarkReadmeOptions {
  altText?: string;
}

export class WordmarkReadme extends Component {
  private static DEFAULT = 'wordmark.svg';
  private static DYNAMIC = 'wordmark-dyanmic.svg';
  private static LIGHT = 'wordmark-light.svg';
  private static DARK = 'wordmark-dark.svg';

  public constructor(public readonly project: JsiiProject, private readonly options: WordmarkReadmeOptions = {}) {
    super(project);

    const readme = project.tasks.addTask('prepare:readme', {
      exec: `sed -i -e '1,5d' -e '6i ${this.imageTag(WordmarkStyle.DEFAULT)}' README.md`,
    });
    project.tasks.tryFind('compile')?.prependExec(`if [ ! -z \${CI} ]; then npx projen ${readme.name}; fi`);
    project.tasks.tryFind('compile')?.exec('if [ ! -z ${CI} ]; then git checkout README.md; fi');
  }

  private imageTag(style: WordmarkStyle): string {
    const baseUrl = this.project.package.manifest.repository.url.replace('https://github.com/', 'https://raw.githubusercontent.com/');
    const altText = this.options.altText ?? this.project.name;

    return `<img src="${baseUrl}/main/images/${this.imageFile(style)}" alt="${altText}">`;
  }

  private imageFile(style: WordmarkStyle): string {
    switch (style) {
      case WordmarkStyle.DARK:
        return WordmarkReadme.DARK;
      case WordmarkStyle.LIGHT:
        return WordmarkReadme.LIGHT;
      case WordmarkStyle.DYNAMIC:
        return WordmarkReadme.DYNAMIC;
      default:
        return WordmarkReadme.DEFAULT;
    }
  }
}
