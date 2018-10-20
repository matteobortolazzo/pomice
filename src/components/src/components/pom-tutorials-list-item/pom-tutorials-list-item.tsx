import {Component, Prop} from "@stencil/core";
import Moment from "moment";

@Component({
  tag: 'pom-tutorials-list-item',
  styleUrl: 'pom-tutorials-list-item.scss',
  shadow: true
})
export class TutorialsListItem {
  @Prop() mainTitle: string;
  @Prop() shortDescription: string;
  @Prop() createdAt: Date;

  render() {
    return (
      <div class="tutorial">
        <slot />
        <div class="title">{this.mainTitle}</div>
        <div class="description">{this.shortDescription}</div>
        <div class="date">{Moment(this.createdAt).format('ll')}</div>
      </div>
    );
  }
}
