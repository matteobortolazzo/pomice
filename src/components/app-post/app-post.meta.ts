import {Post} from "../../service/service.models";

export function setMeta(post: Post) {
  document.title = post.heading;
  let meta = document.getElementsByTagName("meta");
  for (let i = 0; i < meta.length; i++) {
    if (meta[i].name.toLowerCase() == "description") {
      meta[i].content = post.description;
    }
  }
}
