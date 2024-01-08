import os
import shutil

import template
import page
import routes
import index

def createDir(path):
    isExist = os.path.exists(path)
    if not isExist:
       os.makedirs(path) 


def process(project, project_id):
    project_name = project["name"].replace(" ", "_")

    createDir(f"build/{project_name}/assets/components")

    shutil.copytree(f"webapp/assets/common", f"build/{project_name}/assets/", dirs_exist_ok=True)
    shutil.copytree(f"webapp/assets/{project_id}", f"build/{project_name}/assets/", dirs_exist_ok=True)

    if 'templates' in project:
        for template_id in project['templates']:
            name = project['templates'][template_id]['name'].replace(" ", "_")
            view = project['templates'][template_id]['view']

            mithril = template.To_mithril(name, view)
            template.Write(project_name, name, mithril)


    if 'pages' in project:
        for page_id in project['pages']:
            name = project['pages'][page_id]['name'].replace(" ", "_")
            view = project['pages'][page_id]['page']

            mithril = page.To_mithril(name, view)
            page.Write(project_name, name, mithril)

    routes.process(project, project_id)
    index.process(project, project_id)