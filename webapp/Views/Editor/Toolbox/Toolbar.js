import Projects from '../../../Models/Projects.js';

// import Templates from './Templates.js';
// import Pages from './Pages.js';
// import Components from './Components.js';

import Elements from './Elements.js';
import StyleEditor from './StyleEditor.js';
import Properties from './Properties.js';


var Toolbar = {
	view: function(vnode) {
		let project_id = Projects.project_id

		return [	
					m("a", {href: "/", class: "link"}, "⇐"),
					m("input", {
						class:"f4 ma2 w-90",
						value: Projects.project.name,
						onblur: function() {
							Projects.project.name = this.value
							Projects.save_projects()
						}}),
					m('a', {
						class: 'db pa2 hover-shadow link black',
						href: `#!/editor/project/${project_id}/template/list`
						},
						"Templates"
					),
					// m(Components),
					m('a', {
						class: 'db pa2 hover-shadow link black',
						href: `#!/editor/project/${project_id}/page/list`
						},
						"Pages"
					),
					//m(Files, {project_id})
					Projects.is_dom_editable ? [
							m("div", {class: "ttu f6 mt4 pl3 mb1 pb1 bb"}, "Tools"),
							m(Elements),
							m(StyleEditor),
							m(Properties)
						] : null
		]
	}
}

export default Toolbar
