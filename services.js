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
};

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key in keyMap) {
    const value = keyMap[key];
    console.log("key pressed", value);
    handleInput(value);
  }
});

const buttons = document.querySelectorAll(".numbers button, .operators button");

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

function handleInput(value) {
  const display = document.getElementById("display");
  if (value === "C") {
    display.value = "";
  } else if (value === "DEL") {
    display.value = display.value.slice(0, -1);
  } else if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else {
    display.value += value;
  }
}
