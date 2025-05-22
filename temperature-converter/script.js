const form = document.getElementById('temp-form');
const tempInput = document.getElementById('temp-input');
const dropdowns = document.querySelectorAll('.dropdown-div');
const resultText = document.getElementById('result');

const temperatures = ['Fahrenheit', 'Celsius', 'Kelvin'];

dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const dropdownBtn = dropdown.querySelector('.dropdown-button');
    const dropdownIcon = dropdown.querySelector('.dropdown-icon');
    const dropdownText = dropdown.querySelector('.dropdown-text');
    const dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
    const input = dropdown.querySelector('input');

    dropdownOptions.forEach((option, index) => {
        if (!option.getAttribute('data-value')) {
            option.setAttribute('data-value', index);
        }

        option.addEventListener('click', (event) => {
            selectDropdownOption(event, dropdownOptions, event.currentTarget, dropdownText, input, dropdownContent, dropdownIcon);
        });
    });
    
    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContent.classList.toggle('visible');
        dropdownIcon.innerHTML = dropdownIcon.innerHTML == 'v' ? 'ʌ' : 'v';
    });
});

tempInput.addEventListener('change', validateForm);

document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown-content').classList.remove('visible');
        dropdown.querySelector('.dropdown-icon').innerHTML = 'v';
    })
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const temperature = parseFloat(form.temp.value);
    const fromUnit = form.from.value;
    const toUnit = form.to.value;
    const convertedTemp = convertTemperature(temperature, fromUnit, toUnit).toFixed(2);

    resultText.innerHTML = `${temperature} ${temperatures[fromUnit]} to ${temperatures[toUnit]} is ${convertedTemp}`;
    resultText.classList.add('visible');
});

function selectDropdownOption(event, options, clickedOpt, dropdownText, input, dropdownContent, dropdownIcon) {
    event.stopPropagation();

    options.forEach(option => option.querySelector('.option-icon').innerHTML = "");

    clickedOpt.querySelector('.option-icon').innerHTML = "✓";

    dropdownText.innerHTML = clickedOpt.querySelector('.option-text').innerHTML;

    input.value = clickedOpt.getAttribute('data-value');
    dropdownContent.classList.remove('visible');
    dropdownIcon.innerHTML = "v";
    validateForm();
}

function validateForm() {
    const submitBtn = document.getElementById('submit');

    // all of the fields need to have a valid value
    submitBtn.disabled = !(form.temp.value && form.from.value && form.to.value);
}

function convertTemperature(temp, fromUnit, toUnit) {
    // they are the same unit
    if (fromUnit == toUnit) { 
        return temp
    }
    // from Fahrenheit
    if (fromUnit == 0) {
        if (toUnit == 1) { // to Celsius
            return (temp-32) * (5/9)
        }
        if (toUnit == 2) { // to Kelvin
            return (temp-32) * (5/9) + 273.15
        }
    }
    // from Celsius
    if (fromUnit == 1) {
        if (toUnit == 0) { // to Fahrenheit
            return temp * (5/9) + 32
        }
        if (toUnit == 2) { // to Kelvin
            return temp + 273.15
        }
    }
    // from Kelvin
    if (toUnit == 0) { // to Fahrenheit
        return (temp - 273.15) * (5/9) + 32
    }
    if (toUnit == 1) { // to Celsius
        return temp - 273.15
    }
} 