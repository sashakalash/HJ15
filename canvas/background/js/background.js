'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const PI = Math.PI;
const circleArr = [];
const crossArr = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const starsSum = Math.round(getRand(50, 200));

function getRand(min, max) {
	return Math.random() * (max - min) + min;
}

function nextPointOne(x, y, time) {
	return {
		x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
		y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
	};
}

function nextPointTwo(x, y, time) {
	return {
		x: x + Math.sin((x + (time / 10)) / 100) * 5,
		y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
	};
}

const timeFuncArr = [nextPointOne, nextPointTwo];

class getObj {
	constructor (xPos = Math.round(getRand(0, canvas.width)), 
		yPos = Math.round(getRand(0, canvas.height)),
		size = getRand(0.1, 0.6),
		angle = getRand(0, 360),
		speed = getRand(-0.2, 0.2),
		timeFunc = timeFuncArr[Math.round(getRand(0, 1))]) {
		this.x = xPos;
		this.y = yPos;
		this.size = size;
		this.angle = Math.round(angle * PI / 180);
		this.rotateSpeed = speed;
		this.timeFunc = timeFunc;
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
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle * this.rotateSpeed);
		ctx.stroke();
		ctx.translate(-this.x, -this.y);		
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
		const newCoord = item.timeFunc(item.x, item.y, Date.now());
		const x = newCoord.x;
		const y = newCoord.y;
		const size = item.size;
		const angle = item.angle;
		const newItem = new getObj(x, y, size, angle);
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

