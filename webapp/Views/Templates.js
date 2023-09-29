import Projects from '../Models/Projects.js';
	
var Templates = {
	view: function(vnode) {
		let project_id = Projects.project_id

		return m('a', {
					class: 'db pa2 hover-shadow link black',
					href: `#!/editor/project/${project_id}/template/list`
					},
					"Templates"
				)			
	}
}

export default Templates
