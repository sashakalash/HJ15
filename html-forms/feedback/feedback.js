

const contentform = document.querySelector('.contentform');
const sendMessageBtn = document.querySelector('.contentform .button-contact');
const changeMessageBtn = document.querySelector('#output .button-contact'); 
const inputFields = document.querySelectorAll('.contentform input');
const outputMessage = document.querySelector('#output');
const outputMessageFields = document.querySelectorAll('#output output');
const messageField = document.querySelector('.form-group textarea');

for(const itemField of inputFields) {
    if(itemField.name === 'zip') {
        itemField.pattern = '[0-9]';
    }
    itemField.addEventListener('change', setValue);
}

messageField.addEventListener('change', setValue);

function setValue() {
    let fieldName = this.name;
    let fieldValue = this.value;
    outputMessageFields.forEach(output => {
        if(output.name === fieldName) {
            output.value = fieldValue;
        }
    });
    validateChecking();  
}

function validateChecking() {
    let fieldsCounter = 0;
    for(const itemField of inputFields) {
        if(itemField.value) {
            fieldsCounter++;
        }
    }
    if(messageField.value) {
        fieldsCounter++;
    }
    console.log(fieldsCounter);
    if(fieldsCounter === 11) {
        sendMessageBtn.removeAttribute('disabled');
        sendMessageBtn.addEventListener('click', () => {
            contentform.classList.add('hidden');
            outputMessage.classList.remove('hidden');
        });
    } else {
        return;
    }  
}

changeMessageBtn.addEventListener('click', () => {
    contentform.classList.remove('hidden');
    outputMessage.classList.add('hidden');
});