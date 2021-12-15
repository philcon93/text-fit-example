import { css } from "@emotion/css";
import { innerHeight, innerWidth, countLines } from "./sizes";

const fullWidth = css`
  width: 100%;
`;
const growInHeight = css`
  height: 100%;
`;

export const updateFontSize = (el, props) => {
  let fontSize = props.maxFontSize || 100;
  el.classList.add(fullWidth);

  let mid;
  if (props.growInHeight) {
    el.classList.add(growInHeight);
  }
  const originalWidth = innerWidth(el);
  const originalHeight = innerHeight(el);
  const fontUnit = props.fontUnit || "%";
  const startingSize = parseFloat(getComputedStyle(el).fontSize);

  el.style.fontSize = (props.maxFontSize || 100) + fontUnit;
  let high = parseFloat(getComputedStyle(el).fontSize);

  el.style.fontSize = (props.minFontSize || 0) + 0.5 + fontUnit; // add 0.5 as we subtract 0.5 from each number in order to fit faster
  let low = parseFloat(getComputedStyle(el).fontSize);

  el.style.fontSize = `${startingSize}px`; // add 0.5 as we subtract 0.5 from each number in order to fit faster

  // if there is no width then stop. it's not loaded yet
  if (Number.isNaN(originalWidth)) return false;
  // if there is only width then just width only as that's better than nothing
  if (Number.isNaN(originalHeight)) props.widthOnly = true;

  fontSize = low;
  // Binary search for highest best fit
  while (low <= high) {
    mid = parseFloat(Math.round(((high + low) / 2) * 100) / 100);
    el.style.fontSize = `${Math.floor(mid - 0.5)}px`;

    if (props.growInHeight) {
      el.classList.add(growInHeight);
    }
    const scrollWidth = innerWidth(el) <= originalWidth;
    const scrollHeight = props.widthOnly || innerHeight(el) <= originalHeight;
    el.classList.remove(growInHeight);

    // check if too many lines and if it is then we need to adjust the font size accordingly
    let tooManyLines = false;
    if (props.maxLines) {
      const lineCount = countLines(el);
      tooManyLines = lineCount > props.maxLines;
    }
    if (scrollWidth && scrollHeight && !tooManyLines) {
      fontSize = mid;
      low = mid + 0.01; // set font size to larger
    } else {
      high = mid - 0.01; // set font size to  smaller
    }
  }
  el.classList.remove(fullWidth);
  fontSize = Math.floor(fontSize - 0.5);
  el.style.fontSize = `${fontSize}px`;

  return fontSize;
};
