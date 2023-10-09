import Projects from '../Models/Projects.js';

import DOMEditor from './DOMEditor.js';

let Properties = {
	oncreate: function(vnode) {
		vnode.dom.querySelectorAll('input').forEach(function(el) {

		 	el.addEventListener('blur', function(e) {
		 		let prefix = el.dataset['prefix']
		 		let value = el.value
		 		let name = el.getAttribute('name')

		 		if (name == 'text') {
		 			DOMEditor.setText(value)
		 			return
		 		}

		 		else if (prefix)
		 			value = prefix + value

		 		DOMEditor.setAttribute(name, value)
			})

		})
	},
	view: function() {
		return m('DETAILS', {
			},[
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Properties'
			]),
			m('DIV', {
					"class": 'pl2 ml1'
				},[
					m('DIV', {
							"class": 'pl2 bl bw2 ml1'
						},[
						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'ID:'
							]),
							m('INPUT', {
									"class": 'w-50',
									"name": "id"
								}
							)
						]),

						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'HRef:'
							]),
							m('INPUT', {
									"class": 'w-50',
									"name": "href"
								}
							)
						]),

						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Src:'
							]),
							m('INPUT', {
									"class": 'w-50',
									"list": "images_list",
									"data-prefix": `assets/${Projects.project_id}/images/`,
									"name": "src"
								}
							)
						]),

						m('DIV', {
							},[
							m('DIV', {
									"class": 'dib w-40'
								},[
									'Text:'
							]),
							m('INPUT', {
									"class": 'w-50',
									"name": "text"
								}
							)
						])
					])
				]
			)
						
		])
	}
}

export default Properties
