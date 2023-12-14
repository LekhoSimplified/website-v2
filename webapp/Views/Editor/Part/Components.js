import Projects from '../../../Models/Projects.js';

var Components = {
	view: function() {
		let project_id = Projects.project_id

		return m('a', {
					class: 'db pa2 hover-shadow link black',
					href: `#!/editor/project/${project_id}/components/list`
					},
					"Components"
				)
	}
}

export default Components