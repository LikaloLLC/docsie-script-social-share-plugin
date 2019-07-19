const STYLES = {
  "BOLD": ["<b>", "</b>"],
  "ITALIC": ["<i>", "</i>"],
  "CODE": ["<code>", "</code>"],
  "LINK": [({ href }) => `<a href="${href}">`, "</a>"],
  "MARK": ["<mark>", "</mark>"]
};

function difference(a, b) {
  let _a = new Set(a);
  let _b = new Set(b);
  return Array.from(new Set(
    [..._a].filter(x => !_b.has(x))));
}

function escapeHTML(text) {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// https://github.com/evanc/backdraft-js
// values in haystack must be unique
function containsSome(haystack, needles) {
  return haystack.length > difference(haystack, needles).length;
}

function relevantStyles(offset, styleRanges) {
  return styleRanges
    .filter((range) => {
      return (offset >= range.offset && offset < (range.offset + range.length));
    });
}

export function convertBlock(block, markup = STYLES) {
  let outputText = [];
  let styleStack = [];
  const text = block.text || "";
  const ranges = block.inlineStyleRanges;

  // loop over every char in this block's text
  for (let i = 0; i < text.length; i++) {

    // figure out what styles this char and the next char need
    // (regardless of whether there *is* a next char or not)
    let characterStyles = relevantStyles(i, ranges);
    let nextCharacterStyles = relevantStyles(i + 1, ranges);

    // calculate styles to add and remove
    let stylesToAdd = difference(characterStyles, styleStack);
    let stylesToRemove = difference(characterStyles, nextCharacterStyles);

    // add styles we will need for this char
    stylesToAdd.forEach(s => {
      const { style, type, data } = s;
      styleStack.push(s);
      markup[style] &&
        outputText.push(markup[style][0]);
      markup[type] &&
        outputText.push(markup[type][0](data));
    });

    outputText.push(escapeHTML(text.substr(i, 1)));

    // remove styles we won't need anymore
    while (containsSome(styleStack, stylesToRemove)) {
      let toRemove = styleStack.pop();
      const { style, type } = toRemove;
      markup[style] &&
        outputText.push(markup[style][1]);
      markup[type] &&
        outputText.push(markup[type][1]);
    }
  }

  return outputText.join("");
}

export function buildMarkup(rawDraftContentState, markup = STYLES) {
  const blocks = rawDraftContentState.blocks;
  return blocks.map(b => convertBlock(b, markup));
}