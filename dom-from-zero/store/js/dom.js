'use strict';
function createElement(node) {
	if (typeof node === 'object') {
		const fragment = document.createElement(node.name);
		Object.keys(node.props).forEach(el => fragment.setAttribute(el, node.props[el]));
		node.childs.forEach(el => fragment.appendChild(el));
		return fragment; 
	}
	if (typeof node === 'string') {
		return document.createTextNode(node);
	}
}



// Функция createElement принимает следующие аргументы:

// node, описание DOM-узла, объект.
// У объекта описания DOM-узла есть следующие свойства:

// name, название, например, h1 или button, строка;
// props, атрибуты, объект;
// childs, список дочерних узлов, массив.
// При вызове с объектом должна создать и вернуть DOM-узел, соответствующий описанию.

// Также функцию createElement можно вызвать со следующими аргументами:

// node, содержимое текстового узла, строка.
// При вызове со строкой функция должна создать и вернуть текстовый узел.