import Projects from '../Models/Projects.js';

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
								' > ' + b.dataset['ls_name']
							)
						})
		return m('div', {
						class: "pa1 bg-near-white bb"
					}, [
						m("a", {
									class: "link pointer",
									onclick: function() {
										DOMEditor.selectMain()
									}
								},
								Projects.active_object
						),
						list
					])
	}
}

export default Breadcrumb