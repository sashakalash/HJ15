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

messagesContent.setAttribute('style', 'overflow-y:scroll');
messagesContent.appendChild(messageStatus.cloneNode(true));	

const connectionChat = new WebSocket('wss://neto-api.herokuapp.com/chat');
connectionChat.addEventListener('open', () => {
	messagesContent.querySelector('.message-status').setAttribute('style', 'display:none');	
	chatStatus.textContent = chatStatus.dataset.online;
	sendMessBtn.disabled = false;
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
	console.log(error);
});

newMessageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const date = new Date();
	connectionChat.send(inputMessForm.value);
	messageUser.querySelector('.message-text').textContent = inputMessForm.value;
	messageUser.querySelector('.timestamp').textContent = date.getHours() + ':' + date.getMinutes();
	messagesContent.appendChild(messageUser.cloneNode(true));
	inputMessForm.value = '';
});

connectionChat.addEventListener('close', () => {
	chatStatus.textContent = chatStatus.dataset.offline;
	sendMessBtn.disabled = true;
	messagesContent.querySelector('.message-status').removeAttribute('style');
});

window.addEventListener('beforeunload', () => {
	connectionChat.close(1000);
});