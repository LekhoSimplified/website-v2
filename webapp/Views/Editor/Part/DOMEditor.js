import Projects from '../../../Models/Projects.js';

import Breadcrumb from './Breadcrumb.js';
import StyleEditor from '../Toolbox/StyleEditor.js';


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

	for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick', 'contenteditable', 'style']) {
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


var DOMEditor = {
	ls_selected: null,
	main_node: null,

	appendChild: function(node) {
		DOMEditor.ls_selected.appendChild(node);
	},
	removeSelected: function(node) {
		if (DOMEditor.ls_selected !== DOMEditor.main_node) {
			DOMEditor.ls_selected.remove()
			DOMEditor.ls_selected = DOMEditor.main_node
			Breadcrumb.setBreadcrumbs([])
		}
	},
	getJSON: function() {
		return Main2JSON(DOMEditor.main_node)
	},
	oncreate: function(vnode) {
		DOMEditor.main_node = vnode.dom

		let jsonNode = Projects.getActiveObject()
		let element = Json2Main(jsonNode.view)
		if (element)
			DOMEditor.main_node.appendChild(element)

		let selected_element = vnode.dom.querySelector('.ls_selected')
		if (selected_element) {
			DOMEditor.ls_selected = selected_element
			Breadcrumb.setBreadcrumbs(getParents(DOMEditor.ls_selected))
		}
		else
			DOMEditor.ls_selected = vnode.dom

		DOMEditor.ls_selected.classList.add('ls_selected')

		vnode.dom.addEventListener('click', function(e) {
			if (e.target.tagName == "A")
				e.preventDefault()
			//if (!e.target.classList.contains('ls-unit'))
			//	return

			if (DOMEditor.ls_selected == e.target) {
				DOMEditor.ls_selected = vnode.dom
			}
			else {
				DOMEditor.ls_selected = e.target;
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
			DOMEditor.ls_selected.classList.add('ls_selected')
			StyleEditor.setClasses(DOMEditor.ls_selected.className.split(" "))

			// Set Focus
			//setFocus(DOMEditor.ls_selected)

			Breadcrumb.setBreadcrumbs(getParents(DOMEditor.ls_selected))

		})
	},
	addClass: function(c) {
		DOMEditor.ls_selected.classList.add(c)
	},
	removeClasses: function(cs) {
		for (var c of cs) {
			if (DOMEditor.ls_selected.classList.contains(c)) {
				DOMEditor.ls_selected.classList.remove(c)
			}
		}
		DOMEditor.ls_selected.classList.add('ls_selected')
	},
	setStyle: function(style, value) {
		DOMEditor.ls_selected.style[camelCase(style)] = value;
	},
	setText: function(value) {
		DOMEditor.ls_selected.innerText = value;
	},
	select: function(el) {
		DOMEditor.ls_selected = el

		// Remove selected class
		let ls_selected_list = DOMEditor.main_node.querySelectorAll('.ls_selected')

		if (DOMEditor.main_node.classList.contains('ls_selected')) {
			DOMEditor.main_node.classList.remove('ls_selected')
		}

		for (const selected of ls_selected_list) {
			if (selected.classList.contains('ls_selected')) {
				selected.classList.remove('ls_selected')
			}
		}

		//Add selected class
		DOMEditor.ls_selected.classList.add('ls_selected')
		StyleEditor.setClasses(DOMEditor.ls_selected.className.split(" "))
		// Set Focus
		//setFocus(DOMEditor.ls_selected)	
	},
	setAttribute: function(attr, value) {
        DOMEditor.ls_selected.setAttribute(attr, value)
    },
	selectMain: function() {
		DOMEditor.select(DOMEditor.main_node)
	},
	view: function() {
		return m('main', {
					"id": 'ls_main',
					class: "show-empty"
				})
	}
}

export default DOMEditor
