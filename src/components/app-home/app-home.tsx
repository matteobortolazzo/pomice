import {Component, Prop} from '@stencil/core';
import Moment from "moment";
import {Post} from "../../service/service.models";
import {getPosts} from "../../service/service.functions";
import {RouterHistory} from "@stencil/router";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})
export class AppHome {
  private posts: Post[] = [];
  private header: HTMLPomHeaderElement;
  @Prop() history: RouterHistory;

  async componentWillLoad() {
    this.posts = await getPosts();
  }

  componentDidLoad() {
    this.header = document.querySelector('pom-header');
    this.history.listen(e => {
      this.header.showPercentage = e.pathname !== '/';
      this.header.showBack = e.pathname !== '/';
    });
  }

  render() {
    return ([
      <div class="posts">
        {this.posts.map(post =>
          (<stencil-route-link url={`/posts/${post.id}/${post.slug}`}>
            <div class="post">
              <pom-tags-list tags={post.tags.split(';')}></pom-tags-list>
              <div class="heading">{post.heading}</div>
              <p class="description">{post.description}</p>
              <div class="date">{Moment(post.date).format('ll')}</div>
            </div>
          </stencil-route-link>)
        )}
      </div>
    ]);
  }
}
