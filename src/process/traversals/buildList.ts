const buildList = (node: Node, isListText: boolean = false): void => {
  let ul: Element | null = null,
    li: Element | null;

  //Remove list mark
  if (
    isListText &&
    node.nodeType !== Node.TEXT_NODE &&
    node.nodeType !== Node.DOCUMENT_NODE
  ) {
    const element: Element = node as Element;
    if (element.hasAttributes()) {
      const attr: Attr | null = element.attributes.getNamedItem("style");
      // console.log("removeListMark", attr?.value);
      if (attr?.value === "mso-list:Ignore") {
        element.remove();
        return;
      }
    }
  }

  const removeList: Record<string, Element>[] = [];
  for (
    var n: Element | null = node.firstChild as Element;
    n;
    n = n.nextSibling as Element
  ) {
    li = null;

    if (n.className === "MsoListParagraph") {
      // console.log("MsoListParagraph", n, n.nodeType, flgList);

      li = document.createElement("li");

      if (ul === null) {
        ul = document.createElement("ul");
        node.insertBefore(ul, n);

        isListText = true;
      }
      ul.appendChild(li);

      removeList.push({ old: n, new: li });
    } else if (n.nodeType !== Node.TEXT_NODE) {
      // console.log("others", n, n.nodeType, flgList);
      ul = null;
    }
    buildList(n, ul !== null || isListText);
  }
  removeList.forEach((o: Record<string, Element>) => {
    o.new.innerHTML = o.old.innerHTML;
    o.old.remove();
  });
};

export default buildList;
