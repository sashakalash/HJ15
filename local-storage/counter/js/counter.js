'use strict';
const counter = document.querySelector('#counter');
const btns = document.querySelector('.wrap-btns');

if (!localStorage.counter) {
    localStorage.counter = '0';
}

counter.textContent = localStorage.counter;
btns.addEventListener('click', makeCount);

function makeCount(event) {
    switch (event.target.id) {
        case 'increment':
            +localStorage.counter++;
            break;
        case 'decrement':
            if (localStorage.counter != 0) {
                +localStorage.counter--;
            }
            break;
        case 'reset':
            localStorage.counter = '0';
            break;
    }
    counter.textContent = localStorage.counter;
}