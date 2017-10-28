'use strict';
const sliderImg = document.getElementById('slider');
const imgArr = [
'airmax-jump.png', 
'airmax-on-foot.png',
'airmax-playground.png',
'airmax-top-view.png',
'airmax.png'
];
var step = 1;
const len = imgArr.length;
function showImages() {
	sliderImg.src = 'i/' + imgArr[step];
	console.log(sliderImg.src);
	step++;
	if (step === len) {
    	step = 0;
    }
}
setInterval(showImages, 5000);
console.log(sliderImg.src);
