import { Component } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {

  render() {
    return ([
      <pom-header main-title="Matteo Bortolazzo" sub-title="from Ionic to .NET and Azure">
        <pom-header-icon-item icon="logo-twitter" url="https://twitter.com"></pom-header-icon-item>
        <pom-header-icon-item icon="logo-github" url="https://github.com"></pom-header-icon-item>
        <pom-header-icon-item icon="logo-linkedin" url="https://linkedin.com"></pom-header-icon-item>
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
        <div class="description">Check the code in my <a href="https://github.com/matteobortolazzo/pomice">GitHub repository</a>!
          Feel free to open an issue if something goes wrong or is missing.
        </div>
        <div>Matteo Bortolazzo - 2018</div>
      </footer>
    ]);
  }
}
