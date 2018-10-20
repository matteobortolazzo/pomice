import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tags-list-item',
  styleUrl: 'pom-tags-list-item.scss',
  shadow: true
})
export class TutorialsListItem {
  @Prop() title: string;
  @Prop() slug: string;

  render() {
    return (
      <div class="tag">{this.title}</div>
    );
  }
}
