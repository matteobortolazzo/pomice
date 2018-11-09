export function generateSocialButtons(title: string, pageUrl: string): SocialButtonItem[] {
  return [
    {
      icon: 'logo-twitter',
      description: 'Twitter',
      url: `https://twitter.com/share?url=${escape(pageUrl)}&amp;text=${escape(title)}&amp`
    },
    {
      icon: 'logo-linkedin',
      description: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&amp;url=${escape(pageUrl)}&title=${escape(title)}`
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
