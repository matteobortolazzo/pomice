import {Component, Prop} from '@stencil/core';
import {MatchResults} from "@stencil/router";
import {getTutorial} from "../../service/service.functions";
import {Tutorial} from "../../service/service.models";

@Component({
  tag: 'app-tutorial',
  styleUrl: 'app-tutorial.css',
  shadow: false
})
export class AppTutorial {
  @Prop() match: MatchResults;
  private tutorial: Tutorial;

  async componentWillLoad() {
    this.tutorial = await getTutorial(this.match.params.id);
    document.title = this.tutorial.title;
    let meta = document.getElementsByTagName("meta");
    for (let i = 0; i < meta.length; i++) {
      if (meta[i].name.toLowerCase() == "description") {
        meta[i].content = this.tutorial.description;
      }
    }
  }

  render() {
    return (
      <pom-tutorial
        content={this.tutorial.content}
        createdAt={this.tutorial.createdAt}
        duration={this.tutorial.duration}
        tutorialTitle={this.tutorial.title}
        tags={this.tutorial.tags}>
      </pom-tutorial>
    );
  }
}
