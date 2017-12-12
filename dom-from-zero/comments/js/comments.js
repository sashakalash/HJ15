'use strict';

function showComments(list) {
	const commentsContainer = document.querySelector('.comments');
	const comments = list.map(el => commentsContainer.appendChild(createComment(el)));
}

function createComment(comment) {
	const commentWrap = document.createElement('div');
	commentWrap.className = 'comment-wrap';

	const photo = document.createElement('div');
	photo.className = 'photo';
	photo.setAttribute('title', comment.author.name);

	const avatar = document.createElement('div');
	avatar.className = 'avatar';
	avatar.style.backgroundImage = `url("${comment.author.pic}")`;

	const commentBlock = document.createElement('div');
	commentBlock.className = 'comment-block';

	const commentText = document.createElement('p');
	commentText.className = 'comment-text';
	commentText.textContent = `${comment.text.split('\n').join('<br>')}`;

	const bottomComment = document.createElement('div');
	bottomComment.className = 'bottom-comment';

	const commentDate = document.createElement('div');
	commentDate.className = 'comment-date';
	commentDate.textContent = `${new Date(comment.date).toLocaleString('ru-Ru')}`;

	const commentActions = document.createElement('ul');
	commentActions.className = 'comment-actions';

	const complain = document.createElement ('li');
	complain.className = 'complain';
	complain.textContent = 'Пожаловаться';
	const reply = document.createElement ('li');
	reply.className = 'reply';
	reply.textContent = 'Ответить';

	photo.appendChild(avatar);

	commentActions.appendChild(complain);
	commentActions.appendChild(reply);

	bottomComment.appendChild(commentDate);
	bottomComment.appendChild(commentActions);

	commentBlock.appendChild(commentText);
	commentBlock.appendChild(bottomComment);

	commentWrap.appendChild(photo);
	commentWrap.appendChild(commentBlock);
	return commentWrap;

}

fetch('https://neto-api.herokuapp.com/comments')
	.then(res => res.json())
	.then(showComments);
