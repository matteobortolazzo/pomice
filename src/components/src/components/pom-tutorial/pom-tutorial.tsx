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
  @Prop() description: string;

  render() {
    return (
      <section>
        <header>
          <h1>{this.mainTitle}</h1>
          <slot name="tags"/>
          <div class="more-info">
            <div class="publish-date">
              <ion-icon name="calendar"></ion-icon>
              <span>{Moment(this.createdAt).format('ll')}</span>
            </div>
            <div class="time-to-read">
              <ion-icon name="time"></ion-icon>
              <span>{this.duration}min</span>
            </div>
          </div>
        </header>
        <div class="description" innerHTML={marked(this.description)}></div>
        <slot name="section"/>
      </section>
    );
  }
}
