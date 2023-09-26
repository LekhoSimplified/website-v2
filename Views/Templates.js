import Projects from '../Models/Projects.js';
	
var Templates = {
	view: function(vnode) {
		let project_id = vnode.attrs.project_id
		console.info(project_id)

		return m('DETAILS', {
					},[
					m('SUMMARY', {
							"class": 'pointer'
						},[
							'Templates'
					]),
					m('DIV', {
							"class": 'pl2 ml1'
						},[
						m('BUTTON', {
								"onclick": function() {Projects.new_template(project_id)}
							}, [
								'New'
							]
						),
						Projects.list_templates(project_id).map(function(data) {
							return m('A', {
								class: 'db pa2 hover-shadow link dark-gray',
								href: `#!/editor/project/${project_id}/template/${data.uuid}`

								},
								data.name
							)
						})

					])
				])
	}
}

export default Templates
