'use strict';

const socket = document.querySelectorAll('.websocket div');

const wss = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket'); 

wss.addEventListener('message', (event) => {
	for (const number of socket) {        
		if (number.classList.contains('flip-it')) {
			number.classList.remove('flip-it');
		}
	}
	const numberDiv = Array.from(socket).find(number => {
		return number.textContent === event.data;
	});
	numberDiv.classList.add('flip-it');
});


	
	
