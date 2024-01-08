import json
import os
import re
import base64    

from flask import Flask
from flask import abort, redirect, url_for
from flask import Flask,jsonify,request

from werkzeug.utils import secure_filename

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

    # assets["css"] = os.listdir( f'webapp/assets/{project}/css')
    # assets["js"] = os.listdir( f'webapp/assets/{project}/js')
    assets["images"] = os.listdir( f'webapp/assets/{project}/images')
    # assets["videos"] = os.listdir( f'webapp/assets/{project}/videos')
    assets["documents"] = os.listdir( f'webapp/assets/{project}/documents')

    return jsonify(assets)

@app.route('/upload_asset', methods=['PUT'])
def upload_asset():
    if request.method == 'PUT':
        # check if the post request has the file part
        project_id = request.json['project_id']
        filename = secure_filename(request.json['name'])
        mimetype = request.json['type']
        content = base64.b64decode(request.json['content'].split(",")[1])

        if 'image/' in mimetype:
            with open(f'webapp/assets/{project_id}/images/{filename}', "wb") as binary_file:
                binary_file.write(content)

        # elif 'video/' in mimetype:
        #     with open(f'webapp/assets/{project_id}/videos/{filename}', "wb") as binary_file:
        #         binary_file.write(content)

        else:
            with open(f'webapp/assets/{project_id}/documents/{filename}', "wb") as binary_file:
                binary_file.write(content)

        data = [0, "Sucessfully Uploaded"]
        return jsonify(data)


@app.route("/export", methods=['POST'])
def export():

    createDir('build')

    project_id = request.json.get('project_id')
    p = json.loads(request.json.get('project'))

    project.process(p, project_id)

    data = [0, "Success"]
    return jsonify(data)




if __name__ == "__main__":
    app.run()