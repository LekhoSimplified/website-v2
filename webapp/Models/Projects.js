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

async function init_project(project_id) {
  const response = await fetch("/init_project?project=" + project_id);
  list_assets(project_id)
}

async function list_assets(project_id) {
  const response = await fetch("/list_assets?project=" + project_id);
  const files = await response.json();

  let css = []
  files['css'].forEach(function(file) {
    css.push(m('option', {value: file}))
  })
  m.render(css_list, css)


  let js = []
  files['js'].forEach(function(file) {
    js.push(m('option', {value: file}))
  })
  m.render(js_list, js)

  
  let images = []
  files['images'].forEach(function(file) {
    images.push(m('option', {value: file}))
  })
  m.render(images_list, images)

  
  let videos = []
  files['videos'].forEach(function(file) {
    videos.push(m('option', {value: file}))
  })
  m.render(videos_list, videos)

  
  let documents = []
  files['documents'].forEach(function(file) {
    documents.push(m('option', {value: file}))
  })
  m.render(documents_list, documents)
}   

var Projects = {
    projects: null,

    project: null,
    project_id: null,

    template: null,
    template_id: null,

    component: null,
    component_id: null,

    page: null,
    page_id: null,

    active_object: null,
    is_editable: false,

        
    getActiveObject: function() {
        if (Projects.active_object == "Project")
            return Projects.project

        else if (Projects.active_object == "Template")
            return Projects.template

        else if (Projects.active_object == "Page")
            return Projects.page
    },

    saveActiveObject: function(json) {
        if (Projects.active_object == "Project") {
            Projects.project = json
            Projects.projects[Projects.project_id] = json
        }

        else if (Projects.active_object == "Template") {
            Projects.template = json
            Projects.projects[Projects.project_id]['templates'][Projects.template_id] = json
        }


        else if (Projects.active_object == "Page") {
            Projects.page = json
            Projects.projects[Projects.project_id]['pages'][Projects.page_id] = json
        }

        Projects.save_projects()
    },
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

        Projects.active_object = "Project"
        Projects.is_editable = false

        init_project(project_id)
    },
    
    save_project: function(project_id) {
        Projects.projects[project_id] = Projects.project

        Projects.save_projects()
    },

    open_template: function(template_id) {
        Projects.template = Projects.project["templates"][template_id]
        Projects.template_id = template_id

        Projects.active_object = "Template"
        Projects.is_editable = true
    },

    new_template: function() {
        if (! ('templates' in Projects.projects[Projects.project_id]) ) {
            Projects.projects[Projects.project_id]['templates'] = {}
        }

        let template_id = uuidv4()
        Projects.projects[Projects.project_id]['templates'][template_id] = {
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
    },

    delete_template: function(project_id, template_id) {
        delete Projects.projects[project_id]['templates'][template_id]
        Projects.save_projects()
    },

    open_page: function(page_id) {
        Projects.page = Projects.project["pages"][page_id]
        Projects.page_id = page_id

        Projects.active_object = "Page"
        Projects.is_editable = true
    },

    new_page: function() {
        if (! ('pages' in Projects.projects[Projects.project_id]) ) {
            Projects.projects[Projects.project_id]['pages'] = {}
        }

        let page_id = uuidv4()
        Projects.projects[Projects.project_id]['pages'][page_id] = {
            name: 'Untitled Page',
            view: null,
            template: null,
            default: false
        }

        Projects.save_projects();
    },

    list_pages: function() {

        let list = []

        if ('pages' in Projects.projects[Projects.project_id]) {
            for (let page_id in Projects.projects[Projects.project_id]['pages']) {
                list.push({
                    'name': Projects.projects[Projects.project_id]['pages'][page_id]['name'],
                    'page_id': page_id
                })
            }
        }

        return list
    },

    delete_page: function(project_id, page_id) {
        delete Projects.projects[project_id]['pages'][page_id]
        Projects.save_projects()
    },

    set_default_page: function() {
        let list = Projects.list_pages()
        list.forEach(function(page) {
            Projects.project["pages"][page.page_id].default = false
        })
        
        Projects.project["pages"][Projects.page_id].default = true
        Projects.save_projects()
    },

    reset_default_page: function() {
        Projects.project["pages"][Projects.page_id].default = false
        Projects.save_projects()
    },
}

export default Projects