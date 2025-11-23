import React, { useState } from "react";
import FunctionInput from "./components/FunctionInput";
import StackVisualizer from "./components/StackVisualizer";

const App = () => {
  const [steps, setSteps] = useState([]);
  const [funcCode, setFuncCode] = useState("");

  const generateSteps = ({ type, param, funcBody }) => {
    const resultSteps = [];
    const stack = [];

    const pushStep = (explanation) => {
      resultSteps.push({ stack: [...stack], explanation });
    };

    // Built-in code strings for display
    const factorialCode = `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`;

    const fibonacciCode = `function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n-1) + fibonacci(n-2);
}`;

    setFuncCode(
      type === "factorial" ? factorialCode :
      type === "fibonacci" ? fibonacciCode :
      funcBody
    );

    // Built-in factorial
    const factorial = (n) => {
      stack.push(`factorial(${n})`);
      pushStep(`Called factorial(${n})`);
      if (n <= 1) { pushStep(`Base case reached: returns 1`); stack.pop(); return 1; }
      const res = n * factorial(n - 1);
      pushStep(`factorial(${n}) returns ${res}`);
      stack.pop();
      return res;
    };

    // Built-in fibonacci
    const fibonacci = (n) => {
      stack.push(`fibonacci(${n})`);
      pushStep(`Called fibonacci(${n})`);
      if (n === 0) { pushStep(`Base case reached: returns 0`); stack.pop(); return 0; }
      if (n === 1) { pushStep(`Base case reached: returns 1`); stack.pop(); return 1; }
      const res = fibonacci(n - 1) + fibonacci(n - 2);
      pushStep(`fibonacci(${n}) returns ${res}`);
      stack.pop();
      return res;
    };

    // Custom function executor supporting any recursion
    const executeCustomFunction = (funcStr, param) => {
      try {
        // Create a wrapper function that injects stack and pushStep
        const wrapper = new Function("param", "stack", "pushStep", `
          // User-defined function must be named, e.g., function sumArray(arr) {...}
          ${funcStr}
          // Automatically detect first declared function name
          const funcName = Object.keys({ ${funcStr.match(/function (\w+)\(/)[1]} })[0] || "${funcStr.match(/function (\w+)\(/)[1]}";
          return ${funcStr.match(/function (\w+)\(/)[1]}(param);
        `);

        return wrapper(param, stack, pushStep);
      } catch (err) {
        pushStep(`Error: ${err.message}`);
        return null;
      }
    };

    // Execute the chosen function
    if (type === "factorial") factorial(param);
    else if (type === "fibonacci") fibonacci(param);
    else if (type === "custom") executeCustomFunction(funcBody, param);

    // Update state
    setSteps(resultSteps);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Recursion Step Visualizer</h1>
      <FunctionInput onSubmit={generateSteps} />

      {funcCode && (
        <div style={{ marginTop: "20px" }}>
          <h2>Function Code</h2>
          <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px", fontFamily: "monospace" }}>
            {funcCode}
          </pre>
        </div>
      )}

      {steps.length > 0 && <StackVisualizer steps={steps} />}
    </div>
  );
};

export default App;
