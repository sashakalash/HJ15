var playBtns = document.getElementsByTagName('li');
function btnClick() {
	this.getElementsByTagName('audio')[0].play();
}
for(const btn of playBtns) {
	btn.onclick = btnClick;
}
	


