import { Component, Listen, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import marked from 'marked';
import Moment from 'moment';

import { Post } from '../../models/post.model';
import { PageService } from '../../services/page.service';
import { PostsService } from '../../services/posts.service';

import { renderCode, renderHeading, renderImage } from './app-post.rendering';
import { TutorialSection, handleSectionHighlight } from './app-post.section';

@Component({
  tag: 'app-post',
  styleUrl: 'app-post.scss',
  shadow: false
})
export class AppTutorial {
  private post: Post;
  private loaded = false;
  private renderer = new marked.Renderer();

  @State() private darkMode = false;
  @State() private sections: TutorialSection[] = [];

  @Prop() match: MatchResults;
  @Prop({ context: 'isServer' }) private isServer: boolean;

  constructor() {
    this.renderer.code = renderCode;
    this.renderer.image = renderImage;
    this.renderer.heading = (text, level) => renderHeading(text, level, this.sections);
  }

  async componentWillLoad() {
    this.post = await PostsService.getPostAsync(this.match.params.id);
    PageService.setTitle(this.post.heading);
    PageService.setDescription(this.post.description);
  }

  componentDidLoad() {
    if (this.isServer) { return; }

    setTimeout(() => {
      this.sections.map(section => {
        section.top = document.querySelector(`#${section.id}`).getBoundingClientRect().top;
      });
      this.loaded = true;
    }, 300);
  }

  @Listen('window:scroll')
  scrolled() {
    if (window.innerWidth < 1000) { return; }

    if (!this.loaded || this.sections.length === 0) { return; }
    this.sections = handleSectionHighlight(this.sections);
  }

  private static scrollToId(e, id: string) {
    e.preventDefault();
    document.querySelector(`#${id}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  private toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.querySelector('body').classList.toggle('dark');
  }

  render() {
    const convertedContent = marked(this.post.content, { renderer: this.renderer });
    return ([
      <div class="app-post">
        <section>
          <header>
            <h1>{this.post.heading}</h1>
            <pom-tags-list tags={this.post.tags.split(';')}></pom-tags-list>
            <div class="more-info">
              <div class="publish-date">
                <ion-icon name="calendar"></ion-icon>
                <span>{Moment(this.post.date).format('ll')}</span>
              </div>
              <div class="time-to-read">
                <ion-icon name="time"></ion-icon>
                <span>{this.post.duration}min</span>
              </div>
              <button onClick={() => this.toggleDarkMode()} class="toggle-mode-button">
              {
                this.darkMode ?
                  (<span><ion-icon name="sunny"></ion-icon> Light</span>) :
                  (<span><ion-icon name="moon"></ion-icon> Dark</span>)
              }
              </button>
              <pom-share-buttons heading={this.post.heading}></pom-share-buttons>
            </div>
          </header>
          <article innerHTML={convertedContent}></article>
        </section>
        <div class="nav">
          <div class="nav-inner">
            <div class="section-menu-title">Content</div>
            {this.sections.map(section =>
              <div class="sections-menu-item">
                <a class={section.active === true ? 'on-screen' : ''} id={`menu-${section.id}`} onClick={e => AppTutorial.scrollToId(e, section.id)} href={`#${section.id}`}>{section.text}</a>
              </div>)}
          </div>
        </div>
      </div>
    ]);
  }
}
