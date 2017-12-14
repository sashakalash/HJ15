'use strict';

const selectPlane = document.querySelector('#acSelect');
const seatMapDiv = document.querySelector('#seatMapDiv');

const showSchemeBtn = document.querySelector('#btnSeatMap');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const btnSetFull = document.querySelector('#btnSetFull');
btnSetEmpty.disabled = true;
btnSetFull.disabled = true;
showSchemeBtn.addEventListener('click', showScheeme);

const seatMapTitle = document.querySelector('#seatMapTitle');

function showScheeme(event) {
	seatMapDiv.textContent = '';
	event.preventDefault(); 
	fetch(`https://neto-api.herokuapp.com/plane/${selectPlane.value}`)
		.then(res => res.json())
		.then(getScheme);
}

function getScheme(response) {
	btnSetEmpty.disabled = false;
	btnSetFull.disabled = false;   
	seatMapTitle.textContent = `${response.title} (${response.passengers} пассажиров)`;
	parseScheme(response);
}

function createRowEl(tagName, classObj, seatLetter) {
	const element = document.createElement(tagName);
	if (typeof classObj === 'object') {
		Object.keys(classObj).forEach(i => element.setAttribute(i, classObj[i]));
	}
	if (seatLetter) {
		element.textContent = seatLetter;
	}
	return element;
} 

function createRow(rowNumber) {
	const row = createRowEl('div', {class: 'row seating-row text-center'});
	const numberRowBlock = createRowEl('div', {class: 'col-xs-1 row-number'});
	const titleRow = createRowEl('h2', {class: ''}, rowNumber + 1);    
	const threeSeatsBlock = createRowEl('div', {class: 'col-xs-5'});
	const seat = createRowEl('div', {class: 'col-xs-4'});
	seat.dataset.clickNumber = rowNumber + 1;
	const seatLabel = createRowEl('span', {class: 'seat-label'});
  
	seat.appendChild(seatLabel);
	threeSeatsBlock.appendChild(seat);
	threeSeatsBlock.appendChild(seat.cloneNode(true));
	threeSeatsBlock.appendChild(seat.cloneNode(true));
	numberRowBlock.appendChild(titleRow);
	row.appendChild(numberRowBlock);
	row.appendChild(threeSeatsBlock);
	row.appendChild(threeSeatsBlock.cloneNode(true));  
	row.dataset.rowNumber = rowNumber + 1;    
	return row;
}

function parseScheme(scheme) {
	const totalScheme = [];
	for (let i = 0; i < scheme.scheme.length; i++) {
		totalScheme.push(createRow(i));
	}
	const toAddToScheme = totalScheme.reduce((fragment, currentValue) => {
		fragment.appendChild(currentValue);
		return fragment;
	}, document.createDocumentFragment());
    
	seatMapDiv.appendChild(toAddToScheme);
    
	const rowsAll = seatMapDiv.querySelectorAll('[data-row-number]');
	scheme.scheme.forEach((el, index) => {
		switch (el) {
		case 6:
			scheme.letters6.forEach((letter, numberSeat) => {
				rowsAll[index].querySelectorAll('div.col-xs-4').forEach(el => el.classList.add('seat'));
				rowsAll[index].querySelectorAll('span.seat-label')[numberSeat].textContent = letter;
			});
			break;
		case 4:
			rowsAll[index].querySelectorAll('div.col-xs-5').forEach((div, indexDiv) => {
				if (indexDiv === 0) {
					div.querySelectorAll('div.col-xs-4').forEach((seat, indexSeat) => {
						if (indexSeat === 0) {
							seat.classList.add('no-seat');
						} else {
							seat.classList.add('seat');
							seat.querySelector('span.seat-label').textContent = scheme.letters4[indexSeat - 1];
						}
					});
				} else {
					div.querySelectorAll('div.col-xs-4').forEach((seat, indexSeat) => {
						if (indexSeat === 2) {
							seat.classList.add('no-seat');
						} else {
							seat.classList.add('seat');
							seat.querySelector('span.seat-label').textContent = scheme.letters4[indexSeat + 2];
						}
					});
				}
			});
			break;
		case 0:
		    rowsAll[index].querySelectorAll('div.col-xs-5').forEach(div => {
				div.querySelectorAll('div').forEach(seat => {
					seat.classList.add('no-seat');
				});
			});
			break;
		}
	});
}
  
const totalPax = document.querySelector('#totalPax');
totalPax.textContent = 0;
const totalAdult = document.querySelector('#totalAdult');
totalAdult.textContent = 0;
const totalHalf = document.querySelector('#totalHalf');
totalHalf.textContent = 0;

seatMapDiv.addEventListener('click', bookSeat);

function bookSeat(event) {
	if (event.target.classList.contains('no-seat')) {
		return;
	}
	if (event.target.dataset.clickNumber) {
		if (event.target.classList.contains('half') || event.target.classList.contains('adult')) {
			if (event.target.classList.contains('half')) {
				event.target.classList.remove('half');
				totalPax.textContent--;
				totalHalf.textContent--;
			} else {
				event.target.classList.remove('adult');
				totalPax.textContent--;
				totalAdult.textContent--;
			}
		} else {
			if (event.altKey) {
				event.target.classList.add('half');
				totalPax.textContent++;	
				totalHalf.textContent++;
			} else {
				event.target.classList.add('adult');    
				totalPax.textContent++;	
				totalAdult.textContent++;        
			}
		}
	}  
}

btnSetFull.addEventListener('click', bookAll);
btnSetEmpty.addEventListener('click', clearAllBook);

function bookAll(e) {
	e.preventDefault();
	seatMapDiv.querySelectorAll('[data-click-number]').forEach(e => {
		if (!e.classList.contains('no-seat')) {
			e.classList.add('adult');
			totalPax.textContent++;	
			totalAdult.textContent++; 
		}
	});
}

function clearAllBook(e) {
	e.preventDefault();
	seatMapDiv.querySelectorAll('[data-click-number]').forEach(e => {
		if (e.classList.contains('half')) {
			e.classList.remove('half');
		} else {
			e.classList.remove('adult');
		}
		totalPax.textContent = 0;
		totalHalf.textContent = 0;        
		totalAdult.textContent = 0;
	});
}
