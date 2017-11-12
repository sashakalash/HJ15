const playPauseView = document.getElementsByClassName('mediaplayer')[0];
const player = document.getElementsByTagName('audio')[0];
const controls = document.getElementsByClassName('controls')[0];
const playBtn = document.getElementsByClassName('playstate')[0];
const stopBtn = controls.getElementsByClassName('stop')[0];
const nextBtn = controls.getElementsByClassName('next')[0];
const backBtn = controls.getElementsByClassName('back')[0];
const title = controls.getElementsByTagName('span')[0];
const playerSongs = [
	'LA Chill Tour.mp3',
	'LA Fusion Jam.mp3',
	'This is it band.mp3'
];

var i = 0;
var songsFolder = 'mp3/';
playBtn.onclick = () => {
	if(playPauseView.classList.contains('play')) {
		playPauseView.classList.remove('play');	
		playPauseView.classList.add('pause');
		player.pause();
	} else {
		playPauseView.classList.remove('pause');
		playPauseView.classList.add('play');
		player.play();	
	}
};

stopBtn.onclick = () => {
	player.pause();
	player.currentTime = 0;
	playPauseView.classList.remove('play');
};

nextBtn.onclick = () => {
	i++;
	if(i === playerSongs.length) {
		i = 0;
		player.src = songsFolder + playerSongs[i];
	} else {
		player.src = songsFolder + playerSongs[i];
	}
	player.play();
	playPauseView.classList.add('play');
	title.title = playerSongs[i].replace(/\.[^\.]*$/, '');
};

backBtn.onclick = () => {
	i--;
	if(i < 0) {
		i = playerSongs.length - 1;
		player.src = songsFolder + playerSongs[i];
	} else {
		player.src = songsFolder + playerSongs[i];
	}
	player.play();
	playPauseView.classList.add('play');
	title.title = playerSongs[i].replace(/\.[^\.]*$/, '');
};
