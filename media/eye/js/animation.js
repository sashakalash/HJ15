'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');
var eyeTop = eye.getBoundingClientRect().top;
var eyeBottom = eye.getBoundingClientRect().bottom;
var eyeLeft = eye.getBoundingClientRect().left;
var eyeRight = eye.getBoundingClientRect().right;
var windowHeight = document.documentElement.clientHeight;
var windowWidth = document.documentElement.clientWidth;
var pupilMoveLimitX = 30, pupilMoveLimitY = 30;

window.addEventListener('resize', getNewCoord);
window.addEventListener('scroll', getNewCoord);
window.addEventListener('mousemove', followMouse);


function getNewCoord() {
	eyeTop = eye.getBoundingClientRect().top;
	eyeBottom = eye.getBoundingClientRect().bottom;
	eyeLeft = eye.getBoundingClientRect().left;
	eyeRight = eye.getBoundingClientRect().right;	
	pupilMoveLimitX *= document.documentElement.clientWidth / windowWidth;
	pupilMoveLimitY *= document.documentElement.clientHeight / windowHeight;	
	windowWidth = document.documentElement.clientWidth;
	windowHeight = document.documentElement.clientHeight;
}

function followMouse(event) {
	const x = event.screenX, y = event.screenY; 
	const eyeWidth = eyeRight - eyeLeft;
	const eyeHeight = eyeBottom - eyeTop;
	const eyeCenter = {x: eyeRight + eyeWidth / 2, y: eyeTop + eyeHeight / 2}; 
	const moveCoeffX = eyeWidth / windowWidth;
	const moveCoeffY = eyeHeight / windowHeight;

	let pupilX =  - (eyeCenter.x - x) * moveCoeffX;
	let pupilY =  - (eyeCenter.y - y) * moveCoeffY;

	const distanceToEyeCenter = Math.sqrt(Math.pow(eyeCenter.x - x, 2) + Math.pow(eyeCenter.y - y, 2));
	const coefficientSizeEye = Math.sqrt(Math.pow(eyeCenter.x, 2) + Math.pow(eyeCenter.y, 2)) / 2;
	let size = 3 - distanceToEyeCenter / coefficientSizeEye;

   	if (size < 1) {
		size = 1;
	} else if (size > 3) {
		size = 3;
	}

	if (pupilX > pupilMoveLimitX) {
		pupilX = pupilMoveLimitX;
	} else if (pupilX < -pupilMoveLimitX) {
		pupilX = -pupilMoveLimitX;
	}
	if (pupilY > pupilMoveLimitY) {
		pupilY = pupilMoveLimitY;
	} else if (pupilY < -pupilMoveLimitY) {
		pupilY = -pupilMoveLimitY;
	}
	pupil.style.setProperty('--pupil-size', size);
	pupil.style.setProperty('--pupil-x', pupilX + 'px');
	pupil.style.setProperty('--pupil-y', pupilY + 'px');
}