'use strict';
const sliderImg = document.getElementById('currentPhoto');
const next = document.getElementById('nextPhoto');
const prev = document.getElementById('prevPhoto');
const imgArr = [
'breuer-building.jpg', 
'guggenheim-museum.jpg',
'headquarters.jpg',
'IAC.jpg',
'new-museum.jpg'
];
var step = 0;
const len = imgArr.length;
function nextPhoto() {
	step++;
	if(step === len) {
		step = 0;
	}
	sliderImg.src = 'i/' + imgArr[step];
}
function prevPhoto() {
	step--;
	if(step < 0) {
		step = len - 1;
	}
	sliderImg.src = 'i/' + imgArr[step];
}
next.onclick = nextPhoto;
prev.onclick = prevPhoto;