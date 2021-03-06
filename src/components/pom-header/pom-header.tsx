import { Component, Element, Listen, Prop, State, Watch } from '@stencil/core';
import {AppService} from "../../services/app.service";
import {PwaService} from "../../services/pwa.service";

@Component({
  tag: 'pom-header',
  styleUrl: 'pom-header.scss',
  shadow: false
})
export class Header {
  @Element() rootEl: HTMLElement;

  @State() menuOpened = false;
  @State() askUpdate = false;
  @State() lastPercentage = 0;

  @Watch('lastPercentage')
  lastPercentageChanged(newValue: number, oldValue: number) {
    this.rootEl.style.setProperty('--scroll-percentage',
      (newValue - 100) + '%');
    this.rootEl.style.setProperty('--nav-translate-current',
      newValue > oldValue ? 'var(--nav-translate-end)' : 'var(--nav-translate-start)');
  }

  @Prop() showBack = false;
  @Prop() blogTitle: string;
  @Prop() blogSubtitle: string;
  @Prop({ mutable: true }) showPercentage = false;

  componentWillLoad() {
    this.showPercentage = window.location.pathname !== '/';
  }
  componentDidLoad() {
    AppService.getAppVersion().then(version => {
      this.askUpdate = PwaService.needUpdate(version);
    });
  }

  @Watch('showPercentage')
  showPercentageChanged() {
    this.lastPercentage = 0;
  }

  @Listen('window:scroll')
  scrolled() {
    if (!this.showPercentage) {
      return;
    }
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    this.lastPercentage = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
  }

  private toggle() {
    this.menuOpened = !this.menuOpened;
  }

  private async updateNow() {
    location.reload(true);
  }

  private skipUpdate() {
    this.askUpdate = false;
  }

  private getNavBarClasses() {
    const baseClass = 'nav-inner ';
    if (this.askUpdate) {
      return baseClass + 'show-update';
    }
    if (this.menuOpened) {
      return baseClass + 'show-menu';
    }
    return baseClass;
  }

  render() {
    return (
      <nav>
        <div class={this.getNavBarClasses()}>
          <div class={'nav-header ' + (this.showBack ? 'show-back' : '')}>
            <div class="back-button" onClick={() => window.history.back()}>
              <ion-icon name="arrow-back"></ion-icon>
            </div>
            <stencil-route-link url="/" class="nav-header-home">
              <div class="title">{this.blogTitle}</div>
              <div class="subtitle">{this.blogSubtitle}</div>
            </stencil-route-link>
          </div>
          <div class="update-box">
            <button class="pom-button" onClick={() => this.updateNow()}>Update now</button>
            <button class="pom-button-clear" onClick={() => this.skipUpdate()}>Close</button>
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
