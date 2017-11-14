
const tabs = document.querySelectorAll('div.tabs a');
const preloader = document.getElementById('preloader');
const tabContent = document.getElementById('content');
var tabRequest = new XMLHttpRequest();
tabRequest.open('GET', 'http://192.168.1.101:8080/components/email-tab.html', true);
tabRequest.addEventListener('loadstart', tabOnLoadStart);
tabRequest.addEventListener('load', tabOnLoad);

document.addEventListener('DOMContentLoaded', openStartTab);

function openStartTab() {
	tabs[0].classList.add('active');
	tabRequest.send();
}

function pushTab(event) {
	event.preventDefault();
	if(tab.classList.contains('active')) {
		return;
	}
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
 

