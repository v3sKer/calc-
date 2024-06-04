// Initializing section
const display = document.querySelector('#calc-display');

let currentOperand = 1;
let firstOperand = [];
let secondOperand = [];
let operator;

let numbersFilter = '0123456789';
let operatorsFilter = ['divide', 'multiply', 'minus', 'plus'];
let toolsFilter = ['clear', 'negative', 'percent', 'dot']

// Display section

function updateDisplay(value) {
  if (typeof value === 'object') {
    display.textContent = value.slice().join('');
    
  } else {
    display.textContent = value;
  }
}

updateDisplay(validate(firstOperand));

// User input section
const allButtons = [...document.querySelectorAll('button')];
allButtons.map(button => button.addEventListener('click', button => {getUserInput(button)}))

function getUserInput(button) {
  let input = button.target.closest('button').dataset.value;

  // Numbers
  if (numbersFilter.includes(input)) {
    if (currentOperand === 1) {
      if (input == 0){
        if (firstOperand.length > 0) {
          firstOperand.push(input);
          updateDisplay(firstOperand);
        }
      } else {
        firstOperand.push(input);
        updateDisplay(firstOperand);
      }
    } else if (currentOperand === 2) {
      if (input == 0){
        if (secondOperand.length > 0) {
          secondOperand.push(input);
          updateDisplay(secondOperand);
        }
      } else {
        secondOperand.push(input);
        updateDisplay(secondOperand);
      }
    } 

  // Operators
  } else if (operatorsFilter.includes(input)) {
    if (currentOperand === 1) {
      currentOperand++;
      operator = input;
    } else if (currentOperand === 2){
      let result = doMath(validate(firstOperand), validate(secondOperand), operator);
      updateDisplay(result);
      firstOperand = [...result.toString()].map(Number);
      secondOperand = [];
      operator = input;
    } 

  // Tools
  } else if (toolsFilter.includes(input)) {
    if (input === 'clear') {
      firstOperand = [];
      secondOperand = [];
      currentOperand = 1;
      updateDisplay(validate(firstOperand));
    }

  } else if (input == 'equals') {
    if (currentOperand == 2) {
      let result = doMath(validate(firstOperand), validate(secondOperand), operator);
      updateDisplay(result);
      firstOperand = [...result.toString()].map(Number);
      secondOperand = [];
    }
  }
}

function validate(item) {
  let length = item.length;
  let validated = item.slice().join('');
  return (length > 0) ? validated : 0;
}

function doMath(firstOperand, secondOperand, operator) {
  let a = parseInt(firstOperand);
  let b = parseInt(secondOperand);

  let result = (operator === 'plus') ? a + b 
    : (operator === 'minus') ? a - b
    : (operator === 'multiply') ? a * b
    : (operator === 'divide') ? 
      (a > 0 && b > 0) ? a / b
      : `bro...`
    : 'calc error'

    return (typeof result === 'number') ? result.toFixed(2) : result;
}