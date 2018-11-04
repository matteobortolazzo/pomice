import {Component, Listen, Prop} from "@stencil/core";
import Moment from "moment";
import marked from 'marked';

@Component({
  tag: 'pom-tutorial',
  styleUrl: 'pom-tutorial.scss',
  shadow: false
})
export class Tutorial {
  private lastSection: TutorialSection;
  private sections: TutorialSection[] = [];
  private renderer = new marked.Renderer();

  @Prop() content: string;
  @Prop() createdAt: string;
  @Prop() duration: number;
  @Prop() header: string;
  @Prop() tags: string;

  constructor() {
    this.renderer.code = (code: string, language: string) =>
      `<pom-tutorial-code-snippet language="${language}" code="${code}"></pom-tutorial-code-snippet>`;
    this.renderer.image = (href: string, title: string, text: string) =>
      `<pom-tutorial-image caption="${title}" src="${href}" alt="${text}"></pom-tutorial-image>`;
    this.renderer.heading = (text, level) => {
      if (level !== 2)
        return `<h${level}>${text}</h${level}>`;

      let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      this.sections.push({id: escapedText, text: text})
      return `
          <h${level} class="section-header" id="${escapedText}">          
            <span>${text}</span>
            <a name="${escapedText}" href="#${escapedText}">
              <ion-icon name="link"></ion-icon>
            </a>
          </h${level}>`;
    };
  }

  @Listen("window:scroll")
  scrolled() {
    let top = document.documentElement.scrollTop;
    let lastSearchSection: any;
    for(let section of this.sections) {
      if (top > section.top - 56) {
        lastSearchSection = section;
      }
    }

    if (this.lastSection && this.lastSection.menuElement.classList.contains('on-screen'))
      this.lastSection.menuElement.classList.remove('on-screen');
    if (lastSearchSection && !lastSearchSection.menuElement.classList.contains('on-screen')) {
      lastSearchSection.menuElement.classList.add('on-screen');
      this.lastSection = lastSearchSection;
    }
  }

  componentDidLoad() {
    this.sections.map(s => {
      s.top = document.querySelector(`#${s.id}`).getBoundingClientRect().top;
      s.menuElement = document.querySelector(`#menu-${s.id}`);
      console.log(s);
    });
  }

  private scrollToId(e, id: string) {
    e.preventDefault();
    document.querySelector(`#${id}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  render() {
    const convertedContent = marked(this.content, {renderer: this.renderer});
    return (
      [
        <section>
          <header>
            <h1>{this.header}</h1>
            <pom-tags-list tags={this.tags.split(';')}></pom-tags-list>
            <div class="more-info">
              <div class="publish-date">
                <ion-icon name="calendar"></ion-icon>
                <span>{Moment(this.createdAt).format('ll')}</span>
              </div>
              <div class="time-to-read">
                <ion-icon name="time"></ion-icon>
                <span>{this.duration}min</span>
              </div>
              <pom-share-buttons tutorialTitle={this.header}></pom-share-buttons>
            </div>
          </header>
          <article innerHTML={convertedContent}></article>
        </section>,
        <nav>
          <div class="nav-inner">
            <div class="section-menu-title">Content</div>
            {this.sections.map(section =>
              <div class="sections-menu-item"><a id={`menu-${section.id}`}
                onClick={e => this.scrollToId(e, section.id)}
                href={`#${section.id}`}>{section.text}</a></div>)}
          </div>
        </nav>
      ]
    );
  }
}

interface TutorialSection {
  id: string,
  text: string,
  top?: number,
  menuElement?: HTMLElement
}
