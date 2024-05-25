import React from "react";

const getMentionValueById = (id) => {
  // TODO If we know how to change the mention value, implement it here.
  // Possible implementation would be a map and some useEffect mechanism.
  return null;
};

const Clause = ({ children, styles }) => {
  return (
    <div className="inline clause" style={styles}>
      <span>{children}</span>
    </div>
  );
};

const DynamicElement = ({ element, clauseCount }) => {
  const { type, text, children, bold, underline, italic } = element;
  if (type === "clause") {
    console.log("element", element);
    console.log("clauseCount", clauseCount);
  }

  const baseStyles = {
    ...(bold && { fontWeight: "bold" }),
    ...(underline && { textDecoration: "underline" }),
    ...(italic && { fontStyle: "italic" }),
  };

  const renderChildren = () => {
    if (!children || !Array.isArray(children)) return null;
    return children.map((child, index) => (
      <DynamicElement key={index} element={child} />
    ));
  };

  const renderTextWithLineBreaks = (text, styles) => {
    const lines = text?.split("\n");

    return lines?.map((line, index) => (
      <React.Fragment key={index}>
        <span className="text" style={styles}>
          {line}
        </span>
        {index < lines.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!type) {
    return renderTextWithLineBreaks(text, baseStyles);
  }

  switch (type) {
    case "mention": {
      const { color, title, id, value, bold, underline, italic } = element;
      const mentionValue = getMentionValueById(id);
      const mentionText = mentionValue || value || renderChildren();

      return (
        <span
          style={{
            backgroundColor: color,
            color: "white",
            borderRadius: "3px",
            boxSizing: "border-box",
            fontWeight: bold ? "bold" : "inherit",
            textDecoration: underline ? "underline" : "inherit",
            fontStyle: italic ? "italic" : "inherit",
          }}
          title={title}
        >
          {mentionText}
        </span>
      );
    }
    case "clause":
      return (
        <Clause style={baseStyles} count={clauseCount}>
          {text}
          {renderChildren()}
        </Clause>
      );

    case "lic":
      return (
        <span style={baseStyles}>
          {text}
          {renderChildren()}
        </span>
      );
    default: {
      const TagName = type;

      return (
        <TagName style={baseStyles}>
          {text}
          {renderChildren()}
        </TagName>
      );
    }
  }
};

export default DynamicElement;
