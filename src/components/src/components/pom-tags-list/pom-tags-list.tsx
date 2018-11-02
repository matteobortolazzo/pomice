import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tags-list',
  styleUrl: 'pom-tags-list.scss',
  shadow: false
})
export class TutorialsListItem {
  @Prop() tags: string[];

  render() {
    return (
      <div class="tags">
        {
          this.tags.map(t => <div class="tag">{t}</div>)
        }
      </div>
    );
  }
}
