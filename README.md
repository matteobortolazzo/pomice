# Pomice
My personal dev blog built with StencilJS and Contentful.com. It's also a PWA!

It's based on the Stencil App Starter.

Add a settings.ts in src:

```typescript
export const BLOG_TITLE = "xxx";
export const BLOG_SUBTITLE = "xxx";
export const BLOG_GITHUB_REPO = "https://github.com/xxx/xxx";

export const PROFILE_URL_TWITTER = "https://twitter.com/xxx";
export const PROFILE_URL_GITHUB = "https://github.com/xxx";
export const PROFILE_URL_LINKEDIN = "https://www.linkedin.com/in/xxx/";

export const CONTENTFUL_SPACE_ID = "xxx";
export const CONTENTFUL_ACCESS_TOKEN = "xxx";
```

On Contentful add a content model "post" compatible with the following TS class where "content" is a markdown field:
```typescript
export interface Post {
  heading: string;
  description: string;
  slug: string;
  date: Date;
  duration: number;
  tags: string;
  content: string;
}
```

Run:

```bash
npm install
npm start
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```
