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
    console.log(colorAvailbleList.responseText);
    
}

function setSizeAvailble() {
    console.log(sizeAvailbleList.responseText);
    
}
function setCartCondition() {
    console.log(cartCondition.responseText);
    
}