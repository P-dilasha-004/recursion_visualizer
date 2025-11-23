import React, { useState, useRef, useEffect } from "react";
import StackFrame from "./StackFrame";

const StackVisualizer = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stackRef = useRef([]);

  useEffect(() => {
    // Animate the last stack frame added or removed
    const lastIndex = stackRef.current.length - 1;
    if (lastIndex >= 0 && stackRef.current[lastIndex]) {
      stackRef.current[lastIndex].animate(
        [
          { transform: "translateY(-20px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 300, fill: "forwards" }
      );
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const { stack, explanation } = steps[currentStep] || { stack: [], explanation: "" };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Recursion Call Stack</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Stack Visualization */}
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", minWidth: "200px" }}>
          <h3>Stack Frames</h3>
          {stack.map((frame, idx) => (
            <div key={idx} ref={(el) => (stackRef.current[idx] = el)}>
              <StackFrame text={frame} isTop={idx === stack.length - 1} />
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
          <h3>Explanation</h3>
          <p style={{ fontFamily: "monospace" }}>{explanation}</p>
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} disabled={currentStep === 0} style={{ marginRight: "10px" }}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next Step
        </button>
      </div>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        Step {currentStep + 1} of {steps.length}
      </p>
    </div>
  );
};

export default StackVisualizer;
