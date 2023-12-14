import Projects from '../../Models/Projects.js';

import Templates from './Part/Templates.js';
import Toolbar from './Part/Toolbar.js';
import Breadcrumb from './Part/Breadcrumb.js';
import Mainbar from './Part/Mainbar.js';
import DOMEditor from './Part/DOMEditor.js';

var Settings = {
		view: function() {
			return m('main', {
				"id": 'ls_main',
				class: "bg-near-white"
			})
		}
}

var SettingsEditor = {
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
							class: 'mw5 bg-near-white br pa2 overflow-y-scroll'
						}, 
							m(Toolbar, {project_id, mode: "template"})
					),
					m('DIV', {
							"class": 'flex flex-column flex-auto'
						},
						[
							m(Settings),
						]
					)

			])
		])
	}
}

export default SettingsEditor
