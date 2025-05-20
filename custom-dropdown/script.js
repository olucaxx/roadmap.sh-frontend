const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownIcon = dropdownButton.querySelector('.dropdown-icon');
const hiddenInput = document.getElementById("dropdown")

const dropdownOptions = document.querySelectorAll('.dropdown-option')

dropdownOptions.forEach((item, index) => {
    if (!item.getAttribute('data-value')) {
        item.setAttribute('data-value', index + 1);
    }

    item.addEventListener('click', selectOption);
})

function selectOption() {
    dropdownOptions.forEach(item => {
        item.querySelector('.dropdown-select').innerHTML = ""
    });

    this.querySelector('.dropdown-select').innerHTML = "✓";
    dropdownButton.querySelector('.dropdown-text').innerHTML = this.querySelector('.dropdown-text').innerHTML;

    hiddenInput.value = this.getAttribute('data-value');

    dropdownContent.classList.remove('visible');
    dropdownIcon.innerHTML = 'v';
}

dropdownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownContent.classList.toggle('visible');
    dropdownIcon.innerHTML = dropdownIcon.innerHTML == 'v' ? 'ʌ' : 'v';
})

document.addEventListener('click', () => {
    dropdownContent.classList.remove('visible');
    dropdownIcon.innerHTML = 'v';
})

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!hiddenInput.value) {
        alert("Select an Item first!");
        return;
    }

    alert(`Option: ${hiddenInput.value}`)
})