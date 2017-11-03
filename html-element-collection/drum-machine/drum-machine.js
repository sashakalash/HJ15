var playBtns = document.getElementsByTagName('li');
function btnClick() {
	this.getElementsByTagName('audio')[0].play();
}
for(var i = 0; i < playBtns.length; i++) {
	playBtns[i].onclick = btnClick;
}
	


