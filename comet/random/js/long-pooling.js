'use strict';

const longPooling = document.querySelectorAll('.long-pooling div');

function getNumber() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
	xhr.addEventListener('load', () => {
		for (const number of longPooling) {        
			if (number.classList.contains('flip-it')) {
				number.classList.remove('flip-it');
			}
		}
		const numberDiv = Array.from(longPooling).find(number => {
			return number.textContent == xhr.responseText.trim();
		});
		numberDiv.classList.add('flip-it');
	});
	xhr.send();
}

setInterval(getNumber, 5000);