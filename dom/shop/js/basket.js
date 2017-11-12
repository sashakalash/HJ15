const cartCount = document.querySelector('span#cart-count');
const cartTotalPrice = document.querySelector('span#cart-total-price');

function addToBasket() {
	cartCount.innerHTML++;
	cartTotalPrice.innerHTML = +cartTotalPrice.innerHTML + (+this.dataset.price);  
}

const allBtns = document.querySelectorAll('div#container button');
for(const btn of allBtns) {
	btn.addEventListener('click', addToBasket);
}
