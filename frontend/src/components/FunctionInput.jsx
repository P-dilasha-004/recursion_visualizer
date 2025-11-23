import React, { useState } from "react";

const FunctionInput = ({ onSubmit }) => {
  const [funcType, setFuncType] = useState("factorial");
  const [param, setParam] = useState(5);
  const [customFunc, setCustomFunc] = useState(
    `// Use recurse(n) for recursion, stack for frames, pushStep("text") to record steps\n`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type: funcType,
      param: parseInt(param),
      funcBody: customFunc,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Choose a function:
          <select
            value={funcType}
            onChange={(e) => setFuncType(e.target.value)}
            style={{ marginLeft: "10px" }}
          >
            <option value="factorial">Factorial</option>
            <option value="fibonacci">Fibonacci</option>
            <option value="custom">Custom</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Parameter (n):
          <input
            type="number"
            value={param}
            onChange={(e) => setParam(e.target.value)}
            style={{ marginLeft: "10px", width: "60px" }}
          />
        </label>
      </div>

      {funcType === "custom" && (
        <div style={{ marginBottom: "10px" }}>
          <label>
            Custom recursive function:
            <textarea
              value={customFunc}
              onChange={(e) => setCustomFunc(e.target.value)}
              rows={8}
              cols={50}
              style={{ display: "block", marginTop: "5px", fontFamily: "monospace" }}
            />
          </label>
        </div>
      )}

      <button type="submit">Visualize</button>
    </form>
  );
};

export default FunctionInput;
