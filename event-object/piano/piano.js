const piano = document.getElementsByClassName('set middle')[0];
const buttons = piano.getElementsByTagName('li');
const melodys = [
'first.mp3',
'second.mp3',
'third.mp3',
'fourth.mp3',
'fifth.mp3'
];

function selectTone(event) {
	switch (event.type) {
		case 'keydown':
			if(event.keyCode == '18'){
			piano.classList.toggle('higher');
			} else if(event.keyCode == '16'){
			piano.classList.toggle('lower');
			}
		break;
		case 'keyup':
			if(event.keyCode == '18') {
			piano.classList.remove('higher');
			} else if(event.keyCode == '16'){
			piano.classList.remove('lower');
			}
		break;

	}         	
}

document.addEventListener('keydown', selectTone);
document.addEventListener('keyup', selectTone);

function getTone() {
	if(piano.classList.contains('higher')) {
		return 'higher/';
	} else if(piano.classList.contains('lower')) {
		return 'lower/';
	} else {
		return 'middle/';
	}
}

Array.from(buttons).forEach((btn, i) => {
  btn.addEventListener('click', () => {
    let player = btn.getElementsByTagName('audio')[0];
    player.src = 'sounds/' + getTone() + melodys[i];
    player.play();
  });
});

