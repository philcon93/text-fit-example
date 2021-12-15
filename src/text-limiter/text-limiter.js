import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { innerWidth, innerHeight, countLines, updateFontSize } from "./utils";

export const TextLimiter = ({
  children,
  textFit,
  textFitProps,
  maxLines,
  maxHeight,
  ...props
}) => {
  const [overflow, setOverflow] = useState("");
  const parentRef = useRef();

  useEffect(() => {
    processContent();
  }, [children]);

  useEffect(() => {
    window.addEventListener("resize", processContent);
    return () => {
      window.removeEventListener("resize", processContent);
    };
  });

  const processContent = () => {
    const originalWidth = innerWidth(parentRef.current);
    const originalHeight = innerHeight(parentRef.current);

    if (textFit) {
      const fontSize = updateFontSize(parentRef.current, { maxLines: 1 });

      console.log(fontSize);
    }

    if (maxLines) {
      const lineCount = countLines(parentRef.current);

      if (lineCount > maxLines) {
        setOverflow(
          `There can't be more than ${maxLines} lines of content here`
        );
      } else {
        setOverflow("");
      }
    }

    if (maxHeight) {
      if (originalHeight >= maxHeight) {
        setOverflow(
          `The content has a greater height then the allocated space`
        );
      } else {
        setOverflow("");
      }
    }
  };

  return (
    <div ref={parentRef} {...props}>
      {children}
      {overflow.length > 0 && <span style={{ color: "red" }}>{overflow}</span>}
    </div>
  );
};

TextLimiter.propTypes = {
  name: PropTypes.string,
  textfit: PropTypes.bool,
  textfitProps: PropTypes.shape({
    growInHeight: PropTypes.bool,
    widthOnly: PropTypes.bool,
    maxFontSize: PropTypes.number,
    minFontSize: PropTypes.number,
    fontUnit: PropTypes.string
  }),
  maxLines: PropTypes.number,
  maxHeight: PropTypes.number
};
