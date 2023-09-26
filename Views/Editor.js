
/*		// Add Element
		document.addEventListener('click', function(e) {
			if (e.target.className == 'add_element') {
				let tag = e.target.getAttribute('data-element');
				let element = document.createElement(tag)
				element.dataset['tag'] = tag

				if ( e.target.hasAttribute('data-contenteditable') ) {
					element.setAttribute('contenteditable', true)
				}

				ls_selected.appendChild(element);
			}
		})

		ls_main.addEventListener('click', function(e) {
			if (ls_selected == e.target) {
				ls_selected = ls_main
			}
			else {
				ls_selected = e.target;
			}

			// Remove selected class
			let ls_selected_list = ls_main.querySelectorAll('.ls_selected')

			if (ls_main.classList.contains('ls_selected')) {
				ls_main.classList.remove('ls_selected')
			}

			for (const selected of ls_selected_list) {
				if (selected.classList.contains('ls_selected')) {
					selected.classList.remove('ls_selected')
				}
			}

			//Add selected class
			ls_selected.classList.add('ls_selected')

		})*/
/*				m('input', {
					type: 'text',
					contenteditable: "true",
					class: 'dib mv3 f4 b w-100',
					onblur: alert,
					value: project.name
				})
				*/



var Editor = {
	ls_selected: null,
	appendChild: function(node) {
		Editor.ls_selected.appendChild(node);
	},
	addClass: function(className) {
		Editor.ls_selected.classList.add(className);
	},
	removeClass: function(className) {
		Editor.ls_selected.classList.add(className);
	},
	oncreate: function(vnode) {
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

		})
	},
	view: function() {
		return m('main', {
					"id": 'ls_holder',
					class: "show-empty"
				})
	}
}

export default Editor
