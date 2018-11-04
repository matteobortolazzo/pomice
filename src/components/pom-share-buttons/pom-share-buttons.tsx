import {Component, Prop} from "@stencil/core";
import {generateSocialButtons} from "./pom-share-buttons.functions";

@Component({
  tag: 'pom-share-buttons',
  styleUrl: 'pom-share-buttons.scss',
  shadow: true
})
export class ShareButtons {
  private pageUrl = window.location.href.toString().split('#')[0];

  @Prop() tutorialTitle: string;

  render() {
    return(
      <div class="share-buttons">
        <div class="share-button"><ion-icon name="share-alt"></ion-icon> Share</div>
        <div class="popup">
          <div class="popup-inner">
            {generateSocialButtons(this.tutorialTitle, this.pageUrl).map(b =>
              <div class="social-button" >
                <a href={b.url} target={b.icon === 'mail' ? '' : '_blank'}>
                  <ion-icon name={b.icon}></ion-icon>
                  <span class="description">{b.description}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
