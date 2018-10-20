import {Component, Prop} from "@stencil/core";

@Component({
  tag: 'pom-header-item',
  styleUrl: 'pom-header-item.scss',
  shadow: true
})
export class HeaderItem {
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
