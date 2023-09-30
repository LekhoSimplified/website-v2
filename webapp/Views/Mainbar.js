import Projects from '../Models/Projects.js';

import DOMEditor from './DOMEditor.js';

var Mainbar = {
	name: null,
	template: null,

	save: function() {
		let obj = Projects.getActiveObject()

		obj.name = Mainbar.name
		obj.template = Mainbar.template
		obj.view = DOMEditor.getJSON()
		Projects.saveActiveObject(obj);
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
										onblur: function() {
											Mainbar.template = this.value
											Mainbar.save()
										}
									},
									Projects.list_templates(Projects.project_id).map(function(data) {
										return m('option', {
													value: data.template_id
												},
												data['name']
											)
										}
									)
								) : null,
								Projects.active_object == "Page" ? m("label", [
										m('input', {
											type: "checkbox"
										}),
										" Set default"
									]) : null
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
									    params: {project: JSON.stringify(Projects.project)},
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