'use strict';
const profile = document.querySelector('.container');

function getElement(datasetName) {
	Array.from(profile.querySelectorAll('*')).find(el => {
		if (el.hasAttribute(datasetName)) {
			return el;
		}
	});
}

const profileWallpaper = getElement('data-wallpaper');
const profileUsername = getElement('data-username');
const profileDesc = getElement('data-description');
const profilePic = getElement('data-pic');
const profileTweets = getElement('data-tweets');
const profileFollowers = getElement('data-followers');
const profileFollowing = getElement('data-following');

function parseProfile(profileInfo) {
	profileUsername.textContent = profileInfo.username;
	profileDesc.textContent = profileInfo.descrition;
	profileTweets.textContent = profileInfo.tweets;
	profileFollowers.textContent = profileInfo.followers;
	profileFollowing.textContent = profileInfo.following;
	profileWallpaper.setAttribute('src', profileInfo.wallpaper);
	profilePic.setAttribute('src', profileInfo.pic);
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

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
    .then(data => parseProfile(data));
    .then(body.querySelector('#loadDataScript').parentElement.removeChild('#loadDataScript'))