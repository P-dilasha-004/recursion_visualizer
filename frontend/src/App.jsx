import React, { useState } from "react";
import FunctionInput from "./components/FunctionInput";
import StackVisualizer from "./components/StackVisualizer";

const BUILT_IN = {
  factorial: `function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  }`,

  fibonacci: `function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }`,
};

export default function App() {
  const [history, setHistory] = useState([]);
  const [activeCode, setActiveCode] = useState("");

  const runVisualization = ({ type, param, funcBody }) => {
    const log = [];
    const callStack = [];

    const record = (msg) => {
      log.push({
        stack: [...callStack],
        explanation: msg,
      });
    };

    const codeToUse = BUILT_IN[type] || funcBody;
    setActiveCode(codeToUse);

    const wrap = (fnName, argument, compute) => {
      callStack.push(`${fnName}(${argument})`);
      record(`Entering ${fnName}(${argument})`);

      const output = compute();

      record(`${fnName}(${argument}) → ${output}`);
      callStack.pop();
      return output;
    };

    // recursive functions
    const fact = (n) =>
      wrap("factorial", n, () => (n <= 1 ? 1 : n * fact(n - 1)));

    const fib = (n) =>
      wrap("fibonacci", n, () =>
        n < 2 ? n : fib(n - 1) + fib(n - 2)
      );

    if (type === "factorial") fact(param);
    else if (type === "fibonacci") fib(param);

    setHistory(log);
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Recursion Visualizer</h1>

      <FunctionInput onSubmit={runVisualization} />

      {activeCode && (
        <section style={{ marginTop: 20 }}>
          <h2>Source Code</h2>
          <pre
            style={{
              padding: 12,
              background: "#eee",
              borderRadius: 6,
              fontSize: 14,
              overflowX: "auto",
            }}
          >
            {activeCode}
          </pre>
        </section>
      )}

      {history.length > 0 && (
        <StackVisualizer steps={history} />
      )}
    </div>
  );
}
