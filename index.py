import os
import shutil

import template
import page

def process(project, project_id):
    project_name = project["name"].replace(" ", "_")

    scripts = []

    if 'templates' in project:
        for template_id in project['templates']:
            template_name = project['templates'][template_id]['name'].replace(" ", "_")
            scripts.append(f"assets/components/{template_name}.js")

    if 'pages' in project:
        for page_id in project['pages']:
            page_name = project['pages'][page_id]['name'].replace(" ", "_")
            scripts.append(f"assets/components/{page_name}.js")



    Write(project_name, scripts)
 
def Write(project_name, scripts):
    with open(f"build/{project_name}/index.html", "w") as f:

        f.write(f"""
<!DOCTYPE html>
<html lang="en">
  <meta charset="UTF-8">
  <title>{project_name}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/css/tachyons.min.css">
  <link rel="stylesheet" href="assets/css/colours.css"/>

  <body>
        <script src="assets/js/mithril.js"></script>""")

        for script in scripts:
           f.write(f"""
        <script src="{script}"></script>""")

        f.write(f"""
        <script src="assets/components/routes.js"></script>

  </body>
</html>
        """)