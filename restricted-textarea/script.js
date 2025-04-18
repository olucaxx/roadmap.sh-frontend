const textarea = document.querySelector('textarea');
const counter = document.querySelector('#counter');
const charLimit = 250;

counter.innerHTML = `${textarea.value.length}/${charLimit}`; // atualiza nosso contador para um valor inicial

textarea.addEventListener('keydown', (e) => { // foca em bloquear a entrada do user caso exceda o limite
    if (textarea.value.length >= charLimit) {
        const keyPressed = e.key.toLowerCase();
        const ctrlExceptions = e.ctrlKey && ['a', 'c', 'x'].includes(keyPressed);
        const navigationKeys = ['delete', 'backspace', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(keyPressed);
        if (!navigationKeys && !ctrlExceptions) {
            e.preventDefault();
        }
    }
});
    
textarea.addEventListener('input', () => { // foca em atualizar o contador e habilitar/desabilitar a classe 'restricted'
    const charAmount = textarea.value.length;
    counter.innerHTML = `${charAmount}/${charLimit}`;

    counter.classList.toggle('restricted', charAmount >= charLimit);
    textarea.classList.toggle('restricted', charAmount >= charLimit);
});

textarea.addEventListener('paste', (e) => { // caso o user cole com o mouse
    if (textarea.value.length >= charLimit) {
        e.preventDefault();
    }
});
