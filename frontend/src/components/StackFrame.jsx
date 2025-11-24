import React from "react";

export default function StackFrame({ text, isTop }) {
  const style = {
    padding: "6px 8px",
    margin: "4px 0",
    borderRadius: 4,
    border: "1px solid #888",
    background: isTop ? "#cfe9ff" : "#f7f7f7",
    fontFamily: "monospace",
  };

  return <div style={style}>{text}</div>;
}
