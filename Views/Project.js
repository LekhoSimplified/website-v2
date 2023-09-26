import Projects from '../Models/Projects.js';
	
import Tools from './includes/Tools.js';
import Project from './Project.js';

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
	template: function(project, toolbox, mainbar) {
		// let id = m.route.param("id")
		console.info(project)
		return m('DIV', {
				"class": 'vh-100 vw-100 flex'
			},[
			m('DIV', {
					"id": 'ls_toolbox',
					"class": 'w5 h-100 br bg-near-white pa2 overflow-y-scroll'
				},[
				m("A", {
					href: "/"
				}, '🔙'),

				m('H2', {
					class: 'mv3 f4 b',
				},[
					project.name
				]),
				m(Project),
				Tools.elements(),
				Tools.style_editor()
			]),
			m('DIV', {
					"class": 'flex-auto h-100 flex flex-column'
				},[
				m('MAIN', {
						"id": 'ls_main',
						"class": 'show-empty'
					},[

				]),
				m('DIV', {
						"id": 'ls_mainbar',
						"class": 'h2 bt bg-near-white'
					},[
					mainbar
				])
			])
		])
	},
	view: function() {
		let id = m.route.param("project_id")
		let project = Projects.GET(id)
		return Editor.template(project)
	},
	oncreate: function(vnode) {
		vnode.dom.addEventListener('click', function(e) {
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
	}
}

export default Editor
