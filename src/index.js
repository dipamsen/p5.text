// @ts-nocheck
(function () {

  p5.prototype.markupText = function (string, x, y) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<root>${string}</root>`, "application/xml");
    const nodes = doc.querySelector("root").childNodes;
    const mapfn = x => {
      if (x instanceof Element) {
        return { text: x.children.length == 0 ? x.textContent : [...x.childNodes].map(mapfn), style: x.tagName }
      } else if (x instanceof Text) {
        return { text: x.textContent }
      }
    }
    const parsed = [...nodes]
      .map(mapfn)
      .map(
        x =>
          x.text instanceof Array ?
            x.text.map(
              y => ({
                text: y.text,
                style: [y.style, x.style].filter(x => x)
              })
            ) :
            x)
      .flat()
    // string = `<b>Bold</b> Normal <b><i>BoldItalic</i></b> <font color="red">RED</font>`
    // To ->
    // const parsed = [
    //   { text: "Bold", style: "bold", font: {} },
    //   { text: " Normal ", style: "", font: {} },
    //   { text: "BoldItalic", style: "bolditalic", font: {} },
    //   { text: " ", style: "", font: {} },
    //   { text: "RED", style: "", font: { color: "red" } }
    // ]
    const style2val = { b: "bold", i: "italic", "b,i": "bolditalic" }
    let m = 0
    parsed.forEach(({ text = "", style = [] } = {}) => {
      this.push()
      this.textStyle(style2val[style])
      m += this.textWidth(text)
      this.pop()
    })
    let c = m
    parsed.forEach(({ text = "", style = [] } = {}) => {
      this.push()
      this.textStyle(style2val[style])
      c += this.textWidth(text)
      this.text(text, m - c, y)
      this.pop()
    })
  }

})();