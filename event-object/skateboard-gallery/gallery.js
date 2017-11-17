tconst gallery = document.getElementsByClassName('gallery-nav')[0];
const imagesLinks = gallery.getElementsByTagName('a');
const imgViewer = document.getElementsByClassName('gallery-view')[0];

function chooseImg(event) {
	for (const link of imagesLinks) {
		link.classList.remove('gallery-current');
	}
	event.preventDefault();
	this.classList.add('gallery-current');
	imgViewer.src = this.href;
}

Array.from(imagesLinks).forEach(link => {
	link.addEventListener('click', chooseImg);
});