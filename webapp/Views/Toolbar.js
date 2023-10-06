import Projects from '../Models/Projects.js';

import Templates from './Templates.js';
import Components from './Components.js';
import Pages from './Pages.js';
import Elements from './Elements.js';
import StyleEditor from './StyleEditor.js';
import Properties from './Properties.js';



var Toolbar = {
	view: function(vnode) {
		return [	
					m("a", {href: "/", class: "link"}, "⇐"),
					m("input", {
						class:"f4 ma2 w-90",
						value: Projects.project.name,
						onblur: function() {
							Projects.project.name = this.value
							Projects.save_projects()
						}}),
					m(Templates),
					// m(Components),
					m(Pages),
					//m(Files, {project_id})
					m("div", {class: "ttu f6 mt4 pl3 mb1 pb1 bb"}, "Tools"),
			Projects.is_editable ? m(Elements) : null,
			Projects.is_editable ? m(StyleEditor) : null,
			Projects.is_editable ? m(Properties) : null
		]
	}
}

export default Toolbar
