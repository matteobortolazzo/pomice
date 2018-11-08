# Pomice
My personal dev blog built with StencilJS and Contentful.com. It's also a PWA!

It's based on the Stencil App Starter.

Add a .ts file named service.keys in src/service with the Contentful data:

```typescript
export const SPACE_ID = 'xxxxxxxxxx';
export const ACCESS_TOKEN = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
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
