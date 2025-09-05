const keyMap = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
  "%": "%",
  ".": ".",
  Enter: "=",
  "=": "=",
  Backspace: "DEL",
  Escape: "C",
  sin: "sin(",
  cos: "cos(",
  tan: "tan(",
  ".": ".",
  π: "π",
  "1/X": "reciprocal",
  "x!": "factorial",
  sqrt: "sqrt",
  e: "e",
  "(": "(",
  ")": ")",
  Inv: "inv",
  log: "log",
  "^": "^",
  Exp: "exp",
};

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key in keyMap) {
    const value = keyMap[key];
    console.log("key pressed", value);
    handleInput(value);
  }
});

const backspaceBtn = document.querySelector(".backspace-button");
backspaceBtn.addEventListener("click", () => handleInput("DEL"));

const buttons = document.querySelectorAll(
  ".numbers button, .operators button, .scientific button"
);

buttons.forEach((button) =>
  button.addEventListener("click", function (event) {
    const key = event.target.textContent;
    if (key in keyMap) {
      const value = keyMap[key] || [key];
      console.log("key pressed", value);
      handleInput(value);
    }
  })
);

const clearBtn = document.querySelector(".clear-button");
clearBtn.addEventListener("click", () => handleInput("C"));

let inverseMode = false;

function log10(x) {
  return Math.log(x) / Math.LN10;
}

function handleInput(value) {
  const display = document.getElementById("display");

  if (value === "C") {
    display.value = "";
  } else if (value === "DEL") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      let expression = display.value
        .replace(/sin\(/g, inverseMode ? "Math.asin(" : "Math.sin(")
        .replace(/cos\(/g, inverseMode ? "Math.acos(" : "Math.cos(")
        .replace(/tan\(/g, inverseMode ? "Math.atan(" : "Math.tan(")
        .replace(/log\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/Exp/g, "*10**")
        .replace(/π/g, "Math.PI")
        .replace(/\be\b/g, "Math.E");

      expression = expression.replace(/(\d+)\^(\d+)/g, "Math.pow($1,$2)");
      expression = expression.replace(/log\(/g, "log10(");

      display.value = eval(expression);
    } catch {
      display.value = "Error";
    }
  } else if (value === "reciprocal") {
    display.value = 1 / parseFloat(display.value || "1");
  } else if (value === "factorial") {
    let n = parseInt(display.value);
    if (isNaN(n) || n < 0) {
      display.value = "Error";
    } else {
      let fact = 1;
      for (i = 1; i <= n; i++) fact *= i;
      display.value = fact;
    }
  } else if (value === "inv") {
    inverseMode = !inverseMode;
  } else if (value === "Exp") {
    const lastChar = display.value.slice(-1);
    if (!lastChar || isNaN(lastChar)) {
      display.value = "1*10**";
    } else {
      display.value += "*10**";
    }
  } else {
    display.value += value;
  }
}
