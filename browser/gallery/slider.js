'use strict';
const sliderImg = document.getElementById('currentPhoto');
const next = document.getElementById('nextPhoto');
const prev = document.getElementById('prevPhoto');
const imgArr = [
'i/breuer-building.jpg', 
'i/guggenheim-museum.jpg',
'i/headquarters.jpg',
'i/IAC.jpg',
'i/new-museum.jpg'
];
var step = 0;
const len = imgArr.length;
function nextPhoto() {
	step++;
	if(step === len) {
		step = 0;
	}
	sliderImg.src = imgArr[step];
}
function prevPhoto() {
	step--;
	if(step < 0) {
		step = len - 1;
	}
	sliderImg.src = imgArr[step];
}
next.onclick = nextPhoto;
prev.onclick = prevPhoto;