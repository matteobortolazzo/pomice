import {Post} from "../models/post.model";

export const PageService = {
  /**
   * Change the title of the page.
   * @param title - The string to set as the page title
   */
  setTitle(title: string) {
    document.title = title;
  },
  /**
   * Change the description of the page.
   * @param description - The string to set as the page description
   */
  setDescription(description: string) {
    const metas = Array.from(document.getElementsByTagName('meta'));
    const descriptionMeta = metas.find(meta => meta.name.toLowerCase() === 'description');
    descriptionMeta.content = description;
  },
  setOpenGraphMetas(post: Post) {
    const metas = Array.from(document.getElementsByTagName('meta'));
    const ogTitle = metas.find(meta => meta.name.toLowerCase() === 'og:title');
    ogTitle.content = post.heading;
    const ogDescription = metas.find(meta => meta.name.toLowerCase() === 'og:description');
    ogDescription.content = post.description;
    const ogUrl = metas.find(meta => meta.name.toLowerCase() === 'og:url');
    ogUrl.content = window.location.href.toString().split('#')[0];
    if (post.thumbnailUrl) {
      const ogImage = metas.find(meta => meta.name.toLowerCase() === 'og:image');
      ogImage.content = post.thumbnailUrl;
    }
  }
};
