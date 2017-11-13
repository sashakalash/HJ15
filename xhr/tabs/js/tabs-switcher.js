document.addEventListener('DOMContentLoaded', openStartTab);

const tabs = document.querySelectorAll('div.tabs a');

const preloader = document.getElementById('preloader');
const tabContent = document.getElementById('content');
var tabRequest = new XMLHttpRequest();
tabRequest.open('GET', 'http://192.168.1.101:8080/components/email-tab.html', true);
tabRequest.addEventListener('loadstart', tabOnLoadStart);
tabRequest.addEventListener('load', tabOnLoad);


function openStartTab() {
	console.log('domcontentload');
	tabs[0].classList.add('active');
	tabRequest.send();
}

document.addEventListener('DOMContentLoaded', openStartTab);

function pushTab(event) {
	event.preventDefault();
	for(const tab of tabs) {
		tab.classList.remove('active');
	} 
	this.classList.add('active');
	const requestUrl = 'http://192.168.1.101:8080/' + this.getAttribute('href');
	tabRequest.open('GET', requestUrl, true);
	tabRequest.send();
}

function tabOnLoadStart() {
	preloader.classList.remove('hidden');
}

function tabOnLoad() {
	preloader.classList.add('hidden');
	tabContent.innerHTML = tabRequest.responseText;
}

for(const tab of tabs) {
	tab.addEventListener('click', pushTab);
}
// // Заголовки табов реализованы тегами <a> в теге <nav>.
// // вешаем на нажатие a функцию

// // Его необходимо получать асинхронным запросом при активации таба.
// // на нажатие ссылки повесить событие запроса 
// // полученный запрос записываем в переменную


// Во время ожидания ответа и загрузки данных должен появляться индикатор загрузки.
// // на onLoadStart вешаем у <div id="preloader"> удали classList.remove('hidden')

// // Адрес, по которому необходимо получить содержимое таба, 
// // нужно получить из атрибута href ссылки.
// получи тег a из div tabs
// запиши в переменную содержимое href аттрибута 

// // Содержимое таба «Email» должно быть показано сразу при открытии страницы.
// на domcontentload вешаем содержимое таба «Email»


// // Переход по ссылке при клике на ней осуществляться не должен.
// повесь отмену перехода по ссылке при клике на ссыль

// // Содержимое активного таба необходимо поместить в тело тега <div id="content">.
// то, что лежит в переменной засунь в innerHTML 

// // Чтобы выделить активный таб, ему необходимо добавить класс active.
// повесь на вызов таба событие classList.add('active')

// // Текущий таб должен быть выделен. Одновременно может быть выбран только один таб.
// добавь проверку нет ли на другом табе свойства active 

