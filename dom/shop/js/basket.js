const cartCount = document.querySelector('span#cart-count');
const cartTotalPrice = document.querySelector('span#cart-total-price');
cartTotalPrice.dataset.totalSum = +cartTotalPrice.innerHTML;

function addToBasket() {
	cartCount.innerHTML++;
	cartTotalPrice.dataset.totalSum = +cartTotalPrice.dataset.totalSum + (+this.dataset.price);
	cartTotalPrice.innerHTML = getPriceFormatted(cartTotalPrice.dataset.totalSum);
}

const allBtns = document.querySelectorAll('div#container button');
for(const btn of allBtns) {
	btn.addEventListener('click', addToBasket);
}
