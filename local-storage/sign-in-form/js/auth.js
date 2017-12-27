'use strict';
const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');
let isFirstSingIn = true;

signIn.addEventListener('change', auth);
signUp.addEventListener('change', auth);

function auth(event) {
	const dataField = event.currentTarget;
	let url = '';
	let isSignUp = true;
	let message = 'Пользователь ';
	if (dataField.className === 'sign-in-htm') {
		isSignUp = false;
	}
	const messField = dataField.querySelector('output.error-message');
	const dataRequest = new XMLHttpRequest();
	dataRequest.addEventListener('load', () => {
		const answer = JSON.parse(dataRequest.responseText);
		if (answer.error) {
			messField.textContent = answer.message;
		} else {
			message += answer.name + ' успешно ';
			message += isSignUp? 'зарегистрирован': 'авторизирован';
			messField.textContent =  message;    
			isFirstSingIn = false;			
		}
	});
	if (isSignUp) {
		url = 'https://neto-api.herokuapp.com/signup';
	} else {
		url = 'https://neto-api.herokuapp.com/signin';
	}
	dataRequest.open('POST', url);
	dataRequest.setRequestHeader('Content-Type', 'application/json');	
	dataField.addEventListener('submit', (event) => {
		event.preventDefault();
		if (isFirstSingIn) {
			let form = new FormData(event.target);
			let object = {};
			form.forEach(function(value, key){
				object[key] = value;
			});
			dataRequest.send(JSON.stringify(object));
		} else {
			messField.textContent = isSignUp? 'Пользователь уже зарегистрирован': 'Пользователь уже авторизирован';
		}
	});
}
