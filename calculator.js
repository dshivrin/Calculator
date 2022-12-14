class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.finishedCalculation = false; //used only when user clicks equals, enables to chain operations but not chaining numbers to computed result
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(number)) return;
    if (this.finishedCalculation) this.clear();
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "" && operation === "-") {
      //handle negative numbers
      this.currentOperand = "0";
    }
    if (this.currentOperand === "") return;
    if (this.previousOperand != "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.finishedCalculation = false;
  }

  compute(isFinished) {
    let computation;
    let prev = parseFloat(this.previousOperand);
    let current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        console.log("Something went terribly wrong");
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";

    this.finishedCalculation = isFinished;
  }

  //Adding commas for readability e.g. 555,555,555
  formatNumber(number) {
    const stringNumber = number.toString();
    const integerPart = parseFloat(stringNumber.split(".")[0]);
    const decimalPart = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerPart)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerPart.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalPart) {
      return `${integerDisplay}.${decimalPart}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.formatNumber(
      this.currentOperand
    );
    if (this.operation) {
      this.previousOperandTextElement.innerText = `${this.formatNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}
