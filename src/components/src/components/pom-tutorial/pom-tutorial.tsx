import {Component, Prop} from "@stencil/core";
import Moment from "moment";
import marked from 'marked';

@Component({
  tag: 'pom-tutorial',
  styleUrl: 'pom-tutorial.scss',
  shadow: true
})
export class Tutorial {
  @Prop() mainTitle: string;
  @Prop() createdAt: string;
  @Prop() duration: number;
  @Prop() content: string;
  @Prop() tags: string;

  private renderer = new marked.Renderer();

  constructor() {
    this.renderer.code = (code: string, language: string) =>
      `<pom-tutorial-code-snippet language="${language}" code="${code}"></pom-tutorial-code-snippet>`;
    this.renderer.image = (href: string, title: string, text: string) =>
      `<pom-tutorial-image caption="${title}" src="${href}" alt="${text}"></pom-tutorial-image>`;
    this.renderer.heading = (text, level) => {
      let escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return `
          <h${level} class="section-header" id="${escapedText}">          
            <span>${text}</span>
            <a name="${escapedText}" href="#${escapedText}">
              <ion-icon name="link"></ion-icon>
            </a>
          </h${level}>`;
    };
  }

  render() {
    return (
      <section>
        <header>
          <h1>{this.mainTitle}</h1>
          <pom-tags-list>
            {
              this.tags.split(';').map(t =>
                <pom-tags-list-item mainTitle={t}></pom-tags-list-item>
            )}
          </pom-tags-list>
          <div class="more-info">
            <div class="publish-date">
              <ion-icon name="calendar"></ion-icon>
              <span>{Moment(this.createdAt).format('ll')}</span>
            </div>
            <div class="time-to-read">
              <ion-icon name="time"></ion-icon>
              <span>{this.duration}min</span>
            </div>
            <pom-share-buttons tutorialName={this.mainTitle}></pom-share-buttons>
          </div>
        </header>
        <div innerHTML={marked(this.content, { renderer: this.renderer })}></div>
      </section>
    );
  }
}
