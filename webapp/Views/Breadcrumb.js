import DOMEditor from './DOMEditor.js';

var Breadcrumb = {
	bc: [],

	setBreadcrumbs(list) {
		Breadcrumb.bc = list
		m.redraw() // ?
	},
	view: function() {
		let list = Breadcrumb.bc.map(function(b) {
							return m("a", {
									class: "link pointer",
									onclick: function() {
										DOMEditor.select(b)
									}
								},
								' > ' + b.getAttribute('data-tag')
							)
						})
		return m('div', {
						class: "pa1 bg-near-white bb"
					}, [
						m("a", {
									class: "link pointer",
									onclick: function() {
										DOMEditor.selectBody()
									}
								},
								"Body"
						),
						list
					])
	}
}

export default Breadcrumb