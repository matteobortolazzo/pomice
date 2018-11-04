import {Component} from '@stencil/core';
import {getTutorials} from "../../service/service.functions";
import {TutorialPreview} from "../../service/service.models";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false
})
export class AppHome {
  private tutorials: TutorialPreview[] = [];

  async componentWillLoad() {
    this.tutorials = await getTutorials();
  }

  render() {
    return (
      <pom-tutorials-list>
        {this.tutorials.map(tutorial =>
          (<stencil-route-link url={`/tutorials/${tutorial.id}/${tutorial.slug}`}>
            <pom-tutorials-list-item createdAt={tutorial.createdAt}
            description={tutorial.description} tags={tutorial.tags}
            tutorialTitle={tutorial.title}></pom-tutorials-list-item>
          </stencil-route-link>)
        )}
      </pom-tutorials-list>
    );
  }
}
