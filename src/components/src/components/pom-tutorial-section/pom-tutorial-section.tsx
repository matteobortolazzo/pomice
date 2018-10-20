import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-tutorial-section',
  styleUrl: 'pom-tutorial-section.scss',
  shadow: true
})
export class TutorialSection {
  @Prop() mainTitle: string;
  @Prop() slug: string;

  render() {
    return(
      <section>
        <header>
          <h2>{this.mainTitle}</h2>
          <pom-button-copy-link slug={this.slug}></pom-button-copy-link>
        </header>
        <slot />
      </section>);
  }
}
