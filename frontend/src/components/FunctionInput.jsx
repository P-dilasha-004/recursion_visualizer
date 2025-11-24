import React, { useState } from "react";

export default function FunctionInput({ onSubmit }) {
  const [type, setType] = useState("factorial");
  const [value, setValue] = useState(5);
  const [custom, setCustom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      type,
      param: Number(value),
      funcBody: custom,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <label>
          Function:
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ marginLeft: 8 }}
          >
            <option value="factorial">Factorial</option>
            <option value="fibonacci">Fibonacci</option>
            <option value="custom">Custom</option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label>
          Parameter:
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
      </div>

      {type === "custom" && (
        <div style={{ marginBottom: 10 }}>
          <label>
            Custom function:
            <textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              rows={7}
              cols={50}
              style={{
                display: "block",
                marginTop: 6,
                fontFamily: "monospace",
              }}
            />
          </label>
        </div>
      )}

      <button type="submit">Visualize</button>
    </form>
  );
}
