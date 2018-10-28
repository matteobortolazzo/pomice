import {Component, Prop} from "@stencil/core";
import marked from 'marked';
import hljs from 'highlight.js';

@Component({
  tag: 'pom-tutorial-section-code',
  styleUrl: 'pom-tutorial-section-code.scss',
  shadow: true
})
export class TutorialSectionCode {
  @Prop() code: string;
  @Prop() language: string;

  constructor() {
    marked.setOptions({
      highlight: function (code, lang) {
        return hljs.highlight(lang, code).value;
      }
    });
  }

  getReadableLanguage() {
    if (this.language.toLowerCase() === 'csharp')
      return 'C#';
    return this.language;
  }

  render() {
    let markCode = `\`\`\`${this.language}\n${this.code}\n\`\`\``;
    return (
      <div class="code-section">
        <div class="code-header">
          <div class="language">{this.getReadableLanguage()}</div>
          <pom-button-copy-code code={this.code}></pom-button-copy-code>
        </div>
        <div class="code" innerHTML={marked(markCode)}></div>
      </div>
    )
  }
}
