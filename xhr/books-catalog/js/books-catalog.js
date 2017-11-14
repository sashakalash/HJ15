var booksData = new XMLHttpRequest();
booksData.open('GET', 'https://neto-api.herokuapp.com/book/', true);
booksData.addEventListener('load', onLoadBooksList);
booksData.send();
const booksListMarkUp= document.querySelector('#content');


function createMarkUp(length) {
	let markUp = '';
	for(let i = 0; i < length; i++) {
		markUp += '<li><img></li>';
	}
	booksListMarkUp.innerHTML = markUp;
}

function onLoadBooksList() {
	const booksArray = JSON.parse(booksData.responseText);
	createMarkUp(booksArray.length);
	const booksListItems = booksListMarkUp.querySelectorAll('li');
	booksArray.forEach((book, index) => {
		booksListItems[index].dataset.title = book.title;
		booksListItems[index].dataset.author = book.author.name;
		booksListItems[index].dataset.info = book.info;
		booksListItems[index].dataset.price = book.price;
		booksListItems[index].querySelector('img').src = book.cover.small;

	});
}