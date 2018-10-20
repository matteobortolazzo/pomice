import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-button-copy-link',
  styleUrl: '../../styles/pom-button-copy.scss',
  shadow: true
})
export class ButtonCopyLink {
  @Prop() slug: string;

  async copyToClipboard() {
    await (navigator as any).clipboard.writeText(window.location.href + '#' + this.slug);
  }

  render() {
    return (
      <div class="container" onClick={() => this.copyToClipboard()}>
        <ion-icon name="link"></ion-icon>
      </div>
    );
  }
}
