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

  @Prop() blogTitle: string;
  @Prop() blogSubtitle: string;

  @Prop() showPercentage = false;
  @Watch('showPercentage')
  showPercentageChanged() {
    this.lastPercentage = 0;
  }

  @State() lastPercentage = 0;

  @Watch('lastPercentage')
  lastPercentageChanged(newValue: number, oldValue: number) {
    this.rootEl.style.setProperty("--scroll-percentage",(newValue - 100) + "%");
    this.rootEl.style.setProperty("--nav-translate-current",newValue > oldValue ? "var(--nav-translate-end)" : "var(--nav-translate-start)");
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
          <div class="main">
            <stencil-route-link url="/" class="title"><span>{this.blogTitle}</span></stencil-route-link>
            <stencil-route-link url="/" class="subtitle"><span>{this.blogSubtitle}</span></stencil-route-link>
          </div>
          <div class="menu">
            <div class="items">
              <slot />
            </div>
            <div class="menu-toggle-container">
              <div class="toggle-button menu" onClick={() => this.toggle()}>
                <ion-icon name="at"></ion-icon>
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
