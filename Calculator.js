import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const operations = ["+", "-", "*", "/"];

  const handleOperation = (operation) => {
    // convert string input into number
    const num1 = parseFloat(input1);
    const num2 = parseFloat(input2);

    // if input is not a number
    if (isNaN(num1) || isNaN(num2)) {
      setError(num1 ? "Num 2 is empty." : "Num 1 is empty.");
      setResult("");
      setSuccessMessage("");
    } else {
      // if input is a number setError as empty
      setError("");
      let calculatedResult;

      // if inputs are number then we can perform operations.
      // if button operation is "+" perform addition and so on......
      switch (operation) {
        case "+":
          calculatedResult = num1 + num2;
          break;
        case "-":
          calculatedResult = num1 - num2;
          break;
        case "*":
          calculatedResult = num1 * num2;
          break;
        case "/":
          calculatedResult = num1 / num2;
          break;
        default:
          calculatedResult = "";
      }

      setResult(
        // check if result is integer or decimal
        calculatedResult % 1 === 0 /*2 % 1 === 0*/ ||
          calculatedResult.toFixed(2) % 1 === 0 /*2.00 % 1 === 0*/
          ? calculatedResult.toFixed(0) // if integer dont put decimal
          : calculatedResult.toFixed(2) // if decimal put upto n decimal places
      );
      setSuccessMessage("Success!");
    }
  };

  const handleInputChange = (inputNumber, value) => {
    if (inputNumber === 1) {
      setInput1(value);
    } else if (inputNumber === 2) {
      setInput2(value);
    }

    // Clear result and messages when input fields are cleared
    setResult("");
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="card">
      <h2>React Calculator</h2>
      <div className="input-container">
        <input
          // by default input value is a string value
          type="text"
          placeholder="Num 1"
          value={input1}
          // on change in input value call a function to set new input
          onChange={(e) => handleInputChange(1, e.target.value)}
        />
        <input
          // by default input value is a string value
          type="text"
          placeholder="Num 2"
          value={input2}
          // on change in input call a function to set new input
          onChange={(e) => handleInputChange(2, e.target.value)}
        />
      </div>
      <div className="button-container">
        {operations.map((operation) => (
          // when we click on the operation button we call a function
          // function perfroms some actions
          //1. converting the type of the input from string to number.
          //2. if input string is a number perform operations else throw error.
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
      </div>

      {/* if error state is true or not empty then run the code inside (...)  */}
      {error && (
        <div>
          <h3 className="error-title">Error</h3>
          <p className="error-message">{error}</p>
        </div>
      )}
      {/* if successMessage state is true then display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="result">{result && <p>Result: {result}</p>}</div>
    </div>
  );
};

export default Calculator;
