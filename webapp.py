import json
import os
import jsmin
import re

from flask import Flask
from flask import abort, redirect, url_for
from flask import Flask,jsonify,request

import project

app = Flask(__name__, static_folder="webapp", static_url_path='/webapp')

def createDir(path):
    isExist = os.path.exists(path)
    if not isExist:
       os.makedirs(path) 


@app.route("/")
def hello():
    return redirect("/webapp/index.html")

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

    assets["css"] = os.listdir( f'webapp/assets/{project}/css')
    assets["js"] = os.listdir( f'webapp/assets/{project}/js')
    assets["images"] = os.listdir( f'webapp/assets/{project}/images')
    assets["viseos"] = os.listdir( f'webapp/assets/{project}/videos')
    assets["documents"] = os.listdir( f'webapp/assets/{project}/documents')

    return jsonify(assets)


@app.route("/export")
def export():

    createDir('build')

    project_id = request.args.get('project_id')
    p = json.loads(request.args.get('project'))

    project.process(p, project_id)

    data = [0, "Success"]
    return jsonify(data)




if __name__ == "__main__":
    app.run()