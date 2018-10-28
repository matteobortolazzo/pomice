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
  @Prop() tags: string;

  render() {
    return (
      <div class="tutorial">
        <pom-tags-list>
          {
            this.tags.split(';').map(t =>
              <pom-tags-list-item mainTitle={t}></pom-tags-list-item>
            )}
        </pom-tags-list>
        <div class="title">{this.mainTitle}</div>
        <div class="description">{this.shortDescription}</div>
        <div class="date">{Moment(this.createdAt).format('ll')}</div>
      </div>
    );
  }
}
