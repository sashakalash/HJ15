'use strict';
function createElement(node) {
	if (typeof node === 'object') {
		const fragment = document.createElement(node.name);
		if (node.props) {
			Object.keys(node.props).forEach(el => fragment.setAttribute(el, node.props[el]));
		}
		node.childs.forEach(el => {
			fragment.appendChild(createElement(el));
		});
		return fragment; 
	}
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}
}