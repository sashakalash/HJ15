const piano = document.getElementsByClassName('set middle')[0];
const buttons = piano.getElementsByTagName('li');
const melodys = [
'first.mp3',
'second.mp3',
'third.mp3',
'fourth.mp3',
'fifth.mp3'
];
var playerMelodyCounter = 0;
var src;


function setMelody() {
	const player = this.getElementsByTagName('audio')[0];
	src = melodys[playerMelodyCounter];
	// console.log(player.src)
	playerMelodyCounter++;
}

function selectionTone(event) {
	if(event.altKey) {
		piano.classList.remove('middle');
		piano.classList.add('higher');
	} else if(event.shiftKey) {
		piano.classList.remove('middle');
		piano.classList.add('lower');
	} 
}

function resetTone(event) {
	if(piano.classList.contains('higher')) {
		piano.classList.remove('higher');
	} else if(piano.classList.contains('lower')) {
		piano.classList.remove('lower');
	}
	piano.classList.add('middle');
}

function playMelody() {
	const player = this.getElementsByTagName('audio')[0];
	if(piano.classList.contains('lower')) {
		player.src = 'sounds/lower/' + src;
	} else if(piano.classList.contains('higher')) {
		player.src = 'sounds/higher/' + src;
	} 
	player.src = 'sounds/middle/' + src;

	player.play();

}

for(const btn of buttons) {
	btn.addEventListener('click', setMelody);
	document.addEventListener('keydown', selectionTone);
	document.addEventListener('keyup', resetTone);
	btn.addEventListener('click', playMelody);

}

