

const contentform = document.querySelector('.contentform');
const sendMessageBtn = document.querySelector('.contentform .button-contact');
const changeMessageBtn = document.querySelector('#output .button-contact'); 
const inputFields = document.querySelectorAll('.contentform input');
const outputMessage = document.querySelector('#output');
const outputMessageFields = document.querySelectorAll('#output output');
const messageField = document.querySelector('.form-group textarea');

for(const itemField of inputFields) {
    if(itemField.name === 'zip') {
        itemField.setAttribute('pattern', '[0-9]');
    }
    itemField.addEventListener('change', setValue);
}

messageField.addEventListener('change', setValue);

function setValue() {
    let fieldName = this.name;
    let fieldValue = this.value;
    outputMessageFields.forEach(output => {
        if(output.id === fieldName) {
            output.value = fieldValue;
        }
    });
    validateChecking();  
}

function validateChecking() {
    let fieldsCounter = 0;
    let summOfFields = 11;
    for(const itemField of inputFields) {
        if(itemField.value) {
            fieldsCounter++;
        }
    }
    if(messageField.value) {
        fieldsCounter++;
    }
    console.log(fieldsCounter);
    if(fieldsCounter === summOfFields) {
        sendMessageBtn.removeAttribute('disabled');
        sendMessageBtn.addEventListener('click', () => {
            contentform.classList.add('hidden');
            contentform.removeAttribute('novalidate');
            outputMessage.classList.remove('hidden');
        });
    } else {
        return;
    }  
}

changeMessageBtn.addEventListener('click', () => {
    contentform.setAttribute('novalidate', true);
    contentform.classList.remove('hidden');
    outputMessage.classList.add('hidden');
});