import {Component, Prop} from "@stencil/core";
import marked from 'marked';

@Component({
  tag: 'pom-tutorial-section-copy',
  styleUrl: 'pom-tutorial-section-copy.scss',
  shadow: true
})
export class TutorialSectionCopy {
  @Prop() copy: string;

  render() {
    return (<div innerHTML={marked(this.copy)}></div>);
  }
}
