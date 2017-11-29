'use strict';
const connectionsCount = document.querySelector('.counter');
const errorsCounter = document.querySelector('output.errors');
const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', (event) => {
	const data = JSON.parse(event.data);
	connectionsCount.textContent = data.connections;
	errorsCounter.textContent = data.errors;
});

window.addEventListener('beforeunload', () => {
	connection.close(1000);
});

