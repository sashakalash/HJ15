'use strict';

if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
	navigator.mediaDevices.getUserMedia = function (constraints) {
		var getUserMedia = navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia;

		if (!getUserMedia) {
			return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
		}
		return new Promise((resolve, reject) => {
			getUserMedia.call(navigator, constraints, resolve, reject);
		});
	};
}

function createThumbnail(video) {
	return new Promise((done, fail) => {
		const preview = document.createElement('video');
		preview.src = URL.createObjectURL(video);
		preview.addEventListener('loadeddata', () => preview.currentTime = 2);
		preview.addEventListener('seeked', () => {
			const snapshot = document.createElement('canvas');
			const context = snapshot.getContext('2d');
			snapshot.width = preview.videoWidth;
			snapshot.height = preview.videoHeight;
			context.drawImage(preview, 0, 0);
			snapshot.toBlob(done);
		});
	});
}

function getAccess() {
	return navigator.mediaDevices
		.getUserMedia({video: true, audio: true});
}


function record(app, config, limit) {
	app.mode = 'preparing';
	return new Promise((done, fail) => {
		getAccess()
			.then((stream) => {
				app.mode = 'recording';
				app.preview.srcObject = stream;
				let chunks = [];
				let recorder = new MediaRecorder(stream);
				recorder.addEventListener('dataavailable', (e) => chunks.push(e.data));
				recorder.addEventListener('stop', () => {
					app.mode = 'sending';
					app.preview.srcObject = null;
					stream.getTracks().forEach(track => track.stop());
					const recorded = new Blob(chunks, {'type' : recorder.mimeType});
					const objToSend = {video: recorded, frame: ''};
					createThumbnail(recorded)
						.then(data => {
							objToSend.frame = data;
							done(objToSend);
						});
					
					chunks = null;
					recorder = stream = null;
				});
				recorder.start(1000);
				setTimeout(() => {
					recorder.stop();
				}, app.limit);
			})
			.catch((e) => {
				new Error(e);
			});
	});
}
