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
  asin: "asin(",
  cos: "cos(",
  acos: "acos(",
  tan: "tan(",
  atan: "atan(",
  ".": ".",
  π: "π",
  "1/X": "reciprocal",
  "x!": "factorial",
  "√": "√(",
  "x²": "square",
  "y√x": "root",
  ln: "ln",
  "e^": "exp",
  e: "e",
  "(": "(",
  ")": ")",
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

function log10(x) {
  return Math.log(x) / Math.LN10;
}

let rootFirstNum = null;

function handleInput(value) {
  const display = document.getElementById("display");

  if (value === "C") {
    display.value = "";
  } else if (value === "DEL") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      let expr = display.value.trim();

      // Handle Factorial
      expr = expr.replace(/(\d+)!/g, (match, numStr) => {
        const n = parseInt(numStr, 10);

        if (isNaN(n) || n < 0) throw "Error";
        if (n > 170) throw "Too Big"; // prevent Infinity

        let fact = 1;
        for (let i = 2; i <= n; i++) fact *= i;
        return fact.toString();
      });

      // Handle Power
      expr = expr.replace(/\^/g, "**");

      expr = expr
        .replace(/asin\(/g, "Math.asin(")
        .replace(/acos\(/g, "Math.acos(")
        .replace(/atan\(/g, "Math.atan(")
        .replace(/(?<!a)sin\(/g, "Math.sin(")
        .replace(/(?<!a)cos\(/g, "Math.cos(")
        .replace(/(?<!a)tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/π/g, "Math.PI")
        .replace(/²/g, "**2")
        .replace(/root\(([^,]+),([^)]+)\)/g, (_, y, x) => {
          return `Math.pow(${x}, 1/${y})`;
        })
        .replace(/ln\(/g, "Math.log(")
        .replace(/\be\b/g, "Math.E");

      console.log("Final expression:", expr);

      const result = Function('"use strict"; return (' + expr + ")")();
      display.value = result;
      rootFirstNum = null;
    } catch (e) {
      display.value = "Error";
      rootFirstNum = null;
    }
  } else if (value === "factorial") {
    display.value += "!";
  } else if (value === "reciprocal") {
    display.value = 1 / parseFloat(display.value || "1");
  } else if (value === "square") {
    display.value += "²";
  } else if (value === "root") {
    if (!rootFirstNum) {
      rootFirstNum = display.value;
      display.value = "root(" + rootFirstNum + ",";
    }
  } else if (value === "exp") {
    display.value += "e^";
  } else if (value === "ln") {
    display.value += "ln(";
  } else {
    display.value += value;
  }
}
