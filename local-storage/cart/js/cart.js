'use strict';
const colorAvailbleList = new XMLHttpRequest();
colorAvailbleList.addEventListener('load', setColorAvailble);
colorAvailbleList.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
colorAvailbleList.send();

const sizeAvailbleList = new XMLHttpRequest();
sizeAvailbleList.addEventListener('load', setSizeAvailble);
sizeAvailbleList.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
sizeAvailbleList.send();

const cartCondition = new XMLHttpRequest();
cartCondition.addEventListener('load', setCartCondition);
cartCondition.open('GET', 'https://neto-api.herokuapp.com/cart');
cartCondition.send();

const colorSwatch = document.querySelector('#colorSwatch');
const sizeSwatch = document.querySelector('#sizeSwatch');
const quickCart = document.querySelector('#quick-cart');

function setColorAvailble() {
	let x = '';
	JSON.parse(colorAvailbleList.responseText).map((el) => {
		x += `<div data-value="${el.type}" class="swatch-element color ${el.type}`;
		if (el.isAvailable) {
			x += ' available">';
		} else {
			x += ' soldout">';
		}
		x += `<div class="tooltip">${el.title}</div><input quickbeam="color" id="swatch-1-${el.type}"
            type="radio" name="color" value="${el.type}"`;
		if (el.type == localStorage.choisedColor || el.type == 'blue') {
			x += ' checked';
		} 
		if (!el.isAvailable) {
			x += ' disabled';
		} 
		x += `><label for="swatch-1-${el.type}" style="border-color: ${el.type};"><span style="background-color: ${el.code}
            ;"></span><img class="crossed-out"src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
            </label></div>`;
	});
	colorSwatch.innerHTML = x;
}

function setSizeAvailble() {
	let x = '';
	JSON.parse(sizeAvailbleList.responseText).map((el) => {
		x += `<div data-value="${el.type}" class="swatch-element plain ${el.type} `;
		if (el.isAvailable) {
			x += 'available">';
		} else {
			x += 'soldout">';
		}
		x += `<input id="swatch-0-${el.type}" type="radio" name="size" value="${el.type}"`;
		if (el.type == localStorage.choisedSize || el.type == 'm') {
			x += ' checked';
		} 
		if (!el.isAvailable) {
			x += ' disabled';
		}
		x += `><label for="swatch-0-${el.type}">${el.title} <img class="crossed-out"
            src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886"></label></div>`;
	});
	sizeSwatch.innerHTML = x;
}

function setCartCondition(event) {
	let x = '';
	JSON.parse(event.target.responseText).map((el) => {
		x += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${el.id}" style="opacity: 1;">
                    <div class="quick-cart-product-wrap">
                        <img src="${el.pic}" title="${el.title}">
                        <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
                        <span class="s2"></span>
                    </div>
                    <span class="count hide fadeUp" id="quick-cart-product-count-${el.id}">${el.quantity}</span>
                    <span class="quick-cart-product-remove remove" data-id="${el.id}"></span>
             </div>
             <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico`;
		if (el.quantity != '0') {
			x += ' open';
		}
		x += `"><span><strong class="quick-cart-text">Оформить заказ<br></strong>
				<span id="quick-cart-price">$${getTotalSum()}.00</span></span></a>`;
		function getTotalSum() {
			return el.price * el.quantity;
		}
	});
	quickCart.innerHTML = x;
}    

colorSwatch.addEventListener('change', (event) => {
	if (event.target.type == 'radio') {
		localStorage.choisedColor = event.target.value;
	}
});

sizeSwatch.addEventListener('change', (event) => {
	if (event.target.type == 'radio') {
		localStorage.choisedSize = event.target.value;
	}
});

const orderDataForm = document.querySelector('#AddToCartForm');
const orderData = new FormData(orderDataForm);
const addToCartBtn = document.querySelector('#AddToCart');
orderData.append('productId', orderDataForm.dataset.productId);

const removeItemData = new FormData();
removeItemData.append('productId', orderDataForm.dataset.productId);

addToCartBtn.addEventListener('click', orderDataReq);
quickCart.addEventListener('click', orderDataReq);

function orderDataReq(event) {
	event.preventDefault();	
	const xhr = new XMLHttpRequest();
	xhr.addEventListener('load', updateCart);
	if (event.target.classList.contains('remove')) {
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
		xhr.send(removeItemData);
	} else if (event.currentTarget.id == 'AddToCart') {
		xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
		xhr.send(orderData);
	}
}

function updateCart(event) {
	if (event.currentTarget.error) {
		new Error(event.currentTarget.message);
	}
	setCartCondition(event);	
}
