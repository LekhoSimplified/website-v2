import Projects from '../../../Models/Projects.js';

import DOMEditor from './DOMEditor.js';
import ArticleEditor from './ArticleEditor.js';
import PageEditor from '../PageEditor.js';

var Mainbar = {
	name: null,
	template: null,

	save: function() {
		let obj = Projects.getActiveObject()

		obj.name = Mainbar.name
		obj.template = Mainbar.template

		console.info(Projects.active_object)
		if (Projects.active_object == "Page") {
			console.info(ArticleEditor.quill.getContents())
		}
		else if (Projects.active_object == "Template") {
			obj.view = DOMEditor.getJSON()
			Projects.saveActiveObject(obj);
		}
	},
	oninit: function() {
		Mainbar.name = Projects.getActiveObject().name;
	},
	view: function() {
		return m('div', {
						class: "pa1 bg-near-white bt flex justify-between"
					},[
						m("div", {class:"ml2"},
							[
								`${Projects.active_object}: `,
								m("input", {
										class: "bg-white-80 input-reset ba br2 mr4",
										value: Mainbar.name,
										onblur: function() {
											Mainbar.name = this.value
											Mainbar.save()
										}
									}
								),

								Projects.active_object == "Page" ? `Template: ` : null,
								Projects.active_object == "Page" ? m("select", {
										class: "bg-white-80 ba br2 mr4",
										onchange: function() {
											Mainbar.template = this.value
											Mainbar.save()

											if (Projects.active_object == "Page") {
												PageEditor.template = this.value
											}
										}
									},
									m('option', {
											value: ''
										},
										"Unset"
									),
									Projects.list_templates(Projects.project_id).map(function(data) {
										return m('option', {
													value: data.template_id
												},
												data['name']
											)
										}
									)
								) : null,
								m("label", [
										m('input', {
											type: "checkbox",
											onchange: function() {
												if (this.checked)
													Projects.set_default();
												else
													Projects.reset_default();
											}
										}),
										" Set default"
									])
							]
						),
						m("div", [
							m("button", {
								class:"mh2",
								onclick: function() {
									Mainbar.save()
								}}, 
									"Save"
							),
							m("button", {
								class:"mh2",
								onclick: function() {
									m.request({
									    method: "GET",
									    url: "/export",
									    params: {project_id: Projects.project_id, project: JSON.stringify(Projects.project)},
									    // body: {name: "test"}
									})
									.then(function(result) {
									    console.log(result)
									})

								}
							}, "Export")
							])
				])
	}
}

export default Mainbar