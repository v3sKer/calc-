/*
  CALL UPDATE DISPLAY

  Listen every button of calculator
    CALL USER INPUT with pressed button

  let firstOperand = [];
  let secondOperand = [];
  let currentOperandValue = [];

  let firstOperator = null;
  let secondOperator = null;

________________________________________________________________________________
  USER INPUT (button)

    ENABLE previously disabled operators

    IF pressed button is a number
      IF number value > 0
        Add pressed number value to currentOperandValue
      IF number value === 0
        IF currentOperandValue length === 0
          Add 0 to currentOperandValue
        IF currentOperandValue length = 1 and currentOperandValue[0] === 0
          ALERT 'cannot add more zeros'
        IF currentOperandValue length >= 1 and currentOperandValue[0] !== 0
          Add 0 to currentOperandValue
        
    IF pressed button is an operator
      DISABLE pressed operator (preventing stuff)
      IF firstOperator is null
        Add pressed operator value to firstOperator
        
        Attribute currentOperandValue as firstOperand
        Clear currentOperandValue
      IF first operator is not null
        IF currentOperandValue length > 0
          Attribute currentOperandValue as secondOperand
          Clear currentOperandValue

          Add pressed operator to secondOperator
          Call MATH function with (firstOperand, firstOperator, secondOperand)
          Attribute MATH result as firstOperand
          Attribute second operator as first operator
          Clear secondOperand
          Clear secondOperator
        IF second operand length === 0
          ALERT 'before selecting next operator please fill second operand'


    IF pressed button is 'equal'
      IF firstOperator !== null
        Attribute currentOperandValue as secondOperand
        clear currentOperandValue

        CALL MATH with (firstOperand, firstOperator, secondOperand)
        Attribute MATH result as firstOperand
        Clean firstOperator, secondOperand
      ELSE 


    IF pressed button is 'dot'
      IF current operand already has a dot
        ALERT 'cannot add decimal point to already decimal value'
      ELSE
        ADD dot to current operand


    IF pressed button is 'percent'
      IF current operand is second operand
        ALERT 'cannot perform percent operation before equality'
      IF current operand is first operand
        DISPLAY (validated first operand / 100)

    IF pressed button is 'negative'
      

    CALL UPDATE_DISPLAY
________________________________________________________________________________


________________________________________________________________________________
  MATH FUNCTION (first operand, operator, second operand)

    LET a be VALIDATE first operand
    LET b be VALIDATE second operand
    LET result

    IF operator is '+' - result = a+b
    IF operator is '-' - result = a-b
    IF operator is '×' - result = a*b
    IF operator is '/'
      IF a or b is 0
        DISPLAY 'bro divided by 0..'
      IF a and b is not 0
        result = a/b
    
    RETURN result as a separated array
________________________________________________________________________________


________________________________________________________________________________
  VALIDATION FUNCTION (array)

    IF array length > 0
      RETURN array joined copy
    IF array length === 0
      RETURN 0
________________________________________________________________________________


________________________________________________________________________________
  UPDATE DISPLAY 

    IF current operand is first
      DISPLAY validated current operand
    IF current operand is second
      DISPLAY validated first operand
      DISPLAY first operator
      DISPLAY validated second operand
________________________________________________________________________________
*/