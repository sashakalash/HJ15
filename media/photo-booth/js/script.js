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
const controls = document.querySelector('.controls');


navigator.mediaDevices
	.getUserMedia({video: true, audio: false})
	    .then((stream) => {
		controls.classList.add('visible');
		cameraWindow.src = URL.createObjectURL(stream);
	})
	.catch(() => {
		errorMessage.textContent = 'Не удалось получить доступ к камере';
	});

function setImg(imgSrc) {

	function createPicEl(tagName, attributes, text) {
		const el = document.createElement(tagName);
		if (typeof attributes === 'object') {
			Object.keys(attributes).forEach(i => el.setAttribute(i, attributes[i]));
		}
		if (typeof text === 'string') {
			el.textContent = text;
		}
		return el;
	}
    
	const figure = createPicEl('figure');
	const img = createPicEl('img', {'src': imgSrc});
	const figcaption = createPicEl('figcaption');
	const snapshot = createPicEl('a', {href: imgSrc, download: 'snapshot.png'});
	const fileDownloadBtn = createPicEl('i', {class: 'material-icons'}, 'file_download');
	const firstTagA = createPicEl('a');
	const secondTagA = createPicEl('a');
	const fileUploadBtn = createPicEl('i', {class: 'material-icons'}, 'file_upload');
	const deleteBtn = createPicEl('i', {class: 'material-icons'}, 'delete');
    
	firstTagA.appendChild(fileUploadBtn);
	secondTagA.appendChild(deleteBtn);
	snapshot.appendChild(fileDownloadBtn);
	figcaption.appendChild(snapshot);
	figcaption.appendChild(firstTagA);
	figcaption.appendChild(secondTagA);
	figure.appendChild(img);
	figure.appendChild(figcaption);

	listPic.appendChild(figure);
}

function getPhoto() {
	audio.play();
	canvas.width = cameraWindow.videoWidth;
	canvas.height = cameraWindow.videoHeight;
	ctx.drawImage(cameraWindow, 0, 0);
	setImg(canvas.toDataURL());
}
listPic.addEventListener('click', makeChangeToPhoto);

function makeChangeToPhoto(event) {
	if (event.target.textContent === 'file_upload') {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);
		xhr.setRequestHeader('Content-Type', 'multipart/form-data');
		const imgSrc = event.target.parentElement.previousElementSibling.href;        
		const imgToSend = new FormData();
		imgToSend.append('image', imgSrc);    
		xhr.send(imgToSend);  
	}
	if (event.target.textContent === 'delete') {
		const elToRemove = event.target.parentElement.parentElement.parentElement;     
		listPic.removeChild(elToRemove);
	}
}
