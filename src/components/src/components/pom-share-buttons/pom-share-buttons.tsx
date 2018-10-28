import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-share-buttons',
  styleUrl: 'pom-share-buttons.scss',
  shadow: true
})
export class ShareButtons {
  @Prop() tutorialName: string;

  render() {
    return(
      <div class="share-buttons">
        <div class="share-button"><ion-icon name="share-alt"></ion-icon> Share</div>
        <div class="popup">
          <div class="popup-inner">
            <pom-share-button social="twitter" tutorialName={this.tutorialName}></pom-share-button>
            <pom-share-button social="linkedin" tutorialName={this.tutorialName}></pom-share-button>
            <pom-share-button social="facebook" tutorialName={this.tutorialName}></pom-share-button>
            <pom-share-button social="email" tutorialName={this.tutorialName}></pom-share-button>
          </div>
        </div>
      </div>
    );
  }
}
