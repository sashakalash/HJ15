let canvasBody = document.getElementById('draw'),
	canvas = canvasBody.getContext('2d'),

	w = canvasBody.width = window.innerWidth,
	h = canvasBody.height = window.innerHeight,
	color = 'hsl(hue,100%,50%)', 
	tick = 0,
	newTick = tick + 1,
	currentHue = 0, 
	painting = false;
    lastX = 0, 
    lastY = 0,
    direction = true,
    canvas.lineWidth = 100;

canvas.lineJoin = 'round';
canvas.lineCap = 'round';

canvasBody.onmousedown = function() {
	painting = true;
};

canvasBody.onmouseup = function() {
	painting = false;
};

canvasBody.addEventListener('mousedown', (evt) => {
	const posX = evt.pageX,
		posY = evt.pageY;
	[lastX, lastY] = [posX, posY];
});

canvasBody.addEventListener('mouseleave', (evt) => {
	painting = false;
});

canvasBody.addEventListener('dblclick',  function() {
	canvas.clearRect(0, 0, w, h);
});

canvasBody.addEventListener('mousemove', function(e){
	const posX = e.pageX,
		posY = e.pageY;
  	if (painting){
		++tick;
    	if (newTick){
			if (currentHue !== 356){
				if (!(e.shiftKey)) {
					currentHue++; 
				} else {
					currentHue--;
				}
			} else {
				currentHue = 0;
			}
			if(canvas.lineWidth >= 100 || canvas.lineWidth <= 5) {
				direction = !direction;
			}
			if (direction) {
				canvas.lineWidth++;
			} else {
				canvas.lineWidth--;
			}
		}

        currentColor = color.replace('hue', currentHue);
		canvas.strokeStyle  = currentColor;
		canvas.beginPath();
		canvas.moveTo(lastX, lastY); 
		canvas.lineTo(posX, posY);
		canvas.stroke();
		[lastX, lastY] = [posX, posY];
	}

});

window.addEventListener('resize', function(){
	w = canvasBody.width = window.innerWidth;
	h = canvasBody.height = window.innerHeight;
});
