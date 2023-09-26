import Projects from './Models/Projects.js';
import Project_List from './Views/Project_List.js';
import TemplateEditor from './Views/TemplateEditor.js';

Projects.load_projects()

m.route(ls_holder, "/", {
    "/": Project_List,
    "/editor/project/:project_id": TemplateEditor,
    "/editor/project/:project_id/template/:template_id": TemplateEditor,
})
// m.mount(ls_holder, Project_List)