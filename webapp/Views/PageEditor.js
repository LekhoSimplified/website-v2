import Projects from '../Models/Projects.js';

import Templates from './Templates.js';
import Toolbar from './Toolbar.js';
import Breadcrumb from './Breadcrumb.js';
import Mainbar from './Mainbar.js';
import Editor from './Editor.js';


var PageEditor = {
	pageList: function(project_id) {
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
							m(Toolbar)
					),
					m('DIV', {
							"class": 'flex flex-column flex-auto'
						},
						[
							m("div", {
								class: "flex-auto"
							},
								m("div", {class: "mt4 ml6"},
									[
										m("h3", "Pages"),
										m("button", {
												class: "db",
												onclick: Projects.new_page
											}, 
											"New Page"
										),
										Projects.list_pages(project_id).map(function(data) {
											return m('A', {
												class: 'db w5 truncate pa2 ba mv2 br2 link dark-gray hide-child',
												href: `#!/editor/project/${project_id}/page/${data.page_id}`
												},
												[
													data['name'],
													m('span', {
														class: 'fr child',
														onclick: function(e) {
															e.preventDefault();
															let answer = confirm("Are you sure you want to delete the page '"+ data['name'] + "'")
															if (answer)
																Projects.delete_page(project_id, data.page_id)
														},
													},
													'❌')
												]

											)
										})
									]
								)
							),
						]
					)
				]

			)
		])
	},

	pageEdit: function (project_id, page_id) {
		Projects.open_project(project_id)
		Projects.open_page(page_id)

		return m('DIV', {
				"class": 'vh-100 vw-100 '
			},[
			m('DIV', {
					"class": 'flex vh-100'
				},[
					m('DIV', {
							class: 'w-100 mw5 bg-near-white br pa2 overflow-y-scroll'
						}, 
							m(Toolbar)
					),
					m('DIV', {
							"class": 'flex flex-column flex-auto'
						},
						[
							m(Breadcrumb),
							m(Editor),
							m(Mainbar),
						]
					)

			])
		])
	},

	view: function() {
		let project_id = m.route.param("project_id")
		let page_id = m.route.param("page_id")
		if (page_id == "list") 
			return PageEditor.pageList(project_id)
		else
			return PageEditor.pageEdit(project_id, page_id)
	}
}

export default PageEditor
