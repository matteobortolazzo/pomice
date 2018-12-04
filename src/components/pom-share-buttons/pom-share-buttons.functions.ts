import {Post} from "../../models/post.model";
import {BLOG_TITLE} from "../../settings";

export function generateSocialButtons(post: Post): SocialButtonItem[] {
  return [
    {
      icon: 'logo-twitter',
      description: 'Twitter',
      url: `http://www.twitter.com/intent/tweet?text=${escape(post.heading)}&url=${escape(window.location.href)}`
    },
    {
      icon: 'logo-linkedin',
      description: 'LinkedIn',
      url: 'https://www.linkedin.com/shareArticle?mini=true&' +
        `title=${escape(post.heading)}` +
        `url=${escape(window.location.href)}&` +
        `summary=${escape(post.description)}&` +
        `source=${escape(BLOG_TITLE)}&`
    },
    {
      icon: 'mail',
      description: 'Email',
      url: `mailto:?Subject=${post.heading}&Body=${escape(post.heading)} ${window.location.href}`
    }
  ];
}

export interface SocialButtonItem {
  icon: string;
  description: string;
  url: string; }
