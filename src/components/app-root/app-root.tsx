import {Component} from '@stencil/core';
import {
  BLOG_DESCRIPTION,
  BLOG_GITHUB_REPO,
  BLOG_SUBTITLE,
  BLOG_TITLE,
  PROFILE_URL_GITHUB,
  PROFILE_URL_LINKEDIN,
  PROFILE_URL_TWITTER
} from "../../settings";
import {setMeta} from "./app-root.meta";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  componentWillLoad() {
    setMeta(BLOG_TITLE, BLOG_DESCRIPTION);
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
            <stencil-route url='/' component='app-home' exact={true}/>
            <stencil-route url='/posts/:id/:slug' component='app-post'/>
          </stencil-route-switch>
        </stencil-router>
      </main>,
      <footer>
        <div class="description">Check the code in my <a href={BLOG_GITHUB_REPO}>GitHub repository</a>!
          Feel free to open an issue if something goes wrong or is missing.
        </div>
      </footer>
    ]);
  }
}
