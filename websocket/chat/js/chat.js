'use strict';
const chat = document.querySelector('.chat');
const newMessageForm = chat.querySelector('.message-box');
const inputMessForm = chat.querySelector('.message-input');
const sendMessBtn = chat.querySelector('.message-submit');
const messagesContent = chat.querySelector('.messages-content');
const chatStatus = chat.querySelector('.chat-status');
const messagesTemplates = chat.querySelector('.messages-templates');
const messageLoading = messagesTemplates.querySelector('.message.loading');
const messageWithClass = messagesTemplates.querySelector('.message.message-personal');
const messageWOClass = messagesTemplates.querySelector('.message');
const messageStatus = messagesTemplates.querySelector('.message.message-status');
console.log(messageLoading, messageWithClass, messageWOClass, messageStatus);



const connectionChat = new WebSocket('wss://neto-api.herokuapp.com/chat');
connectionChat.addEventListener('open', () => {
	chatStatus.textContent = chatStatus.dataset.online;
	sendMessBtn.disabled = false;
	messagesContent.textContent = 'Пользователь появился в сети';
});

console.log(messagesContent);
connectionChat.addEventListener('message', (event) => {
	if(event.data === '...') {
        
		messagesContent.innerHTML = messageLoading;
	}
	messageWithClass.querySelector('.message-text').textContent = event.data;
	messageWithClass.querySelector('.timestamp').textContent = event.timeStamp;
	console.log(messageWithClass);

	messagesContent.innerHTML = messageWithClass;
	console.log(messagesContent);
});

connectionChat.addEventListener('error', (error) => {
	messagesContent.textContent = error.data;
});

newMessageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	connectionChat.send(inputMessForm.value);
	messagesContent.textContent += inputMessForm.value;
    
});

connectionChat.addEventListener('close', () => {
	chatStatus.textContent = chatStatus.dataset.offline;
	sendMessBtn.disabled = true;
	messagesContent.textContent = 'Пользователь не в сети';
});