'use strict';

window.editor.addEventListener('update', getCanvas);


function getCanvas(update) {    
	const wss = new WebSocket('wss://neto-api.herokuapp.com/draw'); 
	const ctx = update.canvas.getContext('2d');
	const image = ctx.getImageData(0, 0, update.canvas.width, update.canvas.height);
	const binary = Uint8Array.from(image.data);
	wss.addEventListener('open', () => {
		console.log('open');
		wss.send(binary.buffer);
	});  
	wss.addEventListener('close', e => console.log(e.reason));
	
	
}




