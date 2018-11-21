import { Component } from '@stencil/core';
import Moment from 'moment';

import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: false
})
export class AppHome {
  private posts: Post[] = [];

  async componentWillLoad() {
    this.posts = await PostsService.getPostsAsync();
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
