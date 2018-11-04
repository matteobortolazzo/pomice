import {Component, Prop} from "@stencil/core";
import Moment from "moment";

@Component({
  tag: 'pom-tutorials-list-item',
  styleUrl: 'pom-tutorials-list-item.scss',
  shadow: true
})
export class TutorialsListItem {
  @Prop() createdAt: Date;
  @Prop() description: string;
  @Prop() tags: string;
  @Prop() tutorialTitle: string;

  render() {
    return (
      <div class="tutorial">
        <pom-tags-list tags={this.tags.split(';')}></pom-tags-list>
        <div class="title">{this.tutorialTitle}</div>
        <div class="description">{this.description}</div>
        <div class="date">{Moment(this.createdAt).format('ll')}</div>
      </div>
    );
  }
}
