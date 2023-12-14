import Projects from '../../Models/Projects.js';

// import Templates from './Part/Templates.js';
import Toolbar from './Toolbox/Toolbar.js';
import DOMEditor from './Part/DOMEditor.js';


var TemplateEditor = {

	view: function() {
		let project_id = m.route.param("project_id")
		Projects.open_project(project_id)

		return m('DIV', {
				"class": 'vh-100 vw-100 '
			},[
			m('DIV', {
					"class": 'flex vh-100'
				},[
					m('DIV', {
							class: 'w5 bg-near-white br pa2 overflow-y-scroll'
						}, 
							m(Toolbar, {project_id, mode:"empty"})
					),
					m('DIV', {
							"class": 'flex flex-column w-100'
						},
						[
							m(DOMEditor),
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
