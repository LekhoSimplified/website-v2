function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

        function delete_project(e) {
            uuid = e.target.dataset['uuid'];

            delete projects[uuid];

            save_projects()
            list_projects()
        }

        function new_project() {
            let uuid = uuidv4();
            projects[uuid] = {
                name: "Untitled Project"
            }
            save_projects()
            list_projects();
        }

        function list_projects() {
            let list = []
            for (uuid in projects) {
                list.push(m('a', {
                        class: 'mv3 dark-gray db pa2 shadow-1 f4 link hide-child',
                        href:"#!/project" + uuid
                    },
                    [
                        projects[uuid]['name'],
                        m('span', {
                            class: 'fr child',
                            onclick: delete_project,
                            'data-uuid': uuid
                        },
                        '❌')
                    ]
                ))
            }

            console.info(list)

            m.render(projects_list, m('div', list))

            //  projects_list.
            // <a class="" href="#">
            //  Untitled Project <span data-onclick="delete_project" class=""></span></a>
        }


var Projects = {
    projects: null,

    project: null,
    project_id: null,

    template: null,

    new_project: function() {
        let project_id = uuidv4();
        Projects.projects[project_id] = {
            name: "Untitled Project"
        }
        Projects.save_projects()
    },

    list_projects: function() {

        let list = []

        for (let project_id in Projects.projects) {
            list.push({'name': Projects.projects[project_id]['name'], 'project_id': project_id})
        }

        return list
    },

    load_projects: function() {
        if ( 'projects' in localStorage) {
            Projects.projects = JSON.parse(localStorage['projects'])
        }
        else {
            Projects.projects = {}
        }
    },

    save_projects: function() {
        localStorage['projects'] = JSON.stringify(Projects.projects)
    },

    open_project: function(project_id) {
        Projects.project = Projects.projects[project_id]
        Projects.project_id = project_id
    },
    
    save_project: function(project_id) {
        Projects.projects[project_id] = Projects.project

        Projects.save_projects()
    },

    new_template: function(project_id) {
        if (! (project_id in Projects.projects) ) {
            return;
        }

        if (! ('templates' in Projects.projects[project_id]) ) {
            Projects.projects[project_id]['templates'] = {}
        }

        let template_id = uuidv4()
        Projects.projects[project_id]['templates'][template_id] = {
            name: 'Untitled Template',
            view: null
        }

        Projects.save_projects();
    },

    list_templates: function() {

        let list = []

        if ('templates' in Projects.projects[Projects.project_id]) {
            for (let template_id in Projects.projects[Projects.project_id]['templates']) {
                list.push({
                    'name': Projects.projects[Projects.project_id]['templates'][template_id]['name'],
                    'template_id': template_id
                })
            }
        }

        return list
    }
}

export default Projects