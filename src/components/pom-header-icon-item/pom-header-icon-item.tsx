import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'pom-header-icon-item',
  styleUrl: 'pom-header-icon-item.scss',
  shadow: true
})
export class HeaderIconItem {
  @Prop() icon: string;
  @Prop() url: string;

  render() {
    return(
      <div class="icon-button">
        <a href={this.url}><ion-icon name={this.icon}></ion-icon></a>
      </div>
    );
  }
}
