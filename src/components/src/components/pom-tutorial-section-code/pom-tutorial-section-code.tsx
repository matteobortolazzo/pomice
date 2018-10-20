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
  @Prop() filename: string;

  constructor() {
    marked.setOptions({
      highlight: function (code, lang) {
        return hljs.highlight(lang, code).value;
      }
    });
  }

  clearCopy() {
    const lines = this.code.split('\n');
    lines.splice(0,1);
    lines.splice(lines.length - 1,1);
    return lines.join('\n');
  }

  render() {
    return([
      <section class="code-section">
        <header class="code-header">
          <div class="language">{this.language}</div>
          <pom-button-copy-code code={this.clearCopy()}></pom-button-copy-code>
        </header>
        <div class="code" innerHTML={marked(this.code)}></div>
      </section>,
      this.filename ? <div class="file-name">{this.filename}</div> : <div></div>
    ])
  }
}
