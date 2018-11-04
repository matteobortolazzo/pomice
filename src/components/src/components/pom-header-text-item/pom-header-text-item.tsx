import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-header-text-item',
  styleUrl: 'pom-header-text-item.scss',
  shadow: true
})
export class HeaderTextItem {
  @Prop() description: string;
  @Prop() url: string;

  render() {
    return(
      <div class="menu-button">
        <a href={this.url}>{this.description}</a>
      </div>
    );
  }
}
