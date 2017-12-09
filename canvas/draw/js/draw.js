'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves = [];
	undone = [];
	needsRepaint = true;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});
   
let brushRadius = 100;
let hue = 1;
let curves = [];
let undone = [];
let drawing = false;
let isShift = false;
let needsRepaint = false;
let referenceDirection = true;

function circle(point) {
	ctx.beginPath();
	ctx.arc(...point, brushRadius / 2, 0, 2 * Math.PI);
	ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.fill();
}

function smoothCurveBetween (p1, p2) {	
	const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
	console.log(hue)
	ctx.beginPath();
	ctx.lineWidth = brushRadius;
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.moveTo(...points[0]);
	for(let i = 1; i < points.length - 1; i++) {
		smoothCurveBetween(points[i], points[i + 1]);
	}
	ctx.stroke();	
}

function makePoint(x, y, reflect = false) {
	return  reflect ? [y, x] : [x, y];
}

function changeColorAndHue() {
	if (brushRadius == 5 || brushRadius == 100) {
		referenceDirection = !referenceDirection;
	}
	referenceDirection? brushRadius++: brushRadius--;  

	if (hue >= 0 && hue <= 359) {
		isShift? hue--: hue++;
	} else {
		hue < 0? hue = 0: hue = 359;
	}
}
canvas.addEventListener('dblclick', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves = [];
	undone = [];
	needsRepaint = true;
});

canvas.addEventListener('mousedown', (evt) => {	
	drawing = true;
	isShift = evt.shiftKey; 
	const curve = []; 
	curve.push([evt.offsetX, evt.offsetY]);
	curves.push(curve); 
	needsRepaint = true;
});

canvas.addEventListener('mouseup', () => {
	drawing = false;	
});

canvas.addEventListener('mouseleave', () => {
	drawing = false;
});

canvas.addEventListener('mousemove', (evt) => {
	if (drawing) {
		const point = [evt.offsetX, evt.offsetY];
		curves[curves.length - 1].push(point);
		needsRepaint = true;
	}
});

function repaint () {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves
		.forEach((curve) => {
			circle(curve[0]);
			smoothCurve(curve);
		});
}

function tick () {
	if(needsRepaint) {
		repaint();
		needsRepaint = false;
		changeColorAndHue();	
		
	}	
	window.requestAnimationFrame(tick);	
}

tick();