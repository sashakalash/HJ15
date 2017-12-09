'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight; 
});
   
let brushRadius = 100;
let hue = 0;
let curves = [];
let undone = [];
let drawing = false;
let weird = false;
let needsRepaint = false;
let referenceDirection = true;

function circle(point) {
	ctx.beginPath();
	ctx.arc(...point, brushRadius / 2, 0, 2 * Math.PI);
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	ctx.fill();
}

function smoothCurveBetween (p1, p2) {
	const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
	ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;  
	ctx.quadraticCurveTo(...p1, ...cp);
	if (hue != 0 || hue != 359) {
		weird? hue--: hue++;
	}
}

function smoothCurve(points) {
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
	if (hue != 0 || hue != 359) {
		weird? hue--: hue++;
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
	weird = evt.shiftKey; 
	const curve = []; 
	curve.push(makePoint(evt.offsetX, evt.offsetY, weird));
	curves.push(curve); 
	needsRepaint = true;
});

canvas.addEventListener('mouseup', () => {
	drawing = false;
	changeColorAndHue();
});

canvas.addEventListener('mouseleave', () => {
	drawing = false;
});

canvas.addEventListener('mousemove', (evt) => {
	if (drawing) {
		const point = makePoint(evt.offsetX, evt.offsetY, weird);
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
	}
	window.requestAnimationFrame(tick);
}

tick();



// Характеристики линии
// Цвет линии задается с помощью цветовой модели HSL. Насыщенность 100%, светлота 50%.

// Оттенок меняется при каждом тике на единицу в диапазоне от 0 до 359 включительно.
//  При этом если нажата клавиша Shift, то он уменьшается, иначе увеличивается. 
//  Если оттенок достиг максимума или минимума, то значение устанавливается в минимум или максимум соответственно.

// Толщина линии меняется при каждом тике на единицу в диапазоне от 5 до 100 включительно. 
// Начинать нужно со 100. При достижении максимума толщина должна уменьшаться. При достижении минимума увеличиваться.

// Необходимо скруглить края линии задав свойствам контекста lineJoin и lineCap значение round.