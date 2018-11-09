import {Component} from '@stencil/core';
import Moment from "moment";
import {Post} from "../../service/service.models";
import {getPosts} from "../../service/service.functions";
import {BLOG_SUBTITLE, BLOG_TITLE, PROFILE_URL_GITHUB, PROFILE_URL_LINKEDIN, PROFILE_URL_TWITTER} from "../../settings";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})
export class AppHome {
  private posts: Post[] = [];

  async componentWillLoad() {
    this.posts = await getPosts();
  }

  render() {
    return ([
      <pom-header blogTitle={BLOG_TITLE} blogSubtitle={BLOG_SUBTITLE}>
        <pom-header-icon-item icon="logo-twitter" url={PROFILE_URL_TWITTER}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-github" url={PROFILE_URL_GITHUB}></pom-header-icon-item>
        <pom-header-icon-item icon="logo-linkedin" url={PROFILE_URL_LINKEDIN}></pom-header-icon-item>
      </pom-header>,
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
