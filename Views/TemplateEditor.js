import Templates from './Templates.js';
import Toolbar from './Toolbar.js';
import Editor from './Editor.js';


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



var TemplateEditor = {
	template: function(project_id) {
		// let id = m.route.param("id")
		// console.info(Projects.GET(id))
		return m('DETAILS', {
			},[
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Project'
			]),
			m('DIV', {
					"class": 'pl2 ml1'
				},[
				m(Templates, {project_id}),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer'
						},[
							'Components'
					]),
					m('DIV', {
							"class": 'pl2 ml1'
						},[

					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer'
						},[
							'Pages'
					]),
					m('DIV', {
							"class": 'pl2 ml1'
						},[

					])
				]),
				m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer'
						},[
							'Files'
					]),
					m('DIV', {
							"class": 'pl2 ml1'
						},[

					])
				])
			])
		])
	},
	view: function() {
		let project_id = m.route.param("project_id")

		return m('DIV', {
				"class": 'vh-100 vw-100 '
			},[
			m('DIV', {
					"class": 'flex vh-100'
				},[
					m('DIV', {
							class: 'mw7 bg-near-white br pa2'
						}, 
							m(Toolbar, {project_id})
					),
					m('DIV', {
							"class": 'flex flex-column w-100'
						},
						[
							m(Editor),
							m('div', {
								class: 'h2 bg-near-white bt'
							})
						]
					)

			])
		])
	}
}

export default TemplateEditor
