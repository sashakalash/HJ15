'use strict';
const chat = document.querySelector('.chat');
const newMessageForm = chat.querySelector('.message-box');
const inputMessForm = chat.querySelector('.message-input');
const sendMessBtn = chat.querySelector('.message-submit');
const messagesContent = chat.querySelector('.messages-content');
const chatStatus = chat.querySelector('.chat-status');

const messagesTemplates = chat.querySelector('.messages-templates');
const messageLoading = messagesTemplates.querySelector('div.message loading');
const messageUser= messagesTemplates.querySelector('.message-personal');
const messageStatus = messagesTemplates.querySelector('.message-status');

const connectionChat = new WebSocket('wss://neto-api.herokuapp.com/chat');
connectionChat.addEventListener('open', () => {
	chatStatus.textContent = chatStatus.dataset.online;
	sendMessBtn.disabled = false;
	messagesContent.textContent = 'Пользователь появился в сети';
});

const messageAnotherUser = Array.from(document.querySelectorAll('.message'))
	.find(el => {
		if (!(el.classList.contains('loading') || 
            el.classList.contains('message-personal') || 
            el.classList.contains('message-status'))) {
			return el.cloneNode(true);
		}
	});

connectionChat.addEventListener('message', (event) => {
	if (event.data === '...') {
		messagesContent.appendChild(messageLoading).cloneNode(true);
    }
    const date = new Date();
	messageAnotherUser.querySelector('.message-text').textContent = event.data;
	messageAnotherUser.querySelector('.timestamp').textContent = date.getHours() + ':' + date.getMinutes();
	messagesContent.appendChild(messageAnotherUser.cloneNode(true));
});

connectionChat.addEventListener('error', (error) => {
	messagesContent.textContent = error.data;
});

newMessageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	connectionChat.send(inputMessForm.value);
	messageUser.querySelector('.message-text').textContent = event.data;
    messageUser.querySelector('.timestamp').textContent = event.timeStamp;
    console.log(messageUser)
	messagesContent.appendChild(messageUser.cloneNode(true));
	inputMessForm.value = '';
});

connectionChat.addEventListener('close', () => {
	chatStatus.textContent = chatStatus.dataset.offline;
	sendMessBtn.disabled = true;
	messagesContent.textContent = 'Пользователь не в сети';
});

window.addEventListener('beforeunload', () => {
	connectionChat.close(1000);
});