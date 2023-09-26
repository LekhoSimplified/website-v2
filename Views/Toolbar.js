import Projects from '../Models/Projects.js';

import Templates from './Templates.js';
import Elements from './Elements.js';
import StyleEditor from './StyleEditor.js';


var Toolbar = {
	view: function(vnode) {
		let project_id = vnode.attrs.project_id

		return [
			m('DETAILS', {
				},[
				m('SUMMARY', {
						"class": 'pointer'
					},[
						'Project'
				]),
				m('DIV', {
						"class": 'pl2 ml1'
					},[
					m(Templates, {project_id}),
					//m(Components, {project_id}),
					//m(Pages, {project_id}),
					//m(Files, {project_id})
				])
			]),
			m(Elements),
			m(StyleEditor)
		]
	}
}

export default Toolbar
