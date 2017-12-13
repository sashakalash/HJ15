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
	const seatLabel = createRowEl('span', {class: 'seat-label'});
	seat.appendChild(seatLabel);
	threeSeatsBlock.appendChild(seat);
	threeSeatsBlock.appendChild(seat.cloneNode(true));
	threeSeatsBlock.appendChild(seat.cloneNode(true));
	numberRowBlock.appendChild(titleRow);
	row.appendChild(numberRowBlock);
	row.appendChild(threeSeatsBlock);
	row.appendChild(threeSeatsBlock.cloneNode(true));  
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
}
  
    
