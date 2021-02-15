const checkIsBlank = (node: Node): boolean => {
  if (node.nodeType !== Node.TEXT_NODE) {
    let ret = true;
    for (var n: Node | null = node.firstChild; n; n = n.nextSibling) {
      ret = ret && checkIsBlank(n);
    }
    return ret;
  } else {
    return (
      node.textContent === null ||
      /^( | |　|<br \/>|&nbps;)*$/.test(node.textContent)
    );
  }
};
const buildParagraph = (node: Node): void => {
  let p: HTMLParagraphElement | null = null;

  const removeList: Element[] = [];

  for (var n: Node | null = node.firstChild; n; n = n.nextSibling) {
    if (n instanceof HTMLParagraphElement) {
      //空行でない場合
      if (!checkIsBlank(n)) {
        // console.log("HTMLParagraphElement not blank");
        if (p === null) {
          p = n;
          p.innerHTML = "\n\t" + p.innerHTML;
        } else {
          //改行タグを入れて連結
          p.innerHTML += "<br>\n\t" + n.innerHTML;

          //削除リストに追加
          removeList.push(n);
        }
      }
      //空行の場合処理終了
      else {
        // console.log("HTMLParagraphElement blank");
        p && (p.innerHTML += "\n");
        p = null;
      }
    }
    //p要素でなければ処理終了
    else {
      p && (p.innerHTML += "\n");
      p = null;
    }
    buildParagraph(n);
  }

  p && (p.innerHTML += "\n");

  removeList.forEach((element: Element) => {
    element.remove();
  });
};

export default buildParagraph;
