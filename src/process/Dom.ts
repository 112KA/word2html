export const wrap = (target: Text, pattern: RegExp, tagName: string) => {
  const targetText: string | null = target.textContent,
    matches:
      | IterableIterator<RegExpMatchArray>
      | undefined = targetText?.matchAll(pattern),
    tmpNodes: Node[] = [];

  if (targetText && matches) {
    const matchArray: RegExpMatchArray[] = Array.from(matches);
    let index: number = 0,
      node: Node,
      matchedString: string;

    for (let match of matchArray) {
      if (match.index !== index) {
        node = document.createTextNode(targetText.slice(index, match.index));
        tmpNodes.push(node);
      }

      if (match.index === undefined) continue;

      index = match.index + match[0].length;

      matchedString = targetText.slice(match.index, index).trim();
      node = document.createElement(tagName);
      if (node instanceof HTMLAnchorElement) {
        node.href = matchedString;
        node.target = "_blank";
      }
      node.appendChild(document.createTextNode(matchedString));
      tmpNodes.push(node);
    }

    if (index >= targetText.length) {
      node = document.createTextNode(targetText.slice(index));
      tmpNodes.push(node);
    }

    const parent = target.parentNode;

    for (let i: number = 0; i < tmpNodes.length; i++) {
      node = tmpNodes[i];
      if (i === 0) {
        parent?.replaceChild(node, target);
      } else {
        parent?.appendChild(node);
      }
    }
  }
};
