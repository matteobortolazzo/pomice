import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-button-copy-code',
  styleUrl: '../../styles/pom-button-copy.scss',
  shadow: true
})
export class ButtonCopyLink {
  @Prop() code: string;

  async copyToClipboard() {
    await (navigator as any).clipboard.writeText(this.code);
  }

  render() {
    return (
      <div class="container" onClick={() => this.copyToClipboard()}>
        <ion-icon name="copy"></ion-icon>
      </div>
    );
  }
}
