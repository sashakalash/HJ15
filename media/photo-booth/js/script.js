'use strict';

const constraints = {video: true, audio: false};
const errorMessage = document.querySelector('#error-message');
const takePhotoBtn = document.querySelector('#take-photo');
takePhotoBtn.addEventListener('click', getPhoto);

const audio = document.createElement('audio');
audio.textContent = 'Ваш браузер не умеет воспроизводить звуки';
audio.src = './audio/click.mp3';

const app = document.querySelector('.app');
const cameraWindow = document.createElement('video');
app.appendChild(cameraWindow);

const canvas = document.createElement('canvas');
app.appendChild(canvas);
const ctx = canvas.getContext('2d');

const listPic = document.querySelector('.list');

navigator.mediaDevices
	.getUserMedia({video: true, audio: false})
	    .then((stream) => {
		cameraWindow.src = URL.createObjectURL(stream);
	})
	.catch(() => {
		errorMessage.textContent = 'Не удалось получить доступ к камере';
	});

function setImg(src) {
    const figure = document.createElement('figure');
    const i
    <figure>
    <img src="path/to/pic.png">
    <figcaption>
      <a href="path/to/pic.png" download="snapshot.png">
        <i class="material-icons">file_download</i>
      </a>
      <a><i class="material-icons">file_upload</i></a>
      <a><i class="material-icons">delete</i></a>
    </figcaption>
  </figure>
}


function getPhoto() {
	audio.play();
	canvas.width = cameraWindow.videoWidth;
	canvas.height = cameraWindow.videoHeight;
    ctx.drawImage(cameraWindow, 0, 0);
	setImg(canvas.toDataURL());
}


