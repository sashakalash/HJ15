'use strict';
const canvas = document.querySelector('canvas');
canvas.style.backgroundColor = 'black';
const ctx = canvas.getContext('2d');
const PI = Math.PI;
const starColors = ['#ffffff', '#ffe9c4', '#d4fbff'];
canvas.addEventListener('click', getStar);

function getRand(min, max) {
	return Math.random() * (max - min) + min;
}

function getStar() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const starsSum = Math.round(getRand(200, 400));
	for (let i = 0; i <= starsSum; i++) {
		const starSize = getRand(0, 1.1);
		const starBrightness = getRand(0.8, 1);     
		const x = Math.round(getRand(0, canvas.width));
		const y = Math.round(getRand(0, canvas.height));        
		ctx.beginPath();
		ctx.fillStyle = starColors[Math.round(getRand(0, 2))];
		ctx.globalAlpha = starBrightness;
		ctx.arc(x, y, starSize / 2, 0, 2 * PI);
		ctx.fill();
		ctx.closePath();        
	}   
}
