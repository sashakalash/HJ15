'use strict';

const pooling = document.querySelectorAll('.pooling div');


function getNumber() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
	xhr.addEventListener('load', () => {
		for (const number of pooling) {        
			if (number.classList.contains('flip-it')) {
				number.classList.remove('flip-it');
			}
		}
		const numberDiv = Array.from(pooling).find(number => {
			return number.textContent === xhr.responseText;
		});
		numberDiv.classList.add('flip-it');
	});
	xhr.send();
}

setInterval(getNumber, 5000);
