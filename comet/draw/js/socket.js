'use strict';

window.editor.addEventListener('update', getCanvas);
const wss = new WebSocket('wss://neto-api.herokuapp.com/draw');
wss.addEventListener('open', console.log('open'));  
wss.addEventListener('message', console.log('1'))
wss.addEventListener('close', console.log('close'));

function getCanvas(update) {

    
	const ctx = update.canvas.getContext('2d');
	const image = ctx.getImageData(0, 0, update.canvas.width, update.canvas.height);
	const binary = Uint8Array.from(image.data);
	console.log(binary);
	wss.send(binary.buffer);
	// wss.close();
}




