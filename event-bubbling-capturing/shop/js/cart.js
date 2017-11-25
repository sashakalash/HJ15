'use strict';
const itemsList = document.querySelector('.items-list');
itemsList.addEventListener('click', clickToBtn);

function clickToBtn(event) {
	if (event.target.classList.contains('add-to-cart')) {
		event.preventDefault();
		const item = {
			title: event.target.dataset.title, 
			price: event.target.dataset.price
		};
		addToCart(item);
	}
} 