import Projects from '../Models/Projects.js';

import Templates from './Templates.js';
import Components from './Components.js';
import Pages from './Pages.js';
import Elements from './Elements.js';
import StyleEditor from './StyleEditor.js';


var Toolbar = {
	view: function(vnode) {

		return [	m("h2",{class:"ma2 truncate"}, Projects.project.name),
					m(Templates),
					// m(Components),
					m(Pages),
					//m(Files, {project_id})
					m("div", {class: "ttu f6 mt4 pl3 mb1 pb1 bb"}, "Tools"),
			Projects.is_editable ? m(Elements) : null,
			Projects.is_editable ? m(StyleEditor) : null
		]
	}
}

export default Toolbar
