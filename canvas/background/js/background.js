'use strict';
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const PI = Math.PI;

const starsSum = Math.round(getRand(50, 200));

function getRand(min, max) {
	return Math.random() * (max - min) + min;
}

var firstTime = true;

function nextPoint(x, y, time) {
	console.log(x);
	return {
	  x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
	  y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
	};
  }

var getStar = function() {
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let isCircle = true;
	

	for (let i = 0; i <= starsSum; i++) {
		if (firstTime) {
			var x = Math.round(getRand(0, canvas.width));
			var y = Math.round(getRand(0, canvas.height)); 	
			
			// var curX = x;
			// var curY = y;
			
			console.log(x, y, 'in if')
		}
			
					
		const size = getRand(0.1, 0.6);
		const angle = getRand(0, 360);
	 
		ctx.beginPath();
		if (isCircle) {
			ctx.arc(x, y, 12 * size / 2, 0, 2 * PI);
			isCircle = false;
		} else {
			ctx.moveTo(x, y);
			ctx.lineTo(x + 20 * size, y);
			ctx.moveTo(x + 10 * size, y - 10 * size);
			ctx.lineTo(x + 10 * size, y + 10 * size);
			ctx.rotate(PI / angle);
			isCircle = true;	
		}
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5 * size;
		ctx.stroke();
		ctx.closePath();   
	}
	firstTime  = false;
	console.log(x, 'after for');

	x = nextPoint(x, y, Date.now()).x;
	y = nextPoint(x, y, Date.now()).y;  

	console.log(x, typeof x, y, 'new x & y')
	
	// requestAnimationFrame(getStar);
	
};

getStar();

getStar();



// При этом вычислять текущее положение каждого объекта необходимо от его изначального положения. 
// А не от измененного в предыдущий тик. Так как формула расчета положения задаёт колебания вокруг 
// базовой точки, координаты которой будут первично сгенерированы при создании объекта.

// Фон должен перерисовываться со скоростью 20 кадров в секунду.

// Для анимации необходимо создать случайное количество объектов в диапазоне о
// т 50 до 200. При этом количество крестиков и кругов должно быть равным.

// Параметры объектов
// У всех объектов должен быть определен относительный размер size, случайное число 
// от 0.1 до 0.6 единиц, который влияет на другие параметры объекта. Все объекты имеют белую обводку. 
// Толщина обводки равна 5 * size.

// Круг
// Радиус круга равен 12 * size. Круг закрашивать не нужно.

// Крестик
// Сторона крестика равна 20 * size. Также у крестика необходимо определить 
// угол поворота от 0 до 360 градусов. Крестик должен медленно поворачиваться 
// со случайной скоростью в диапазоне -0.2 до 0.2 на тик (один этап перерисовки).