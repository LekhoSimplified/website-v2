import json
import os
import jsmin
import re
import shutil

from flask import Flask
from flask import abort, redirect, url_for
from flask import Flask,jsonify,request

app = Flask(__name__, static_folder="webapp", static_url_path='/webapp')

@app.route("/")
def hello():
    return redirect("/webapp/index.html")

def Json2Dom(jsonNode):
    if not jsonNode:
        return None

    attributes = []
    children = []

    for attr in jsonNode["attributes"]:
        if attr == 'contenteditable':
            continue

        if attr == 'class':
            if 'ls_selected' in jsonNode['attributes'][attr]:
                jsonNode['attributes']['class'] = jsonNode['attributes']['class'].replace('ls_selected', '')
                jsonNode['attributes']['class'] = jsonNode['attributes']['class'].replace('  ', ' ')


        jsonNode['attributes'][attr] = re.sub(r"assets/[\d\-\w]+/(.*)", r"assets/\g<1>", jsonNode['attributes'][attr])
         # = jsonNode['attributes'][attr].replace('assets/\d')

        attributes.append(f"'{attr}': '{jsonNode['attributes'][attr]}'")

    attributes = "{"+",".join(attributes)+"}"

    # Recursively process child nodes
    if len(jsonNode["children"]) > 0:
        for childJson in jsonNode["children"]:
            if isinstance(childJson, str):
                children.append("`"+childJson.replace(r'"', r'\"')+"`");
            
            else:
                children.append(Json2Dom(childJson));

    if jsonNode["tag"] == "MAIN":
        children.append("m(Page)")

    children = "["+",".join(children)+"]"



    return f"m('{jsonNode['tag']}',{attributes},{children})"


def Json2Main(jsonNode):
    if not jsonNode:
        return None

    children = [];

    # Recursively process child nodes
    if len(jsonNode) > 0:
        for childJson in jsonNode:
            if isinstance(childJson, str):
                children.append(childJson);
            else:
                children.append(Json2Dom(childJson));

    children = "["+",".join(children)+"]"

    return children

def createDir(path):
    isExist = os.path.exists(path)
    if not isExist:
       os.makedirs(path) 

def WriteComponent(component_type, project_name, component_name, view):
    filename = component_name.replace(" ", "_")
    project_name = project_name.replace(" ", "_")

    with open(f"build/{project_name}/assets/components/{filename}.js", "w") as f:

        f.write(f"""
// {filename}.js, Made for {project_name}
// Generated By Lekho Website
var {component_type}={{view:function(){{return {view}}}}}"""
    )

def WritePage(project_name, Page_name, Template_name, default):

    if default:
        page_filename = "index"
    else:
        page_filename = Page_name.replace(" ", "_")

    page_component_name = Page_name.replace(" ", "_")

    template_component_name = Template_name.replace(" ", "_")
    project_folder_name = project_name.replace(" ", "_")

    with open(f"build/{project_folder_name}/{page_filename}.html", "w") as f:
        f.write(f"""
<!DOCTYPE html>
<html lang="en">
  <meta charset="UTF-8">
  <title>{Page_name} | {project_name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/css/tachyons.min.css">
  <link rel="stylesheet" href="assets/css/colours.css"/>

  <body>
      <script src="assets/js/mithril.js"></script>
      <script src="assets/components/{page_component_name}.js"></script>
      <script src="assets/components/{template_component_name}.js"></script>
      <script>
        m.render(document.body, m(Template))
      </script>
  </body>
</html>

            """)

def processProject(project, project_id):
    project_name = project["name"].replace(" ", "_")

    createDir(f"build/{project_name}/assets/components")

    shutil.copytree(f"webapp/assets/common", f"build/{project_name}/assets/", dirs_exist_ok=True)
    shutil.copytree(f"webapp/assets/{project_id}", f"build/{project_name}/assets/", dirs_exist_ok=True)

    if 'templates' in project:
        for template in project['templates']:
            view = Json2Main(project['templates'][template]['view'])
            name = project['templates'][template]['name']
            WriteComponent("Template", project['name'], name, view)


    if 'pages' in project:
        for page in project['pages']:
            view = Json2Main(project['pages'][page]['view'])
            page_name = project['pages'][page]['name']
            template_id = project['pages'][page]['template']
            template_name = project['templates'][template]['name']
            default = project['pages'][page]['default']

            WriteComponent("Page", project['name'], page_name, view)
            WritePage(project['name'], page_name, template_name, default)


@app.route("/init_project")
def init_project():
    project = request.args.get('project')

    if project:
        createDir(f'webapp/assets/{project}')
        createDir(f'webapp/assets/{project}/css')
        createDir(f'webapp/assets/{project}/js')
        createDir(f'webapp/assets/{project}/images')
        createDir(f'webapp/assets/{project}/videos')
        createDir(f'webapp/assets/{project}/documents')

        data = [0, "Success"]
        return jsonify(data)
    else:
        data = [1, "Project number not supplied"]
        return jsonify(data)

@app.route("/export")
def export():

    createDir('build')

    project_id = request.args.get('project_id')

    p = json.loads(request.args.get('project'))
    processProject(p, project_id)

    data = [0, "Success"]
    return jsonify(data)

@app.route("/list_assets")
def list_assets():
    project = request.args.get('project')

    assets = {
        "css": [],
        "js": [],
        "images": [],
        "videos": [],
        "documents": []
    }

    for filename in os.listdir( f'webapp/assets/{project}/css'):
        assets["css"].append(filename)

    for filename in os.listdir( f'webapp/assets/{project}/js'):
        assets["js"].append(filename)

    for filename in os.listdir( f'webapp/assets/{project}/images'):
        assets["images"].append(filename)

    for filename in os.listdir( f'webapp/assets/{project}/videos'):
        assets["viseos"].append(filename)

    for filename in os.listdir( f'webapp/assets/{project}/documents'):
        assets["documents"].append(filename)

    return jsonify(assets)



if __name__ == "__main__":
    app.run()