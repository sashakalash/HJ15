'use strict';
const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');

signIn.addEventListener('change', auth);
signUp.addEventListener('change', auth);

function auth(event) {
	const dataField = event.currentTarget;
	let url = '';
	let isSignUp = true;
	if (dataField.className === 'sign-in-htm') {
		isSignUp = false;
	}
	const messField = dataField.querySelector('output.error-message');
	const form = new FormData(dataField);
	const dataRequest = new XMLHttpRequest();
	dataRequest.addEventListener('load', () => {
		const answer = JSON.parse(dataRequest.responseText);
		if (answer.error) {
			messField.textContent = answer.message;
		} else {
			let message = 'Пользователь ' + answer.name + ' успешно ';
			message += isSignUp? 'зарегистрирован': 'авторизирован';
			messField.textContent =  message;       
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
		dataRequest.send(JSON.stringify(form));	
	});
}






// const signInForm = document.querySelector('.sign-in-htm');
// const signInMessage = signInForm.querySelector('output.error-message');
// const signInFormData = new FormData(signInForm);
// const signInRequest = new XMLHttpRequest();
// signInRequest.addEventListener('load', signIn);
// signInRequest.open('POST', 'https://neto-api.herokuapp.com/signin');
// signInRequest.setRequestHeader('Content-Type', 'application/json');

// signUpForm.addEventListener('submit', sendSingUpRequest);
// signInForm.addEventListener('submit', sendSingInRequest);

// function sendSingUpRequest(event) {
// 	event.preventDefault();
// 	signUpRequest.send(JSON.stringify(signUpFormData));	
// }

// function sendSingInRequest(event) {
// 	event.preventDefault();
// 	signInRequest.send(JSON.stringify(signInFormData));
// }

// function signUp() {
// 	const answer = JSON.parse(signUpRequest.responseText);
// 	if (answer.error) {
// 		signUpMessage.textContent = answer.message;
// 	} else {
// 		signUpMessage.textContent = 'Пользователь ' + answer.name + ' успешно зарегистрирован';       
// 	}
// }

// function signIn() {
// 	const answer = JSON.parse(signInRequest.responseText);
// 	if (answer.error) {
// 		signInMessage.textContent = answer.message;
// 	} else {
// 		signInMessage.textContent = 'Пользователь ' + answer.name + ' успешно авторизирован';       
// 	}
// }
