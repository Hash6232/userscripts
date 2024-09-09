// ==UserScript==
// @name        Area select patch for SauceNAO
// @namespace   saucenao-areaselect-patch
// @match       https://saucenao.com/edit.php*
// @grant       none
// @version     1.0
// @author      Hash6232
// @description Regenerates the query link with updated naturalized coordinates
// @run-at      document-end
// ==/UserScript==

const [x1, y1, x2, y2, w, h] = ["x1", "y1", "x2", "y2", "w", "h"].map((id) => document.getElementById(id));
const btn = document.querySelector("input[value='Modified Search']");

if (!x1 | !y1 | !x2 | !y2 | !w | !h | !btn) return;

btn.onclick = updateValues;

function updateValues() {
  const img = document.getElementById("your_image");

  if (!img || (img.naturalWidth == img.width && img.naturalHeight == img.height)) return;

  x1.value = calcNaturalCoord(img.width, img.naturalWidth, x1.value);
  y1.value = calcNaturalCoord(img.height, img.naturalHeight, y1.value);
  x2.value = calcNaturalCoord(img.width, img.naturalWidth, x2.value);
  y2.value = calcNaturalCoord(img.height, img.naturalHeight, y2.value);
  w.value = x2.value - x1.value;
  h.value = y2.value - y1.value;

  genLink();
}

function calcNaturalCoord(dim, ogDim, coord) {
	return Math.round((coord * ogDim) / dim)
}
