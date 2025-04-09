const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let memory = 0;

function updateDisplay() {
  display.innerText = currentInput;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;
    const action = button.dataset.action;

    if (number !== undefined) {
      if (currentInput === "0") currentInput = number;
      else currentInput += number;
    } else if (action) {
      switch (action) {
        case "clear":
          currentInput = "0";
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          currentInput += action;
          break;
        case "mod":
          currentInput += "%";
          break;
        case ".":
          currentInput += ".";
          break;
        case "sqrt":
          try {
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
        case "M+":
          try {
            memory += eval(currentInput);
          } catch {}
          break;
        case "M-":
          try {
            memory -= eval(currentInput);
          } catch {}
          break;
        case "MR":
          currentInput = memory.toString();
          break;
        case "MC":
          memory = 0;
          break;
      }
    }

    updateDisplay();
  });
});

updateDisplay();
