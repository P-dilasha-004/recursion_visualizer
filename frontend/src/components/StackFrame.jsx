import React from "react";

export default function StackFrame({ text, isTop }) {
  return (
    <div
      style={{
        border: "1px solid #333",
        margin: "4px 0",
        padding: "6px 8px",
        backgroundColor: isTop ? "#d1e7dd" : "#f0f0f0", // highlight top of stack
        borderRadius: "6px",
        fontFamily: "monospace",
        boxShadow: isTop ? "0 2px 4px rgba(0,0,0,0.2)" : "none",
      }}
    >
      {text}
    </div>
  );
}
