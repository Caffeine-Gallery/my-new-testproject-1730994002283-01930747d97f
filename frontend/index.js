import { backend } from 'declarations/backend';

let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
};

window.setOperation = (operation) => {
    if (currentOperation !== null) calculate();
    firstNumber = display.value;
    currentOperation = operation;
    shouldResetDisplay = true;
};

window.calculate = async () => {
    if (currentOperation === null || shouldResetDisplay) return;

    secondNumber = display.value;
    display.value = 'Calculating...';

    try {
        let result;
        switch (currentOperation) {
            case '+':
                result = await backend.add(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '-':
                result = await backend.subtract(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '*':
                result = await backend.multiply(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '/':
                result = await backend.divide(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
        }
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }

    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    shouldResetDisplay = true;
};
