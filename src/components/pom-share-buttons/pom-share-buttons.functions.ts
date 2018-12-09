import { Post } from '../../models/post.model';
import { BLOG_TITLE } from '../../settings';

export function generateSocialButtons(post: Post): SocialButtonItem[] {
  return [
    {
      icon: 'logo-twitter',
      description: 'Twitter',
      url: `http://www.twitter.com/intent/tweet?text=${escape(post.heading)}&url=${escape(window.location.href)}`,
      target: '_blank'
    },
    {
      icon: 'logo-linkedin',
      description: 'LinkedIn',
      url: 'https://www.linkedin.com/shareArticle?mini=true&' +
        `url=${escape(window.location.href)}&` +
        `title=${escape(post.heading)}` +
        `source=${escape(BLOG_TITLE)}&`,
      target: '_blank'
    },
    {
      icon: 'mail',
      description: 'Email',
      url: `mailto:?Subject=${post.heading}&Body=${escape(post.heading)} ${window.location.href}`,
      target: ''
    }
  ];
}

export interface SocialButtonItem {
  icon: string;
  description: string;
  url: string;
  target: string;
}
