import { wrap } from "../Dom";

const embedLink = (node: Node): void => {
  if (node.nodeType === Node.TEXT_NODE) {
    wrap(
      node as Text,
      new RegExp("http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=~]*)?", "gi"),
      "a"
    );
  }
  for (var n: Node | null = node.firstChild; n; n = n.nextSibling) {
    // console.log((node as Element).tagName);
    if (/^(A|a)$/.test((node as Element).tagName)) continue;

    embedLink(n);
  }
};

export default embedLink;
