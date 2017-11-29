'use strict';
const signUpForm = document.querySelector('.sign-up-htm');
const signUpMessage = signUpForm.querySelector('output.error-message');
const signUpFormData = new FormData(signUpForm);
const signUpRequest = new XMLHttpRequest();
signUpRequest.addEventListener('load', signUp);
signUpRequest.open('POST', 'https://neto-api.herokuapp.com/signup');
signUpRequest.setRequestHeader('Content-Type', 'application/json');


const signInForm = document.querySelector('.sign-in-htm');
const signInMessage = signInForm.querySelector('output.error-message');
const signInFormData = new FormData(signInForm);
const signInRequest = new XMLHttpRequest();
signInRequest.addEventListener('load', signIn);
signInRequest.open('POST', 'https://neto-api.herokuapp.com/signin');
signInRequest.setRequestHeader('Content-Type', 'application/json');

signUpForm.addEventListener('submit', sendSingUpRequest);
signInForm.addEventListener('submit', sendSingInRequest);

function sendSingUpRequest(event) {
	event.preventDefault();
	signUpRequest.send(JSON.stringify(signUpFormData));	
}

function sendSingInRequest() {
	event.preventDefault();
	signInRequest.send(JSON.stringify(signInFormData));
}

function signUp() {
	const answer = JSON.parse(signUpRequest.responseText);
	if (answer.error) {
		signUpMessage.textContent = answer.message;
	} else {
		signUpMessage.textContent = 'Пользователь ' + answer.name + ' успешно зарегистрирован';       
	}
}

function signIn() {
	const answer = JSON.parse(signInRequest.responseText);
	if (answer.error) {
		signInMessage.textContent = answer.message;
	} else {
		signInMessage.textContent = 'Пользователь ' + answer.name + ' успешно авторизирован';       
	}
}
