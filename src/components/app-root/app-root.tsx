import { Component } from '@stencil/core';
import { BLOG_GITHUB_REPO} from "../../settings";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  render() {
    return ([
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
