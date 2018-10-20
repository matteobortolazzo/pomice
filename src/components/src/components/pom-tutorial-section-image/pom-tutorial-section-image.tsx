import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tutorial-section-image',
  styleUrl: 'pom-tutorial-section-image.scss',
  shadow: true
})
export class TutorialSectionImage {
  @Prop() url: string;
  @Prop() caption: string;

  render() {
    return (
      <div class="image-container">
        <st-img class="image" src={this.url} alt={this.caption}></st-img>
        <div class="caption">{this.caption}</div>
      </div>
    );
  }
}
