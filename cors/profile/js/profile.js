'use strict';
const content = document.querySelector('.content');

function getElement(datasetName) {
	return Array.from(content.querySelectorAll('*')).find(el => {
		if (el.hasAttribute(datasetName)) {
			return el;
		}
	});
}

const profileUserName = getElement('data-name');
const profileDesc = getElement('data-description');
const profilePic = getElement('data-pic');
const profilePos = getElement('data-position');
const profileTechno = getElement('data-technologies');

function parseProfile(profileInfo) {
	profileUserName.textContent = profileInfo.name;
	profileDesc.textContent = profileInfo.descrition;
	profilePos.textContent = profileInfo.position;
	profilePic.setAttribute('src', profileInfo.pic);
	loadData(`https://neto-api.herokuapp.com/profile/${profileInfo.id}/technologies`)
		.then(data => {
			data.forEach(item => {
				let technology = document.createElement('span');
				technology.setAttribute('class', `devicons devicons-${item}`);
				profileTechno.appendChild(technology);
			});
		})
		.then(() => {
			const scriptToRemove = document.querySelector('#loadDataScript');
			scriptToRemove.parentElement.removeChild(scriptToRemove);
		});
}

function loadData(url) {
	const functionName = 'cb' + Math.ceil(Math.random() * 100000);
	return new Promise((done, fail) => {
		window[functionName] = done;
		const script = document.createElement('script');
		script.src = `${url}?jsonp=${functionName}`;
		script.id = 'loadDataScript';
		document.body.appendChild(script);
	}); 
}

loadData('https://neto-api.herokuapp.com/profile/me')
	.then(data => parseProfile(data))
	.then(() => {
		const scriptToRemove = document.querySelector('#loadDataScript');
		scriptToRemove.parentElement.removeChild(scriptToRemove);
	})
	.then(() => {
		content.style = 'display:initial';
	});