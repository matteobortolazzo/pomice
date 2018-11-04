import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tutorial-image',
  styleUrl: 'pom-tutorial-image.scss',
  shadow: true
})
export class TutorialSectionImage {
  @Prop() alt: string;
  @Prop() caption: string;
  @Prop() src: string;

  render() {
    return (
      <div class="image-container">
        <st-img class="image" src={this.src} alt={this.alt}></st-img>
        <div class="caption">{this.caption}</div>
      </div>
    );
  }
}
