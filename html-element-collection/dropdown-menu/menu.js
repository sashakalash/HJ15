'use strict';
const menuBtn = document.getElementsByClassName('wrapper-dropdown')[0];
function menuClick() {
	if(!menuBtn.classList.contains('active')) {
		menuBtn.classList.add('active');
	} else {
		menuBtn.classList.remove('active');
	}
}
menuBtn.onclick = menuClick;

