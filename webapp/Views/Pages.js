import Projects from '../Models/Projects.js';

var Pages = {
	view: function() {
		let project_id = Projects.project_id

		return m('a', {
					class: 'db pa2 hover-shadow link black',
					href: `#!/editor/project/${project_id}/page/list`
					},
					"Pages"
				)
	}
}

export default Pages