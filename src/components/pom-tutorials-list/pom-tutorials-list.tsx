import {Component} from "@stencil/core";

@Component({
  tag: 'pom-tutorials-list',
  styleUrl: 'pom-tutorials-list.scss',
  shadow: false
})
export class TutorialsList {
  render() {
    return (
      <div class="tutorials">
        <slot />
      </div>
    );
  }
}
