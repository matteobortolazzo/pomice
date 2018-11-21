import { Component, Prop } from '@stencil/core';
import hljs from 'highlight.js';
import marked from 'marked';

import { getReadableLanguage } from './pom-code.functions';

@Component({
  tag: 'pom-code',
  styleUrl: 'pom-code.scss',
  shadow: true
})
export class TutorialSectionCode {
  @Prop() code: string;
  @Prop() language: string;

  constructor() {
    marked.setOptions({
      highlight(code, lang) {
        return hljs.highlight(lang, code).value;
      }
    });
  }

  private async copyToClipboard() {
    await (navigator as any).clipboard.writeText(this.code);
  }

  render() {
    const markCode = `\`\`\`${this.language}\n${this.code}\n\`\`\``;
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
    );
  }
}
