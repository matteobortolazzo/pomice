import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-share-buttons',
  styleUrl: 'pom-share-buttons.scss',
  shadow: true
})
export class ShareButtons {
  @Prop() tutorialName: string;
  private pageUrl = ""; // window.location.href.toString().split('#')[0];
  buttons: { icon: string, description: string, url: string }[] = [
    {
      icon: 'logo-facebook',
      description: 'Facebook',
      url: `http://www.facebook.com/sharer.php?u=${this.pageUrl}`
    },
    {
      icon: 'logo-twitter',
      description: 'Twitter',
      url: `https://twitter.com/share?url=${escape(this.pageUrl)}&amp;text=${escape(this.tutorialName)}&amp`
    },
    {
      icon: 'logo-linkedin',
      description: 'LinkedIn',
      url: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${this.pageUrl}`
    },
    {
      icon: 'mail',
      description: 'Email',
      url: `mailto:?Subject=${this.tutorialName}&amp;Body=${escape(this.tutorialName)} ${this.pageUrl}`
    }
  ];

  render() {
    return(
      <div class="share-buttons">
        <div class="share-button"><ion-icon name="share-alt"></ion-icon> Share</div>
        <div class="popup">
          <div class="popup-inner">
            {this.buttons.map(b =>
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
