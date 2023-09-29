import json
import os

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
        attributes.append(f"'{attr}': '{jsonNode['attributes'][attr]}'")

    attributes = "{"+",".join(attributes)+"}"

    # Recursively process child nodes
    if len(jsonNode["children"]) > 0:
        for childJson in jsonNode["children"]:
            if isinstance(childJson, str):
                children.append("\""+childJson+"\"");
            
            else:
                children.append(Json2Dom(childJson));

    children = "["+",".join(children)+"]"

    return f"m('{jsonNode['tag']}',{attributes},{children})"


def Json2Main(jsonNode):
    if not jsonNode:
        return null

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

def WriteComponent(project_name, component_name, view):
    filename = component_name.replace(" ", "_")
    project_name = project_name.replace(" ", "_")

    with open(f"build/{project_name}/assets/components/{filename}.js", "w") as f:
        f.write(f"""
            var {filename} = {{
                view: function() {{
                    return {view}
                }}
            }}
            """)

def WritePage(project_name, Page_name):
    filename = Page_name.replace(" ", "_")
    project_folder_name = project_name.replace(" ", "_")

    with open(f"build/{project_folder_name}/{filename}.html", "w") as f:
        f.write(f"""
<!DOCTYPE html>
<html lang="en">
  <title>{Page_name} | {project_name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css">
  <body>
  <div id="ls_holder">
  </div>

  <script src="https://unpkg.com/mithril/mithril.js"></script>
  <script src="assets/components/{filename}.js"></script>
  <script>
    m.render(ls_holder, m({filename}))
  </script>
  </body>
</html>

            """)

def processProject(project):
    project_name = project["name"].replace(" ", "_")

    createDir(f"build/{project_name}/assets/components")

    if 'templates' in project:
        for template in project['templates']:
            view = Json2Main(project['templates'][template]['view'])
            name = project['templates'][template]['name']
            WriteComponent(project['name'], name, view)


    if 'pages' in project:
        for page in project['pages']:
            view = Json2Main(project['pages'][page]['view'])
            name = project['pages'][page]['name']
            WriteComponent(project['name'], name, view)
            WritePage(project['name'], name)

@app.route("/export")
def export():

    createDir('build')

    p = json.loads(request.args.get('project'))
    processProject(p)
    data = [0, "Success"]
    return jsonify(data)

if __name__ == "__main__":
    app.run()