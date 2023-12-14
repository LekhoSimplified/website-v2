import Projects from './Models/Projects.js';
import Project_List from './Views/Project_List.js';
import EmptyEditor from './Views/Editor/EmptyEditor.js';
import TemplateEditor from './Views/Editor/TemplateEditor.js';
import PageEditor from './Views/Editor/PageEditor.js';
// import SettingsEditor from './Views/Editor/SettingsEditor.js';

Projects.load_projects()

m.route(ls_holder, "/", {
    "/": Project_List,
    "/editor/project/:project_id": EmptyEditor,
    "/editor/project/:project_id/template/:template_id": TemplateEditor,
    "/editor/project/:project_id/page/:page_id": PageEditor,
    // "/editor/project/:project_id/settings": SettingsEditor,

    // "/editor/project/0375e192-6476-4155-bbdc-b45d7c9fc8f6/page/list
})
