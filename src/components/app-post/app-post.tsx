import {Component, Listen, Prop, State} from '@stencil/core';
import {MatchResults} from "@stencil/router";
import {setMeta} from "./app-post.meta";
import {Post} from "../../service/service.models";
import {getPost} from "../../service/service.functions";
import {handleSectionHighlight, TutorialSection} from "./app-post.section";
import {renderCode, renderHeading, renderImage} from "./app-post.rendering";
import {BLOG_SUBTITLE, BLOG_TITLE, PROFILE_URL_GITHUB, PROFILE_URL_LINKEDIN, PROFILE_URL_TWITTER} from "../../settings";
import Moment from "moment";
import marked from 'marked';

@Component({
  tag: 'app-post',
  styleUrl: 'app-post.scss',
  shadow: false
})
export class AppTutorial {
  private post: Post;
  private loaded = false;
  private renderer = new marked.Renderer();

  @State() private sections: TutorialSection[] = [];

  @Prop() match: MatchResults;
  @Prop({ context: 'isServer' }) private isServer: boolean;

  constructor() {
    this.renderer.code = renderCode;
    this.renderer.image = renderImage;
    this.renderer.heading = (text, level) => renderHeading(text, level, this.sections);
  }

  async componentWillLoad() {
    this.post = await getPost(this.match.params.id);
    setMeta(this.post);
  }

  @Listen("window:scroll")
  scrolled() {
    if (window.innerWidth < 1000) return;

    if (!this.loaded || this.sections.length === 0) return;
    this.sections = handleSectionHighlight(this.sections);
  }

  componentDidLoad() {
    if (this.isServer) return;

    setTimeout(() => {
      this.sections.map(section => {
        section.top = document.querySelector(`#${section.id}`).getBoundingClientRect().top;
      });
      this.loaded = true;
    }, 300);
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
    return ([
      <pom-header blogTitle={BLOG_TITLE} blogSubtitle={BLOG_SUBTITLE} showPercentage={true}>
        <pom-header-icon-item icon="logo-twitter" url={PROFILE_URL_TWITTER}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-github" url={PROFILE_URL_GITHUB}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-linkedin" url={PROFILE_URL_LINKEDIN}></pom-header-icon-item>
      </pom-header>,
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
                <a class={section.active === true ? 'on-screen': ''} id={`menu-${section.id}`} onClick={e => AppTutorial.scrollToId(e, section.id)} href={`#${section.id}`}>{section.text}</a>
              </div>)}
          </div>
        </div>
      </div>
    ]);
  }
}
