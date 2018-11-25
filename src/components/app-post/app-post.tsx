import { Component, Listen, Prop, State } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import marked from 'marked';
import Moment from 'moment';
import { Post } from '../../models/post.model';
import { PageService } from '../../services/page.service';
import { PostsService } from '../../services/posts.service';
import {ThemeService} from "../../services/theme.service";

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

  constructor() {
    this.setupRenderer();
  }

  async componentWillLoad() {
    this.darkMode = ThemeService.isDark;
    if (this.post) {
      return;
    }
    this.post = await PostsService.getPostAsync(this.match.params.id);
    PageService.setTitle(this.post.heading);
    PageService.setDescription(this.post.description);
  }

  componentDidLoad() {
    setTimeout(() => {
      this.sections.forEach(section => {
        section.top = document.querySelector(`#${section.id}`).getBoundingClientRect().top;
      });
      this.loaded = true;
    }, 300);
  }

  @Listen('window:scroll')
  scrolled() {
    // If the nav menu is not visible
    if (window.innerWidth < 1000) {
      return;
    }
    if (!this.loaded) {
      return;
    }

    const scrollTop = document.documentElement.scrollTop + 60;
    const visitedSections = this.sections.filter(s => s.top && s.top < scrollTop + 56.4).reverse();
    this.sections.forEach(s => s.active = false);
    if (visitedSections.length > 0) {
      visitedSections[0].active = true;
    }
    this.sections = [...this.sections];
  }

  private setupRenderer() {
    this.renderer.code = (code: string, language: string) => {
      return `<pom-code language="${language}" code="${code}"></pom-code>`;
    };
    this.renderer.image = (href: string, title: string, text: string) => {
      return `<pom-image caption="${title}" src="${href}" alt="${text}"></pom-image>`;
    };
    this.renderer.heading = (text: string, level: number) => {
      if (level < 2 || level > 4) {
        return `<h${level}>${text}</h${level}>`;
      }

      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      if (!this.sections.find(s => s.id === escapedText)) {
        this.sections.push({id: escapedText, text, active: false, level: level});
      }
      return `<h${level} class="section-header" id="${escapedText}">
                <span>${text}</span>
                <a name="${escapedText}" href="#${escapedText}"><ion-icon name="link"></ion-icon></a>
              </h${level}>`;
    }
  }

  private getSectionButtonClasses(section: TutorialSection): string {
    let classes = 'sections-menu-item';
    classes += ' level-' + section.level;
    if (section.active)
      classes += ' on-screen';
    return classes;
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
    this.darkMode = !this.darkMode
    ThemeService.setTheme(this.darkMode);
  }

  render() {
    const convertedContent = marked(this.post.content, {renderer: this.renderer});
    return ([
      <div class="app-post">
        <section>
          <header>
            <h1>{this.post.heading}</h1>
            <pom-tags-list tags={this.post.tags.split(';')}></pom-tags-list>
            <div class="post-info">
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
              <a class={this.getSectionButtonClasses(section)} id={`menu-${section.id}`}
                 onClick={e => AppTutorial.scrollToId(e, section.id)} href={`#${section.id}`}>
                {section.text}</a>
            )}
          </div>
        </div>
      </div>
    ]);
  }
}

interface TutorialSection {
  id: string;
  text: string;
  top?: number;
  active: boolean;
  level: number;
}
