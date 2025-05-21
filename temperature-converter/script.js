const dropdowns = document.querySelectorAll('.dropdown-div')
const form = document.getElementById('temp-form')

dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const dropdownBtn = dropdown.querySelector('.dropdown-button');
    const dropdownIcon = dropdown.querySelector('.dropdown-icon');
    const dropdownText = dropdown.querySelector('.dropdown-text');
    const dropdownOptions = dropdown.querySelectorAll('.dropdown-option')
    const input = dropdown.querySelector('input')

    dropdownOptions.forEach((option, index) => {
        if (!option.getAttribute('data-value')) {
            option.setAttribute('data-value', index);
        }

        option.addEventListener('click', (event) => {
            selectOption(event, dropdownOptions, event.currentTarget, dropdownText, input, dropdownContent, dropdownIcon);
        });
    })
    
    dropdownBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownContent.classList.toggle('visible');
        dropdownIcon.innerHTML = dropdownIcon.innerHTML == 'v' ? 'ʌ' : 'v';
    })
})

function selectOption(event, options, clickedOpt, dropdownText, input, dropdownContent, dropdownIcon) {
    event.stopPropagation();

    options.forEach(option => option.querySelector('.option-icon').innerHTML = "");

    clickedOpt.querySelector('.option-icon').innerHTML = "✓";

    dropdownText.innerHTML = clickedOpt.querySelector('.option-text').innerHTML;

    input.value = clickedOpt.getAttribute('data-value');
    dropdownContent.classList.remove('visible');
    dropdownIcon.innerHTML = "v";
}

document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown-content').classList.remove('visible');
        dropdown.querySelector('.dropdown-icon').innerHTML = 'v';
    })
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(parseInt(form.temp.value))
    console.log(form.from.value)
    console.log(form.to.value)
})
