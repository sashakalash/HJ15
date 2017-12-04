'use strict';

const wrapper = document.querySelector('.wrapper');
const urls = ['https://neto-api.herokuapp.com/food/42',
	'https://neto-api.herokuapp.com/food/42/rating',
	'https://neto-api.herokuapp.com/food/42/consumers'
];
function getElement(datasetName) {
	return Array.from(wrapper.querySelectorAll('*')).find(el => {
		if (el.hasAttribute(datasetName)) {
			return el;
		}
	});
}

const pic = getElement('data-pic');
const title = getElement('data-title');
const ingredients = getElement('data-ingredients');
const rating = getElement('data-rating');
const star = getElement('data-star');
const votes = getElement('data-votes');
const consumers = getElement('data-consumers');


function loadData(url) {
	const functionName = 'cb' + Math.ceil(Math.random() * 100000);
	return new Promise((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		script.id = 'loadDataScript';
		document.body.appendChild(script);
	}); 
}

Promise.all(urls.map(loadData))
	.then(res => {
		title.textContent = res[0].title;
		ingredients.textContent = res[0].ingredients.join(', ');
		pic.style.backgroundImage = `url("${res[0].pic}")`;
		rating.textContent = (res[1].rating * 100) / 100;
		star.style.width = `${(res[1].rating * 10) * 100 / 100}%`;
		votes.textContent = `(${res[1].votes} оценок)`;
		res[2].consumers.forEach(el => {
			let consumer = document.createElement('img');
			consumer .src = el.pic;
			consumer.title = el.name;
			consumers.appendChild(consumer);
		});
		const total = document.createElement('span');
		total.textContent = `(+${res[2].total})`;
		consumers.appendChild(total);
	})
	.then(() => {
		const allScriptToRemove = document.querySelectorAll('#loadDataScript');
		for (const script of allScriptToRemove) {
			script.parentElement.removeChild(script);
		}
	});