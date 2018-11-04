import {Component, Prop} from "@stencil/core";
import Moment from "moment";

@Component({
  tag: 'pom-tutorials-list-item',
  styleUrl: 'pom-tutorials-list-item.scss',
  shadow: true
})
export class TutorialsListItem {
  @Prop() createdAt: Date;
  @Prop() header: string;
  @Prop() shortDescription: string;
  @Prop() tags: string;

  render() {
    return (
      <div class="tutorial">
        <pom-tags-list tags={this.tags.split(';')}></pom-tags-list>
        <div class="title">{this.header}</div>
        <div class="description">{this.shortDescription}</div>
        <div class="date">{Moment(this.createdAt).format('ll')}</div>
      </div>
    );
  }
}
