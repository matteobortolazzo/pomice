export function setMeta(title: string, description: string) {
  document.title = title;
  const metas = Array.from(document.getElementsByTagName('meta'));
  const descriptionMeta = metas.find(meta => meta.name.toLowerCase() === 'description');
  descriptionMeta.content = description;
}
