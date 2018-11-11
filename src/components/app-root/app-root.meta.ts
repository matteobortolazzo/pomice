export function setMeta(title: string, description: string) {
  document.title = title;
  let meta = document.getElementsByTagName("meta");
  for (let i = 0; i < meta.length; i++) {
    if (meta[i].name.toLowerCase() == "description") {
      meta[i].content = description;
    }
  }
}
