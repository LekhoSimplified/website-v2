import re

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
        children.append("vnode.children")

    
    children = "["+",".join(children)+"]"



    return f"m('{jsonNode['tag']}',{attributes},{children})"


def To_mithril(name, jsonNode):
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

    return f"""var {name}={{view:function(vnode){{return {children}}}}}"""

def Write(project_name, template_name, component):

    with open(f"build/{project_name}/assets/components/Template_{template_name}.js", "w") as f:

        f.write(f"""
// Template: {template_name}.js, Made for {project_name}
// Generated By Lekho Website
{component}"""
     )

