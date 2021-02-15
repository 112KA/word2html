import buildList from "./traversals/buildList";
import buildParagraph from "./traversals/buildParagraph";
import embedLink from "./traversals/embedLink";
import removeAttributes from "./traversals/removeAttributes";

const parser = new DOMParser(),
  serializer = new XMLSerializer();

const parse = (s: string): Document => {
  return parser.parseFromString(`${s}`, "text/html");
};
const serialize = (document: Document): string => {
  let s: string = serializer.serializeToString(document.body);
  const re: RegExp = /<\/?body(.|\n)*?>/gi;
  return s.replace(re, "");
};

export const cleanProcess = (xmlstring: string): string => {
  const document: Document = parse(xmlstring);
  removeAttributes(document);

  let s = serialize(document);
  s = s.replace(/<p>( | |　|<br \/>|<span>|<\/span>)*?<\/p>\n/gi, ""); //空行なくす
  s = s.replace(/<\/h[1-6]>/gi, (match) => match + "\n");
  // s = s.replace(/<\/p>/gi, "</p>\n");
  return s;
};

export const mainProcess = (xmlstring: string): string => {
  //改行を消す
  let s = xmlstring.replace(/\n(\t| | |　)*/gi, "");

  const document: Document = parse(s);
  buildList(document);
  buildParagraph(document);
  removeAttributes(document, ["href"]);
  embedLink(document);

  console.log("document", document);

  s = serialize(document);

  //空行なくす
  s = s.replace(/<p>( | |　|<br \/>|<span>|<\/span>)*<\/p>/gi, "");

  //spanタグを消す
  s = s.replace(/<\/?span>/gi, "");

  //改行を入れる
  s = s.replace(/<(ul|\/(h[1-6]|ul|li|p))>/gi, (match) => match + "\n");
  // s = s.replace(/<\/p>/gi, "</p>\n");

  return s;
};
