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
            <stencil-route url='/tutorials/:id/:slug' component='app-tutorial'/>
          </stencil-route-switch>
        </stencil-router>
      </main>
    ]);
  }
}
