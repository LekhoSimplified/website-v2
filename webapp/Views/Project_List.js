import Projects from '../Models/Projects.js';

var Project_List = {
	view: function() {
		Projects.load_projects()

		return m('DIV', {
				"class": 'vh-100 vw-100 bg-near-white'
			},[
			m('DIV', {
					"class": 'mw7 ml-auto mr-auto'
				},[
				m('H1', {
						"class": 'b ma0 pt4'
					},[
						'Projects'
				]),
				m('DIV', {
						"id": 'projects_list'
					},
					Projects.list_projects().map(function(data) {
						return m('a', {
								class: 'mv3 dark-gray db pa2 shadow-1 f4 link hide-child',
								href:"#!/editor/project/" + data.project_id
							},
							[
								data['name'],
								m('span', {
									class: 'fr child',
									//onclick: delete_project,
								},
								'❌')
							]
						)
						//console.log()
					})
				),
				m('BUTTON', {
						"class": 'mt4',
						"onclick": Projects.new_project
					},[
						'New Project'
				])
			])
		])
	}
}

export default Project_List
