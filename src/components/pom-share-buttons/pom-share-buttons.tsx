import {Component, Prop} from "@stencil/core";
import {generateSocialButtons} from "./pom-share-buttons.functions";

@Component({
  tag: 'pom-share-buttons',
  styleUrl: 'pom-share-buttons.scss',
  shadow: true
})
export class ShareButtons {
  private pageUrl = window.location.href.toString().split('#')[0];

  @Prop() heading: string;

  private onLinkClicked(e, url: string) {
    if (!url.startsWith('mailto:')) {
      e.preventDefault();
      window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');
    }
  }

  render() {
    return(
      <div class="share-buttons">
        <div class="share-button"><ion-icon name="share"></ion-icon> Share</div>
        <div class="popup">
          <div class="popup-inner">
            {generateSocialButtons(this.heading, this.pageUrl).map(b =>
              <div class="social-button" >
                <a onClick={e => this.onLinkClicked(e, b.url)} href={b.url} target={b.icon === 'mail' ? '' : '_blank'}>
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
