const playPauseView = document.getElementsByClassName('mediaplayer')[0];
const playBtn = document.getElementsByClassName('fa fa-play')[0];
const pauseBtn = document.getElementsByClassName('fa fa-pause')[0];
const player = document.getElementsByTagName('audio')[0];
const stopBtn = document.getElementsByClassName('fa fa-stop')[0];
const nextBtn = document.getElementsByClassName('fa fa-forward')[0];
const backBtn = document.getElementsByClassName('fa fa-backward')[0];
const controls = document.getElementsByClassName('controls')[0];
const title = controls.getElementsByTagName('span')[0];
const playerSongs = [
	'LA Chill Tour.mp3',
	'LA Fusion Jam.mp3',
	'This is it band.mp3'
];
var i = 0;
var songsFolder = 'mp3/';
playBtn.onclick = () =>{
	player.play();
	playPauseView.classList.add('play');
};
pauseBtn.onclick = () => {
	player.pause();
	playPauseView.classList.remove('play');
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
