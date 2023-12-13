const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.keys');
const display = document.querySelector('.output');

let firstValue = null;
let operator = null;
let awaitingNextValue = false;

const calculate = (n1, operator, n2) => {
    let result = '';
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    if (operator === 'add') {
        result = num1 + num2;
    } else if (operator === 'subtract') {
        result = num1 - num2;
    } else if (operator === 'multiply') {
        result = num1 * num2;
    } else if (operator === 'divide') {
        result = num1 / num2;
    }
    return result;
};

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;

        if (!action) {
            if (awaitingNextValue) {
                display.textContent = keyContent;
                awaitingNextValue = false;
            } else {
                display.textContent =
                    display.textContent === '0' ? keyContent : display.textContent + keyContent;
            }
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const currentValue = display.textContent;
            if (firstValue === null) {
                firstValue = currentValue;
                operator = action;
                awaitingNextValue = true;
            } else {
                const result = calculate(firstValue, operator, currentValue);
                display.textContent = result;
                firstValue = result;
                operator = action;
                awaitingNextValue = true;
            }
        }

        if (action === 'squareroot') {
            const currentValue = parseFloat(display.textContent);
            if (currentValue >= 0) {
                display.textContent = Math.sqrt(currentValue);
            } else {
                display.textContent = 'Error';
            }
        }

        if (action === 'percentage') {
            const currentValue = parseFloat(display.textContent);
            const previousValue = parseFloat(firstValue);
        
            if (!isNaN(previousValue)) {
                const percentageValue = previousValue * (currentValue / 100);
                display.textContent = percentageValue;
            } else {
                const percentageValue = currentValue / 100;
                display.textContent = percentageValue;
            }
        
            awaitingNextValue = true;
        }
        

        if (action === 'decimal') {
            if (!display.textContent.includes('.')) {
                display.textContent += '.';
            }
        }

        if (action === 'clear') {
            display.textContent = '0';
            firstValue = null;
            operator = null;
            awaitingNextValue = false;
        }

        if (action === 'calculate') {
            const currentValue = display.textContent;
            if (firstValue !== null && operator !== null) {
                display.textContent = calculate(firstValue, operator, currentValue);
                firstValue = null;
                operator = null;
                awaitingNextValue = true;
            }
        }
    }
});
