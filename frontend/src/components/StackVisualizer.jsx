import React, { useState } from "react";
import StackFrame from "./StackFrame";

export default function StackVisualizer({ steps }) {
  const [index, setIndex] = useState(0);

  const step = steps[index] || { stack: [], explanation: "" };

  const next = () => {
    if (index < steps.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Call Stack</h2>

      <div style={{ display: "flex", gap: 20 }}>
        {/* Stack column */}
        <div
          style={{
            minWidth: 180,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <h3>Frames</h3>

          {step.stack.map((frame, i) => (
            <StackFrame
              key={i}
              text={frame}
              isTop={i === step.stack.length - 1}
            />
          ))}

          {step.stack.length === 0 && (
            <p style={{ color: "#888" }}>Stack empty</p>
          )}
        </div>

        {/* Explanation column */}
        <div
          style={{
            flex: 1,
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
          }}
        >
          <h3>Explanation</h3>
          <p style={{ fontFamily: "monospace" }}>{step.explanation}</p>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={prev} disabled={index === 0} style={{ marginRight: 10 }}>
          Previous
        </button>
        <button onClick={next} disabled={index === steps.length - 1}>
          Next
        </button>
      </div>

      <p style={{ marginTop: 10, fontSize: 14 }}>
        Step {index + 1} / {steps.length}
      </p>
    </div>
  );
}
