'use strict';

function showComments(list) {
	const commentsContainer = document.querySelector('.comments');
	const commentNode = list.map(createComment);
	const comments = commentNode.reduce((comment, currentValue) => {
		comment.appendChild(currentValue);
		return comment;
	}, document.createDocumentFragment());
	commentsContainer.appendChild(comments);
}


function createEl(tagName, nameString = '') {
	const el = document.createElement(tagName);
	el.className = nameString;
	return el;
}

function createComment(comment) {
	console.log(comment.text)
	const commentWrap = createEl('div', 'comment-wrap');
	const photo = createEl('div', 'photo');
	photo.setAttribute('title', comment.author.name);
	const avatar = createEl('div', 'avatar');
	avatar.style.backgroundImage = `url("${comment.author.pic}")`;
	const commentBlock = createEl('div', 'comment-block');
	const commentText = createEl('p', 'comment-text');
	commentText.style = 'white-space:pre';
	commentText.textContent = `${comment.text.split('\n').join('<br>')}`;
	const bottomComment = createEl('div', 'bottom-comment');
	const commentDate = createEl('div', 'comment-date');
	commentDate.textContent = `${new Date(comment.date).toLocaleString('ru-Ru')}`;
	const commentActions = createEl('ul', 'comment-actions');
	const complain = createEl('li', 'complain');
	complain.textContent = 'Пожаловаться';
	const reply = createEl('li', 'reply');
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
