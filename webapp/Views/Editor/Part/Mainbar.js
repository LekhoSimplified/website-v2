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

		if (Projects.active_object == "Page") {
			ArticleEditor.editor.save()
		        .then((savedData) => {
		        	// console.log(JSON.stringify(savedData))
		        	obj.page = savedData
					Projects.saveActiveObject(obj);
		        })
		        .catch((error) => {
		          console.error('Saving error', error);
		        });
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
										class: "bg-white-80 input-reset ba br2 mr3",
										value: Mainbar.name,
										placeholder: `${Projects.active_object} name`,
										onblur: function() {
											Mainbar.name = this.value
											Mainbar.save()
										},
										pattern: '/^[\w_]+$/',
										required: true
									}
								),

								Projects.active_object == "Page" ? `Set Template: ` : null,
								Projects.active_object == "Page" ? m("select", {
										class: "bg-white-80 ba br2 mr3",
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
											if (data.template_id == Projects.page.template) {
												return m('option', {
														value: data.template_id,
														selected: "selected"
													},
													data['name']
												)
											}
											else {
												return m('option', {
														value: data.template_id
													},
													data['name']
												)
											}
										}
										
									)
								) : null,
								Projects.active_object == "Page" ? m("label", {
										class: "mr3"
									},[
										m('input', {
											type: "checkbox",
											checked: Projects.page ? Projects.page.default : false,
											onchange: function() {
												if (this.checked)
													Projects.set_default();
												else
													Projects.reset_default();
											}
										}),
										" Set default"
									]) : null,
								m("button", {
									class:"mh2",
									onclick: function() {
										Mainbar.save()
									}}, 
										"Save"
								)
							]
						),
						m("div", [
							m("button", {
									class:"mh2",
									onclick: function() {
										fetch("/export", {
											method: 'POST',
											  headers: {
											    'Content-Type': 'application/json'
											  },
											  body: JSON.stringify({
											  	project_id: Projects.project_id,
											  	project: JSON.stringify(Projects.project)
											  }),
											  cache: 'no-store'
										}).then(function() {
											// alert("Export successful")
										})

									}
								}, "Export"),
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
								}, "Download"),
						])
				])
	}
}

export default Mainbar