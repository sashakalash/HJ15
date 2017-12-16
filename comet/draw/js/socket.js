'use strict';

window.editor.addEventListener('update', getCanvas);

function getCanvas(update) {    
	const wss = new WebSocket('wss://neto-api.herokuapp.com/draw'); 
	wss.addEventListener('open', () => {
		update.canvas.toBlob(blob => wss.send(blob));
	});  
}




