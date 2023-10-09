import DOMEditor from './DOMEditor.js';

let Elements = {
	oncreate: function(vnode) {
		vnode.dom.addEventListener('click', function(e) {
			if (e.target.classList.contains('add_element')) {
				let tag = e.target.getAttribute('data-element');

				let element = document.createElement(tag)
				element.dataset['ls_name'] = e.target.innerText
				element.dataset['ls_unit'] = e.target.innerText

				console.log(e.target.dataset)
				let contenteditable = e.target.dataset['contenteditable']
				if (contenteditable)
					element.setAttribute('contenteditable', true)

				DOMEditor.appendChild(element);
			}
			else if (e.target.classList.contains('remove_element')) {
				DOMEditor.removeSelected()
			}
		})
	},
	view: function() {
		return m('DETAILS', {
			},[
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Elements'
			]),
			m('DIV', {
					"class": 'pl2 ml1'
				},[
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'span',
							"data-contenteditable": "true"
						},[
							"Text"
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'a',
							"data-contenteditable": "true"
						},[
							"Link"
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'p',
							"data-contenteditable": 'true'
						},[
							'Paragraph'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'article',
							"data-contenteditable": 'true'
						},[
							'Article'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'div'
						},[
							'Division'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'header'
						},[
							'Header'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'footer'
						},[
							'Footer'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'nav'
						},[
							'Navigation'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'aside'
						},[
							'Aside'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'section'
						},[
							'Section'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'main'
						},[
							'Main'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'details'
						},[
							'Details'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'summary',
						},[
							'Summary'
					])
				]),,
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'figure'
						},[
							'Figure'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'img',
						},[
							'Image'
					])
				]),
				m('DIV', {
						"class": 'mv2'
					},[
					m('BUTTON', {
							"class": 'remove_element mh1'
						},[
							'REMOVE'
					])
				])
			])
		])
	}
}

export default Elements
