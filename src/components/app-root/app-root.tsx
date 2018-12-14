import { Component, Listen } from '@stencil/core';
import { LocationSegments } from '@stencil/router';
import 'ip-stencil-route-listener';

import { PageService } from '../../services/page.service';
import { ThemeService } from '../../services/theme.service';
import {
  BLOG_DESCRIPTION,
  BLOG_FOOTER_TEXT,
  BLOG_SUBTITLE,
  BLOG_TITLE,
  PROFILE_URL_GITHUB,
  PROFILE_URL_LINKEDIN,
  PROFILE_URL_TWITTER
} from '../../settings';
import {PwaService} from "../../services/pwa.service";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.scss',
  shadow: false
})
export class AppRoot {
  private header: HTMLPomHeaderElement;

  constructor() {
    (window as any).onbeforeinstallprompt =
        e => PwaService.handleInstallEvent(e);
  }

  componentWillLoad() {
    ThemeService.loadTheme();
    PageService.setTitle(BLOG_TITLE);
    PageService.setTitle(BLOG_DESCRIPTION);
  }

  componentDidLoad() {
    this.header = document.querySelector('pom-header');
  }

  @Listen('pageEnter')
  onPageEnter(e: CustomEvent<LocationSegments>) {
    if (this.header) {
      this.header.showPercentage = e.detail.pathname !== '/';
      this.header.showBack = e.detail.pathname !== '/';
    }
  }

  render() {
    return ([
      <pom-header blogTitle={BLOG_TITLE} blogSubtitle={BLOG_SUBTITLE}>
        <pom-header-icon-item icon="logo-twitter" url={PROFILE_URL_TWITTER}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-github" url={PROFILE_URL_GITHUB}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-linkedin" url={PROFILE_URL_LINKEDIN}></pom-header-icon-item>
      </pom-header>,
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route routeRender={props => <ip-stencil-route-listener props={props} />} url="/" component="app-home" exact/>
            <stencil-route routeRender={props => <ip-stencil-route-listener props={props} />} url="/posts/:id/:slug" component="app-post"/>
          </stencil-route-switch>
        </stencil-router>
      </main>,
      <footer>
        <div class="description" innerHTML={BLOG_FOOTER_TEXT}></div>
      </footer>
    ]);
  }
}
