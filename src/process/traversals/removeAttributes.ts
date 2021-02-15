const removeAttributesTraverse = (
  node: Node,
  excludes: string[] = []
): void => {
  if (
    node.nodeType !== Node.TEXT_NODE &&
    node.nodeType !== Node.DOCUMENT_NODE
  ) {
    const element: Element = node as Element;
    if (element.hasAttributes()) {
      const attrs: NamedNodeMap = element.attributes;
      for (var i: number = attrs.length - 1; i >= 0; i--) {
        let attrName = attrs[i].name;
        if (excludes.filter((attr) => attr === attrName).length === 0) {
          element.removeAttribute(attrName);
        }
      }
    }
  }

  for (var n: Node | null = node.firstChild; n; n = n.nextSibling) {
    removeAttributesTraverse(n, excludes);
  }
};

export default removeAttributesTraverse;
