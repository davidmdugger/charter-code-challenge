import React, { Component } from "react";
import "./App.css";

class Calculator extends Component {
  state = {
    output: "0",
    value: null,
    operator: null,
    needNextNumber: false
  };

  buttonValueHandler = e => {
    const { output, needNextNumber } = this.state;
    const value = e.target.innerText;

    if (needNextNumber) {
      this.setState({
        output: value,
        needNextNumber: false
      });
    } else {
      // if output is equal to 0, just show 0; otherwise append the new button clicked value to the output
      this.setState({
        output: output === "0" ? String(value) : output + value
      });
    }
  };

  clearOutput = () => {
    this.setState({
      output: "0",
      value: null,
      operator: null,
      needNextNumber: false
    });
  };

  decimalHandler = e => {
    const { output, needNextNumber } = this.state;
    const value = e.target.innerText;

    if (needNextNumber) {
      this.setState({
        output: value,
        needNextNumber: false
      });
    } else if (output.indexOf(".") === -1) {
      this.setState({
        output: output + value
      });
    }
  };

  percentHandler = () => {
    let { output } = this.state;
    output = parseFloat(output);
    output = output / 100;

    this.setState({
      output: String(output)
    });
  };

  deleteChar = () => {
    let outputCopy = this.state.output;

    if (outputCopy.length > 0) {
      outputCopy = outputCopy.slice(0, -1);

      this.setState({
        output: outputCopy
      });
    }
  };

  performOperation = newOperator => {
    const { output, operator, value } = this.state;
    const nextValue = parseFloat(output);

    const operations = {
      "/": (firstVal, nextVal) => firstVal / nextVal,
      "*": (firstVal, nextVal) => firstVal * nextVal,
      "+": (firstVal, nextVal) => firstVal + nextVal,
      "-": (firstVal, nextVal) => firstVal - nextVal,
      "=": nextVal => nextVal
    };

    if (newOperator === "//") {
      const sqrt = Math.sqrt(output);
      this.setState({
        output: sqrt
      });
    } else if (value === null) {
      this.setState({
        value: nextValue
      });
    } else if (operator) {
      const currentValue = value || 0;
      const result = operations[operator](currentValue, nextValue);

      this.setState({
        value: result,
        output: String(result)
      });
    }
    this.setState({
      needNextNumber: true,
      operator: newOperator
    });
  };

  render() {
    const { output } = this.state;

    return (
      <div className="calculator">
        <input type="text" value={output} disabled={true} />
        <div className="button-container">
          <button onClick={this.clearOutput}>Clear</button>
          {/* Backspace button */}
          <button onClick={this.deleteChar}>&#x02190;</button>
          {/* Percent button */}
          <button onClick={this.percentHandler}>&#x00025;</button>
          {/* Square Root  */}
          <button onClick={() => this.performOperation("//")}>&#x0221A;</button>

          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            7
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            8
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            9
          </button>
          {/* Divide  */}
          <button onClick={() => this.performOperation("/")}>&#x000F7;</button>

          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            4
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            5
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            6
          </button>
          {/* Multiply */}
          <button onClick={() => this.performOperation("*")}>&#x000D7;</button>

          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            1
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            2
          </button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            3
          </button>
          {/* Subtract  */}
          <button onClick={() => this.performOperation("-")}>&#x02212;</button>

          {/* Decimal */}
          <button onClick={e => this.decimalHandler(e)}>&#x0002E;</button>
          <button className="number" onClick={e => this.buttonValueHandler(e)}>
            0
          </button>
          {/* Equal */}
          <button onClick={() => this.performOperation("=")}>&#x0003D;</button>
          {/* Add */}
          <button onClick={() => this.performOperation("+")}>&#x0002B;</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
