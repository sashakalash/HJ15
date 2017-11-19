

const contentform = document.querySelector('.contentform');
const sendMessageBtn = document.querySelector('.contentform .button-contact');
const changeMessageBtn = document.querySelector('#output .button-contact'); 
const inputFields = document.querySelectorAll('.contentform input');
const outputMessage = document.querySelector('#output');
const outputMessageFields = document.querySelectorAll('#output output');
const messageField = document.querySelector('.form-group textarea');

messageField.addEventListener('change', setValue);
messageField.addEventListener('input', validateChecking);

for(const itemField of inputFields) {
    if(itemField.name === 'zip') {
        itemField.addEventListener('keyup', () => {
            itemField.value = itemField.value.replace(/[\D]+/g, '');
        });
    }
    itemField.addEventListener('change', setValue);
    itemField.addEventListener('input', validateChecking);
}



function setValue() {
    let fieldName = this.name;
    let fieldValue = this.value;
    outputMessageFields.forEach(output => {
        if(output.id === fieldName) {
            output.value = fieldValue;
        }
    });
}

function validateChecking() {
    for(const itemField of inputFields) {
       if(!itemField.value) {
            sendMessageBtn.disabled = true;
            return;
       }
    }
    if(!messageField.value) {
        sendMessageBtn.disabled = true;
        return;
    }
    sendMessageBtn.disabled = false;
    sendMessageBtn.addEventListener('click', () => {
        contentform.classList.add('hidden');
        contentform.removeAttribute('novalidate');
        outputMessage.classList.remove('hidden');
    });
}

changeMessageBtn.addEventListener('click', () => {
    contentform.setAttribute('novalidate', true);
    contentform.classList.remove('hidden');
    outputMessage.classList.add('hidden');
});