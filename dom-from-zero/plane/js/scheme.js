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
	const seat = createRowEl('div', {class: 'col-xs-4 seat'});
	const noSeat = createRowEl('div', {class: 'col-xs-4 no-seat'});
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
	const totalScheme = scheme.scheme.map(createRow);
	const toAddToScheme = totalScheme.reduce((fragment, currentValue) => {
		fragment.appendChild(currentValue);
		return fragment;
	}, document.createDocumentFragment());
    
	seatMapDiv.appendChild(toAddToScheme);
    
	const rowsAll = seatMapDiv.querySelectorAll(['data-row-number']);
	console.log(rowsAll);
	scheme.scheme.forEach((el, index) => {
		switch (el) {
		case '6':
			rowsAll[index].querySelectorAll('.col-xs-4 seat').forEach((el, index) => {
				el.querySelector('.seat-label').textContent = scheme.letters6[index];
			});
			break;
		case '4':
			rowsAll[index].querySelectorAll('.col-xs-4 seat').forEach((el, index) => {
				if (index === 0 || index === 5) {
					el.classList.remove('col-xs-4 seat');
					el.classList.add('col-xs-4 no-seat');
				}
				el.querySelector('.seat-label').textContent = scheme.letters4[index - 1];
			});
			break;
		case '0':
			rowsAll[index].querySelectorAll('.col-xs-4 seat').forEach(el => {
				el.classList.remove('col-xs-4 seat');
				el.classList.add('col-xs-4 no-seat');
			});
			break;
		}
	});
}
  
    
