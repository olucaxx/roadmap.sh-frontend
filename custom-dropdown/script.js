const dropdownButton = document.querySelector('.dropdown-button');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownIcon = dropdownButton.querySelector('.dropdown-icon');
document.querySelectorAll('.dropdown-option').forEach(item => item.addEventListener('click', selectOption))

function selectOption() {
    document.querySelectorAll('.dropdown-option').forEach(item => {
        item.querySelector('.dropdown-icon').innerHTML = ""
    })

    this.querySelector('.dropdown-icon').innerHTML = "✓"
    dropdownButton.querySelector('.dropdown-text').innerHTML = this.querySelector('.dropdown-text').innerHTML
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