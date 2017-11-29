'use strinct';
const bubblesConnection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
document.addEventListener('click', (event) => {
	bubblesConnection.send(JSON.stringify({
		'x': event.clientX,
		'y': event.clientY
	}));
});
showBubbles(bubblesConnection);