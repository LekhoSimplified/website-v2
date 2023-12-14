import Projects from '../../Models/Projects.js';

// import Templates from './Part/Templates.js';
import Toolbar from './Toolbox/Toolbar.js';
import Breadcrumb from './Part/Breadcrumb.js';
import Mainbar from './Part/Mainbar.js';
import DOMEditor from './Part/DOMEditor.js';


var TemplateEditor = {
	template: null,
	
	templateList: function(project_id) {
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
							"class": 'flex-auto'
						},
						[
							m("div", {class: "mt4 ml6"},
								[
									m("h3", "Templates"),
									m("button", {
											class: "db",
											onclick: Projects.new_template
										}, 
										"New Template"
									),
							// m("div", {
							// 	class: "flex flex-auto flex-column justify-center items-center"
							// },
									Projects.list_templates(project_id).map(function(data) {
										return m('A', {
											class: 'db w5 truncate pa2 ba mv2 br2 link dark-gray hide-child',
											href: `#!/editor/project/${project_id}/template/${data.template_id}`

											},
											[
												data['name'],
												m('span', {
													class: 'fr child',
													onclick: function(e) {
															e.preventDefault();
															let answer = confirm("Are you sure you want to delete the template '"+ data['name'] + "'")
															if (answer)
																Projects.delete_template(project_id, data.template_id)

															return false
														},
												},
												'❌')
											]

										)
									})
								]
							),
						]
					)

			])
		])
	},

	templateEdit: function (project_id, template_id) {
		Projects.open_project(project_id)
		Projects.open_template(template_id)

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
							m(Breadcrumb),
							m(DOMEditor),
							m(Mainbar),
						]
					)

			])
		])
	},

	view: function() {
		let project_id = m.route.param("project_id")
		let template_id = m.route.param("template_id")
		if (template_id == "list") 
			return TemplateEditor.templateList(project_id)
		else
			return TemplateEditor.templateEdit(project_id, template_id)
	}
}

export default TemplateEditor
