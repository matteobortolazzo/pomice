import {Component, Listen, Prop, State, Watch, Element} from '@stencil/core';
import {getScrollPercent} from "./pom-header.functions";

@Component({
  tag: 'pom-header',
  styleUrl: 'pom-header.scss',
  shadow: true
})
export class Header {
  @Element() rootEl: HTMLElement;

  @State() menuOpened = false;
  @State() lastPercentage = 0;

  @Watch('lastPercentage')
  lastPercentageChanged(newValue: number, oldValue: number) {
    this.rootEl.style.setProperty("--scroll-percentage",(newValue - 100) + "%");
    this.rootEl.style.setProperty("--nav-translate-current",newValue > oldValue ? "var(--nav-translate-end)" : "var(--nav-translate-start)");
  }

  @Prop() showBack = false;
  @Prop() blogTitle: string;
  @Prop() blogSubtitle: string;
  @Prop() showPercentage = false;

  @Watch('showPercentage')
  showPercentageChanged() {
    this.lastPercentage = 0;
  }

  @Listen("window:scroll")
  scrolled() {
    if (this.showPercentage) {
      this.lastPercentage = getScrollPercent();
    }
  }

  private toggle() {
    this.menuOpened = !this.menuOpened;
  }

  render() {
    return (
      <nav>
        <div class={'nav-inner ' + (this.menuOpened ? 'show-menu' : '')}>
          <div class={'nav-header ' + (this.showBack ? 'show-back' : '')}>
            <div class="back" onClick={() => window.history.back()}>
              <ion-icon name="arrow-back"></ion-icon>
            </div>
            <stencil-route-link url="/" class="main">
              <div class="title">{this.blogTitle}</div>
              <div class="subtitle">{this.blogSubtitle}</div>
            </stencil-route-link>
          </div>
          <div class="menu">
            <div class="items">
              <slot />
            </div>
            <div class="menu-toggle-container">
              <div class="toggle-button menu" onClick={() => this.toggle()}>
                <ion-icon name="ios-at"></ion-icon>
              </div>
              <div class="toggle-button close" onClick={() => this.toggle()}>
                <ion-icon name="close"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
