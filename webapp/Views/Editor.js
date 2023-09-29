import Projects from '../Models/Projects.js';

import Breadcrumb from './Breadcrumb.js';
import StyleEditor from './StyleEditor.js';


function camelCase(str) {
	return str
		.replace(/\s(.)/g, function (a) {
			return a.toUpperCase();
		})
		.replace(/\s/g, '')
		.replace(/^(.)/, function (b) {
			return b.toLowerCase();
		});
}

function getParents(elem) {
	if (elem.id == 'ls_main')
		return []

	var parents = [];
	while(elem.parentNode && elem.id != 'ls_main') {
	parents.push(elem);
	elem = elem.parentNode;
	}
	return parents.reverse();
}

function dom2JSON(element) {
	if (!element) return null;

	const jsonNode = {
		tag: element.tagName,
		attributes: {},
		children: [],
	};

	for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick', 'contenteditable']) {
		if (element.hasAttribute(attr)) {
			jsonNode.attributes[attr] = element.getAttribute(attr)
		}
	}

	for (const data_attr in element.dataset) {
		jsonNode.attributes['data-'+data_attr] = element.dataset[data_attr]
	}

	// Recursively process child nodes
	for (const childNode of element.childNodes) {
		if (childNode.nodeType === Node.TEXT_NODE) {
			jsonNode.children.push(childNode.nodeValue);
		}
		else if (childNode.nodeType === Node.ELEMENT_NODE) {
			jsonNode.children.push(dom2JSON(childNode));
		}
	}

	return jsonNode; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
}


function Main2JSON(element) {
	if (!element) return null;

	const jsonNode = [];

	// Recursively process child nodes
	for (const childNode of element.childNodes) {
		if (childNode.nodeType === Node.TEXT_NODE) {
			jsonNode.push(childNode.nodeValue);
		}
		else if (childNode.nodeType === Node.ELEMENT_NODE) {
			jsonNode.push(dom2JSON(childNode));
		}
	}

	return jsonNode; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
}


function Json2Dom(jsonNode) {
	if (!jsonNode) return null;

	let element = document.createElement(jsonNode.tag)

	for (const attr in jsonNode.attributes) {
		element.setAttribute(attr, jsonNode.attributes[attr])
	}

	console.info(jsonNode)

	// Recursively process child nodes
	if (jsonNode.children.length > 0)
		for (const childJson of jsonNode.children) {
			if (typeof(childJson) == 'string') {
				element.appendChild(document.createTextNode(childJson));
			}
			else {
				element.appendChild(Json2Dom(childJson));
			}
		}

	return element; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
}

function Json2Main(jsonNode) {
	if (!jsonNode) return null;

	var frag = document.createDocumentFragment();

	// Recursively process child nodes
	if (jsonNode.length > 0)
		for (const childJson of jsonNode) {
			if (typeof(childJson) == 'string') {
				frag.appendChild(document.createTextNode(childJson));
			}
			else {
				frag.appendChild(Json2Dom(childJson));
			}
		}

	return frag; // m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
}


function setFocus(elem) {
		const range = window.document.createRange();
		range.setStart(elem, 0);
		range.setEnd(elem, 0);
	}

var Editor = {
	ls_selected: null,
	main_node: null,

	appendChild: function(node) {
		Editor.ls_selected.appendChild(node);
	},
	removeSelected: function(node) {
		if (Editor.ls_selected !== Editor.main_node) {
			Editor.ls_selected.remove()
			Editor.ls_selected = Editor.main_node
			Breadcrumb.setBreadcrumbs([])
		}
	},
	addClass: function(className) {
		Editor.ls_selected.classList.add(className);
	},
	removeClass: function(className) {
		Editor.ls_selected.classList.add(className);
	},
	getJSON: function() {
		return Main2JSON(Editor.main_node)
	},
	oncreate: function(vnode) {
		Editor.main_node = vnode.dom

		let jsonNode = Projects.getActiveObject()
		let element = Json2Main(jsonNode.view)
		if (element)
			Editor.main_node.appendChild(element)

		Editor.ls_selected = vnode.dom
		Editor.ls_selected.classList.add('ls_selected')

		vnode.dom.addEventListener('click', function(e) {
			if (Editor.ls_selected == e.target) {
				Editor.ls_selected = vnode.dom
			}
			else {
				Editor.ls_selected = e.target;
			}

			// Remove selected class
			let ls_selected_list = vnode.dom.querySelectorAll('.ls_selected')

			if (vnode.dom.classList.contains('ls_selected')) {
				vnode.dom.classList.remove('ls_selected')
			}

			for (const selected of ls_selected_list) {
				if (selected.classList.contains('ls_selected')) {
					selected.classList.remove('ls_selected')
				}
			}

			//Add selected class
			Editor.ls_selected.classList.add('ls_selected')
			StyleEditor.setClasses(Editor.ls_selected.className.split(" "))

			// Set Focus
			//setFocus(Editor.ls_selected)

			Breadcrumb.setBreadcrumbs(getParents(Editor.ls_selected))

		})
	},
	addClass: function(c) {
		Editor.ls_selected.classList.add(c)
	},
	removeClasses: function(cs) {
		for (var c of cs) {
			if (Editor.ls_selected.classList.contains(c)) {
				Editor.ls_selected.classList.remove(c)
			}
		}
		Editor.ls_selected.classList.add('ls_selected')
	},
	setStyle: function(style, value) {
		Editor.ls_selected.style[camelCase(style)] = value;
	},
	select: function(el) {
		Editor.ls_selected = el

		// Remove selected class
		let ls_selected_list = Editor.main_node.querySelectorAll('.ls_selected')

		if (Editor.main_node.classList.contains('ls_selected')) {
			Editor.main_node.classList.remove('ls_selected')
		}

		for (const selected of ls_selected_list) {
			if (selected.classList.contains('ls_selected')) {
				selected.classList.remove('ls_selected')
			}
		}

		//Add selected class
		Editor.ls_selected.classList.add('ls_selected')
		StyleEditor.setStyles(Editor.ls_selected.className.split(" "))
		// Set Focus
		//setFocus(Editor.ls_selected)	
	},
	selectBody: function() {
		Editor.select(Editor.main_node)
	},
	view: function() {
		return m('main', {
					"id": 'ls_main',
					class: "show-empty"
				})
	}
}

export default Editor
