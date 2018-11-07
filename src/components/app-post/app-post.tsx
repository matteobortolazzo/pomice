import {Component, Listen, Prop} from '@stencil/core';
import {MatchResults} from "@stencil/router";
import {Post} from "../../service/service.models";
import {getPost} from "../../service/service.functions";
import Moment from "moment";
import marked from 'marked';
import {renderCode, renderHeading, renderImage} from "./app-post.rendering";

@Component({
  tag: 'app-post',
  styleUrl: 'app-post.scss',
  shadow: false
})
export class AppTutorial {
  private post: Post;
  private lastSection: TutorialSection;
  private sections: TutorialSection[] = [];
  private renderer = new marked.Renderer();

  @Prop() match: MatchResults;

  constructor() {
    this.renderer.code = renderCode;
    this.renderer.image = renderImage;
    this.renderer.heading = (text, level) => renderHeading(text, level, this.sections);
  }

  async componentWillLoad() {
    this.post = await getPost(this.match.params.id);
    document.title = this.post.heading;
    let meta = document.getElementsByTagName("meta");
    for (let i = 0; i < meta.length; i++) {
      if (meta[i].name.toLowerCase() == "description") {
        meta[i].content = this.post.description;
      }
    }
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
    });
  }

  private static scrollToId(e, id: string) {
    e.preventDefault();
    document.querySelector(`#${id}`).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  render() {
    const convertedContent = marked(this.post.content, {renderer: this.renderer});
    return (
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
                <a id={`menu-${section.id}`} onClick={e => AppTutorial.scrollToId(e, section.id)} href={`#${section.id}`}>{section.text}</a>
              </div>)}
          </div>
        </div>
      </div>
    );
  }
}
