"use strict";
class Node {
  constructor(tagName) {
    this._node = document.createElement(tagName);
  }
  toHTML() {
    return this._node.outerHTML;
  }
  toNode() {
    return this._node;
  }
}
class Button extends Node {
  constructor({ text, char, className }) {
    super("button");
    this._node.className = `button ${className}`;
    this._node.textContent = text;
    this._node.setAttribute("data-char", char);
  }
}
class Calculator extends Node {
  constructor() {
    super("div");

    this._node.className = "calculator";
    this._node.innerHTML = `
    <input type="text" class="input">
    <div class="buttons">${this._createButtons("html")}</div>
       `;
    // const buttons = this._createButtons();
    // this._node.lastElementChild.append(...buttons); //один из вариантов, как можно добавить кнопки
    // this._node.addEventListener("click", this._handleClick.bind(this));//alternative way to show input
    this._node.addEventListener("click", (e) => this._handleClick(e));
  }

  _handleClick(e) {
    const button = e.target;
    if (button.tagName !== "BUTTON") return;
    const { char } = button.dataset;
    const input = this._node.firstElementChild;
    input.value += char;
  } //_handleClick - это пример реализации делегирования
  _createButtons(type = "node") {
    const chars = [
      "7",
      "8",
      "9",
      "/",
      "4",
      "5",
      "6",
      "*",
      "1",
      "2",
      "3",
      "-",
      ".",
      "0",
      "c",
      "+",
      "=",
    ];
    const types = {
      node: "toNode",
      html: "toHTML",
    };

    const buttons = chars.map((char) => {
      let className;
      switch (char) {
        case "/":
        case "*":
        case "+":
        case "-":
        case ".":
          className = "yellow";
          break;
        case "=":
          className = "green";
          break;
        case "c":
          className = "red";
          break;
        default:
          className = "blue";
      }
      const button = new Button({
        text: char,
        char,
        className,
      });

      return button[types[type]]();
    });
    return type === "html" ? buttons.join(" ") : buttons;
  }
}

const calc = new Calculator();
const app = document.getElementById("app");
app.append(calc.toNode());
