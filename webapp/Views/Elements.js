import Editor from './Editor.js';

let Elements = {
	oncreate: function(vnode) {
		vnode.dom.addEventListener('click', function(e) {
			if (e.target.classList.contains('add_element')) {
				let tag = e.target.getAttribute('data-element');
				let element = document.createElement(tag)
				element.dataset['tag'] = e.target.innerText

				if ( e.target.hasAttribute('data-contenteditable') ) {
					element.setAttribute('contenteditable', true)
				}

				Editor.appendChild(element);
			}
			else if (e.target.classList.contains('remove_element')) {
				Editor.removeSelected()
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
							"data-contenteditable": 'true'
						},[
							'Text'
					]),
					m('BUTTON', {
							"class": 'add_element mh1',
							"data-element": 'a',
							"data-contenteditable": 'true'
						},[
							'Link'
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
							"data-contenteditable": 'true'
						},[
							'Summary'
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
