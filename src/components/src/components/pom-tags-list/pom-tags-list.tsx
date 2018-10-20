import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tags-list',
  styleUrl: 'pom-tags-list.scss',
  shadow: false
})
export class TutorialsListItem {
  @Prop() title: string;
  @Prop() slug: string;

  render() {
    return (
      <div class="tags">
        <slot />
      </div>
    );
  }
}
