let firstOperand = [];
let secondOperand = [];
let currentOperandValue = [];

let firstOperator = null;
let secondOperator = null;

const display = document.querySelector('#calc-display');
const buttons = [...document.querySelectorAll('button')];
buttons.map(button => button.addEventListener('click', button => getUserInput(button)));

// Filters
const numbers = '1234567890';
const operators = ['/', '×', '+', '-'];

updateDisplay();

// USER INPUT FUNCTION
function getUserInput(button) {
  let input = button.target.closest('button').dataset.value;

  // Numbers input
  if (numbers.includes(input)) {
    if(currentOperandValue.length > 20) {
      alert('Value too big.');
      return;
    }

    if (currentOperandValue[0] === '-' && currentOperandValue[1] === '0' && currentOperandValue[2] !== '.') {
      currentOperandValue.splice(1, 1);
    }
    if (currentOperandValue[0] === '0' && currentOperandValue[1] !== '.') {currentOperandValue.shift()}
    if (input !== '0') {currentOperandValue.push(input)}
    else if (input === '0') {
      (currentOperandValue.length === 0) ? currentOperandValue.push(input)
        : (currentOperandValue.length === 1 && currentOperandValue[0] === '0') ? alert('Cannot add more zeros.')
        : (currentOperandValue.length >= 1 && currentOperandValue[0] !== '0') ? currentOperandValue.push(input)
        : console.log('Input error.')
      ;
    }
  }

  // Operators input
  // TODO: DISABLE pressed operator
  
  if (operators.includes(input)) {
    if (firstOperator === null) {
      firstOperator = input; 
      attrFirstOperand();
    }
    else if (firstOperator !== null) {
      if (currentOperandValue.length > 0) {
        secondOperator = input;
        attrSecondOperand();
        firstOperand = doMath(firstOperand, firstOperator, secondOperand);
        firstOperator = secondOperator;
        secondOperand = [];
        secondOperator = null;
      }
      else if (currentOperandValue.length === 0) {
        alert('Please give a value to second operand before selecting next operator.');
      }
    }
  }

  if (input === 'equal') {
    if (firstOperator !== null) {
      attrSecondOperand();
      currentOperandValue = doMath(firstOperand, firstOperator, secondOperand);
      firstOperand = [];
      firstOperator = null;
      secondOperand = [];
    }
  }

  if (input === 'clear') {
    firstOperand = [];
    secondOperand = [];
    currentOperandValue = [];
    firstOperator = null;
    secondOperator = null;
  }

  if (input === 'dot') {
    if (currentOperandValue.includes('.')) {
      alert('Cannot add decimal point to already decimal value.')
    } else {
      if (currentOperandValue.length === 0) {
        currentOperandValue.push('0');
        currentOperandValue.push('.')
      } else {
        currentOperandValue.push('.')
      }
    }
  }

  if (input === 'percent') {
    (firstOperator === null) ? currentOperandValue = toPercent(currentOperandValue)
      : alert('Cannot perform percent operation before you do another one.')
  }

  if (input === 'negative'){
    if (currentOperandValue.length === 0) {currentOperandValue.unshift('-', '0')}
    else if (currentOperandValue[0] !== '-') {currentOperandValue.unshift('-')}
    else {currentOperandValue.shift()};
  }

  updateDisplay();
}

function doMath(aArray, operator, bArray) {
  let a = parseInt(validate(aArray));
  let b = parseInt(validate(bArray));
  let result;

  if (operator === '+') result = a + b
    else if (operator === '-') result = a - b
    else if (operator === '×') result = a * b
    else if (operator === '/') {
      if (a === 0 || b === 0) {
        alert('Dividing by 0 is prohibited.')
        firstOperand = [];
        secondOperand = [];
        currentOperandValue = [];
        firstOperator = null;
        return [];
      } else if (a !== 0 && b !== 0) result = a / b;
    };
  return result.toFixed(2).split('')
}

function validate(array) {
  return (array.length > 0) ? array.slice().join('') : 0;
}

function updateDisplay() {
  display.removeAttribute('class');
  let verifyLength = currentOperandValue.concat(firstOperand, firstOperator, currentOperandValue);
  if (verifyLength.length > 15) {
    console.log(`${verifyLength.length}`)
    display.setAttribute('class', 's');
  }

  if (verifyLength.length > 18) {
    display.setAttribute('class', 'xs');
  }

  (firstOperator === null) ? display.textContent = `${validate(currentOperandValue)}`
    : display.textContent = `${validate(firstOperand)} ${firstOperator} ${validate(currentOperandValue)}`
}


function attrFirstOperand(value = currentOperandValue) {
  firstOperand = value;
  currentOperandValue = [];
}

function attrSecondOperand(value = currentOperandValue) {
  secondOperand = value;
  currentOperandValue = [];
}

function toPercent(value) {
  let validated = validate(value);
  return (validated / 100).toString().split('');
}