function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "No sah!";
    }
    return num1 / num2;
}

function operate(operator, num1, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

const display = document.getElementById('display');
let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetDisplay = false;

function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? value : display.textContent + value;
    }
}

function clearDisplay() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    shouldResetDisplay = false;
}

function handleNumber(number) {
    if (operator === '') {
        firstNumber += number;
    } else {
        secondNumber += number;
    }
    updateDisplay(number);
}

function handleOperator(nextOperator) {
    if (operator !== '') {
        let result = operate(operator, firstNumber, secondNumber);
        if (typeof result === 'string') {
            display.textContent = result;
        } else {
            firstNumber = result;
            display.textContent = firstNumber;
        }
        secondNumber = '';
    }
    operator = nextOperator;
    shouldResetDisplay = true;
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.calculator-body').addEventListener('click', (event) => {
        const { target } = event;
        if (!target.matches('button')) {
            return;
        }

        if (target.classList.contains('clear')) {
            clearDisplay();
            return;
        }

        if (target.classList.contains('operation')) {
            if (target.textContent === '=') {
                if (firstNumber !== '' && operator !== '' && secondNumber !== '') {
                    let result = operate(operator, firstNumber, secondNumber);
                    if (typeof result === 'string') {
                        display.textContent = result;
                    } else {
                        firstNumber = result;
                        display.textContent = firstNumber;
                    }
                    secondNumber = '';
                    operator = '';
                    shouldResetDisplay = true;
                }
            } else {
                handleOperator(target.textContent);
            }
            return;
        }

        if (target.classList.contains('number')) {
            handleNumber(target.textContent);
            return;
        }

        if (target.classList.contains('decimal')) {
            if (!display.textContent.includes('.')) {
                handleNumber(target.textContent);
            }
            return;
        }
    });
});
