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
  }
};
