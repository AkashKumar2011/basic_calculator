const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let memory = 0;

function updateDisplay() {
  display.innerText = currentInput;
}
function isOperator(char) {
  return ["+", "-", "*", "/", "%", "."].includes(char);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      if (currentInput === "0" || currentInput === "00") currentInput = number;
      else currentInput += number;
    } else if (action) {
      switch (action) {
        case "clear":
          currentInput = "0";
          break;
        case "del":
          // Remove last character
          currentInput = currentInput.slice(0, -1);
          if (currentInput === "") currentInput = "0";
          break;
        case "+":
        case "-":
        case "*":
        case "/":
        case ".":
        case "mod":
        
          const operator = action === "mod" ? "%" : action;

          // 🛑 Prevent multiple operators
          if (isOperator(currentInput.slice(-1))) {
            currentInput = currentInput.slice(0, -1) + operator;
          } else {
            currentInput += operator;
          }
          break;

        
        case "sqrt":
          try {
            //eval() is a JavaScript function that takes a string as input and executes it as JavaScript code.
            currentInput = Math.sqrt(eval(currentInput)).toString();
          } catch {
            currentInput = "Error";
          }
          break;
        case "square":
          try {
            currentInput = Math.pow(eval(currentInput), 2).toString();
          } catch {
            currentInput = "Error";
          }
          break;
        case "=":
          try {
            currentInput = eval(currentInput).toString();
          } catch {
            currentInput = "Error";
          }
          break;
        case "m+":
          try {
            memory += eval(currentInput);
            currentInput = "0";
            console.log(memory);
          } catch {
            memory = 0;
          }
          break;
        case "m-":
          try {
            memory -= eval(currentInput);
            currentInput = "0";
            console.log(memory);
          } catch {
            memory = 0;
          }
          break;
        case "mr":
          currentInput = memory.toString();
          console.log(memory);
          break;
        case "mc":
          memory = 0;
          console.log(memory);
          break;
      }
    }

    updateDisplay();
  });
});

updateDisplay();
