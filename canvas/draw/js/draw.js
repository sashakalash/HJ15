'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves = [];
	needsRepaint = true;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});
   
let brushRadius = 100;
let hue = 1;
let curves = [];
let drawing = false;
let isShift = false;
let needsRepaint = false;
let referenceDirection = true;

function circle(point) {
	ctx.beginPath();
	ctx.arc(point[0], point[1], point[2] / 2, 0, 2 * Math.PI);
	ctx.fillStyle = `hsl(${point[3]}, 100%, 50%)`;
	ctx.fill();
}

function smoothCurveBetween (p1, p2) {	
	const cp = p1.map((coord, idx) => {
		for (let i = 0; i < 2; i++) {
			return (coord + p2[idx]) / 2;
		}
	});
	ctx.strokeStyle = `hsl(${p1[3]}, 100%, 50%)`;
	ctx.quadraticCurveTo(p1[0], p1[1], cp[0], cp[1]);
}

function smoothCurve(points) {
	let currentPoint = points[0];
	ctx.beginPath();
	ctx.lineWidth = currentPoint[2];
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	ctx.moveTo(currentPoint[0], currentPoint[1]);
	for(let i = 1; i < points.length - 1; i++) {
		smoothCurveBetween(points[i], points[i + 1]);
	}
	ctx.stroke();
}

function changeColorAndHue() {
	if (brushRadius == 5 || brushRadius == 100) {
		referenceDirection = !referenceDirection;
	}
	referenceDirection? brushRadius++: brushRadius--;  

	if (hue > -1 && hue < 360) {
		isShift? hue--: hue++;
	} else {
		hue == -1? hue = 0: hue = 359;
	}
}
canvas.addEventListener('dblclick', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	curves = [];
	needsRepaint = true;
});

canvas.addEventListener('mousedown', (evt) => {	
	drawing = true;
	isShift = evt.shiftKey; 
	const curve = []; 
	curve.push([evt.offsetX, evt.offsetY, brushRadius, hue]);
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
		const point = [evt.offsetX, evt.offsetY, brushRadius, hue];
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