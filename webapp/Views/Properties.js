import Projects from '../Models/Projects.js';

import DOMEditor from './DOMEditor.js';

let Properties = {
	oncreate: function(vnode) {
		vnode.dom.querySelectorAll('input').forEach(function(el) {

		 	el.addEventListener('blur', function(e) {
		 		let prefix = el.dataset['prefix']
		 		let value = el.value

		 		if (prefix)
		 			value = prefix + value
		 		DOMEditor.setAttribute(el.getAttribute('name'), value)
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
									'HREF:'
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
									'SRC:'
							]),
							m('INPUT', {
									"class": 'w-50',
									"list": "images_list",
									"data-prefix": `assets/${Projects.project_id}/images/`,
									"name": "src"
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
