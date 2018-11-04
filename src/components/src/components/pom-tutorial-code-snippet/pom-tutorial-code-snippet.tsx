import {Component, Prop} from "@stencil/core";
import marked from 'marked';
import hljs from 'highlight.js';
import {getReadableLanguage} from "./pom-tutorial-code.snipped.functions";

@Component({
  tag: 'pom-tutorial-code-snippet',
  styleUrl: 'pom-tutorial-code-snippet.scss',
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

  private async copyToClipboard() {
    await (navigator as any).clipboard.writeText(this.code);
  }

  render() {
    let markCode = `\`\`\`${this.language}\n${this.code}\n\`\`\``;
    return (
      <div class="code-section">
        <div class="code-header">
          <div class="language">{getReadableLanguage(this.language)}</div>
          <div class="copy-code-button" onClick={() => this.copyToClipboard()}>
            <div class="copy-code-button-content">
              <ion-icon name="copy"></ion-icon>
              Copy
            </div>
          </div>
        </div>
        <div class="code" innerHTML={marked(markCode)}></div>
      </div>
    )
  }
}
