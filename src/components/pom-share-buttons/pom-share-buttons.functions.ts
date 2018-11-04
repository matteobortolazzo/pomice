export function generateSocialButtons(title: string, pageUrl: string): SocialButtonItem[] {
  return [
    {
      icon: 'logo-facebook',
      description: 'Facebook',
      url: `http://www.facebook.com/sharer.php?u=${pageUrl}`
    },
    {
      icon: 'logo-twitter',
      description: 'Twitter',
      url: `https://twitter.com/share?url=${escape(pageUrl)}&amp;text=${escape(title)}&amp`
    },
    {
      icon: 'logo-linkedin',
      description: 'LinkedIn',
      url: `http://www.linkedin.com/shareArticle?mini=true&amp;url=${pageUrl}`
    },
    {
      icon: 'mail',
      description: 'Email',
      url: `mailto:?Subject=${title}&amp;Body=${escape(title)} ${pageUrl}`
    }
  ]
}

export interface SocialButtonItem {
  icon: string,
  description: string,
  url: string }
