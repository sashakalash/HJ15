'use strict';
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let imgPointsArr = [];
let isDraw = false;
let hue = 0;
let isShift = false;
let lineRadius = 5;
let direction = true;

window.addEventListener('resize', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener('dblclick', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);    
});

canvas.addEventListener('mouseleave',() => {
	isDraw = false;
	imgPointsArr = [];    
});

canvas.addEventListener('mousedown', (evt) => {
	isDraw = true;
	if (evt.shiftKey) {
		isShift = true;
	}
});

canvas.addEventListener('mousemove', (evt) => {
	if (!isDraw) {
		return;
	}
	imgPointsArr.push({x: evt.pageX, y: evt.pageY});
	drawImg(imgPointsArr);
});

function drawLineBetweenPoints(begin, end) {
	ctx.quadraticCurveTo(begin.x, begin.y, end.x, end.y);
}

function drawImg(imgPointsArr) {
	ctx.beginPath();
	if (isShift) {
		hue === 0? hue = 0: hue--;
	} else {
		hue === 359? hue = 359: hue++;
	}
	if (direction && lineRadius < 100) {
		lineRadius++;
	} else {
		direction = false;
		lineRadius > 0? lineRadius--: direction = true;
	}
	ctx.lineWidth = lineRadius;
    
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.moveTo(imgPointsArr[0].x, imgPointsArr[0].y);
	for (let i = 1; i < imgPointsArr.length - 1; i++) {
		drawLineBetweenPoints(imgPointsArr[i], imgPointsArr[i + 1]);
	}
	ctx.stroke();
}

canvas.addEventListener('mouseup', () => {
	isDraw = false;
	imgPointsArr = [];
	isShift = false;
});
