'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const PI = Math.PI;
const circleArr = [];
const crossArr = [];

const starsSum = Math.round(getRand(50, 200));

function getRand(min, max) {
	return Math.random() * (max - min) + min;
}

function nextPoint(x, y, time) {
	return {
		x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
		y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
	};
}

class getObj {
	constructor (xPos = Math.round(getRand(0, canvas.width)), 
		yPos = Math.round(getRand(0, canvas.height)),
		size = getRand(0.1, 0.6),
		angle = getRand(0, 360)) {
		this.x = xPos;
		this.y = yPos;
		this.size = size;
		this.angle = angle;
	} 
	
	getCircle() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 12 * this.size / 2, 0, 2 * PI);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5 * this.size;
		ctx.stroke();
		return this;
	}
	
	getСross() {
		ctx.beginPath();			
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + 20 * this.size, this.y);
		ctx.moveTo(this.x + 10 * this.size, this.y - 10 * this.size);
		ctx.lineTo(this.x + 10 * this.size, this.y + 10 * this.size);
		ctx.rotate(PI / this.angle);
		ctx.stroke();
		return this;
	}
	
}

function getStaticBackground() {
	let isCircle = true;
	for (let i = 0; i <= starsSum; i++) {
		if (isCircle) {
			const circle = new getObj;
			circleArr.push(circle.getCircle());
			isCircle = false;
		} else {
			const cross = new getObj;
			crossArr.push(cross.getСross());
			isCircle = true;
		}
	}	
}

getStaticBackground();


function getNewBackground(array, isCircle) {
	for (let i = 0; i < array.length; i++) {
		const item = array[i];
		const newCoord = nextPoint(item.x, item.y, Date.now());
		const x = newCoord.x;
		const y = newCoord.y;
		const size = item.size;
		const angle = item.angle;
		const newItem = new getObj(x, y, size, angle);
		// console.log(newItem)
		if (isCircle) {
			newItem.getCircle();
		} else {
			newItem.getСross();
		}
		array.splice(i, 1, newItem);
	}
}

setInterval(() => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);	
	getNewBackground(circleArr, true);
	getNewBackground(crossArr);
}, 50);






// При этом вычислять текущее положение каждого объекта необходимо от его изначального положения. 
// А не от измененного в предыдущий тик. Так как формула расчета положения задаёт колебания вокруг 
// базовой точки, координаты которой будут первично сгенерированы при создании объекта.

// Фон должен перерисовываться со скоростью 20 кадров в секунду.
//  Также у крестика необходимо определить 
// угол поворота от 0 до 360 градусов. Крестик должен медленно поворачиваться 
// со случайной скоростью в диапазоне -0.2 до 0.2 на тик (один этап перерисовки).