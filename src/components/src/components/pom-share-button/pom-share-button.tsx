import {Component, Prop} from "@stencil/core";
import {encode} from "punycode";

@Component({
  tag: 'pom-share-button',
  styleUrl: 'pom-share-button.scss',
  shadow: true
})
export class ShareButton {
  @Prop() tutorialName: string;
  @Prop() social: 'facebook' | 'twitter' | 'linkedin' | 'email';

  getButton(): { icon: string, description: string, url: string } {
    let url = window.location.href.toString().split('#')[0];
    console.log(url);
    switch (this.social) {
      case 'facebook':
        return {
          icon: 'logo-facebook',
          description: 'Facebook',
          url: `http://www.facebook.com/sharer.php?u=${url}`
        };
      case 'twitter':
        return {
          icon: 'logo-twitter',
          description: 'Twitter',
          url: `https://twitter.com/share?url=${escape(url)}&amp;text=${escape(this.tutorialName)}&amp`
        };
      case 'linkedin':
        return {
          icon: 'logo-linkedin',
          description: 'LinkedIn',
          url: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${url}`
        };
      case 'email':
        return {
          icon: 'mail',
          description: 'Email',
          url: `mailto:?Subject=${this.tutorialName}&amp;Body=${encode(this.tutorialName)} ${url}`
        };
    }
    return { icon: 'error', description: 'error', url: 'error' };
  }

  render() {
    let button = this.getButton();
    return (
      <a href={button.url} target={button.icon === 'mail' ? '' : '_blank'}>
        <ion-icon name={button.icon}></ion-icon>
        <span class="description">{button.description}</span>
      </a>
    );
  }
}
