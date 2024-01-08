import Projects from '../../../Models/Projects.js';

import DOMEditor from '../Part/DOMEditor.js';


// async function list_assets(project_id) {
//   const response = await fetch("/list_assets?project=" + project_id);
//   const files = await response.json();

//   let css = []
//   files['css'].forEach(function(file) {
//     css.push(m('option', {value: file}))
//   })
//   m.render(css_list, css)

//   let js = []
//   files['js'].forEach(function(file) {
//     js.push(m('option', {value: file}))
//   })
//   m.render(js_list, js)

  
//   let images = []
//   files['images'].forEach(function(file) {
//     images.push(m('option', {value: file}))
//   })
//   m.render(images_list, images)

  
//   let videos = []
//   files['videos'].forEach(function(file) {
//     videos.push(m('option', {value: file}))
//   })
//   m.render(videos_list, videos)

  
//   let documents = []
//   files['documents'].forEach(function(file) {
//     documents.push(m('option', {value: file}))
//   })
//   m.render(documents_list, documents)
// }   


function UploadBase64(project_id, file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
   	fetch('/upload_asset', {
		  method: 'PUT',
		  headers: {
		  //   Accept: 'application.json',
		    'Content-Type': 'application/json'
		  },
		  body: JSON.stringify({
		  	'project_id': project_id,
		  	'name': file.name,
		  	'type': file.type,
		  	'content': reader.result
		  }),
		  cache: 'no-store'
		}).then(function() {
			alert("Upload successful, please save and refresh the page to use this asset.")
		})
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

function list_assets(project_id, files) {

	// let css = []
	// files['css'].forEach(function(file) {
	// 	css.push(m('span', {'class': 'pointer hover-bg-moon-gray pa1 br2'}, file))
	// })

	// let js = []
	// files['js'].forEach(function(file) {
	// 	js.push(m('span', {'class': 'pointer hover-bg-moon-gray pa1 br2'}, file))
	// })

	let images = []
	files['images'].forEach(function(file) {
		if (file[0] != '.')
			images.push(m('span', {
					'class': 'pointer hover-bg-moon-gray pa1 br2',
					'onclick': function() {
						if (DOMEditor.ls_selected.tagName == "IMG")
							DOMEditor.setAttribute('src', `assets/${Projects.project_id}/images/${file}`)
						else
							alert("Plese select an Image in the Editor.")
					}
				}, file))
	})


	// let videos = []
	// files['videos'].forEach(function(file) {
	// 	videos.push(m('span', {'class': 'pointer hover-bg-moon-gray pa1 br2'}, file))
	// })


	let documents = []
	files['documents'].forEach(function(file) {
		if (file[0] != '.')
			documents.push(m('span', {
				'class': 'pointer hover-bg-moon-gray pa1 br2',
				'onclick': function() {
					if (DOMEditor.ls_selected.tagName == "A")
						DOMEditor.setAttribute('href', `assets/${Projects.project_id}/documents/${file}`)
					else
						alert("Please select a Link in the Editor.")
				}
			}, file))
	})

	return [
		m("div", {class: "ttu f6 mt4 pl3 mb1 pb1 bb"}, [
			"Assets",
			m("form", {"id":"asset_file_form","class": "fr mr3 bw0","method":"post","enctype":"multipart/form-data"},
			  m("label",
			  	  {'class': 'pointer'},
				  [
				    m("input", {
				    	"id": "asset_file",
				    	"type":"file",
				    	"hidden":"hidden",
				    	"onchange": function() {
				    		UploadBase64(project_id, this.files[0])
						}
					}),
				    " ⊕ "
				  ]
				)
			)
		]),

		m('DETAILS', [
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Images'
			]),
			m('DIV', {
					"class": 'pl2 bl bw2 ml1 mt1 flex flex-column'
				},
				images
			),
		]),
		m('DETAILS', [
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Documents'
			]),
			m('DIV', {
					"class": 'pl2 bl bw2 ml1 mt1 flex flex-column'
				},
				documents
			),
		]),
		m('DETAILS', [
			m('SUMMARY', {
					"class": 'pointer'
				},[
					'Pages'
			]),
			m('DIV', {
					"class": 'pl2 bl bw2 ml1 mt1 flex flex-column'
				},
				Projects.list_pages(project_id).map(function(data) {
											return m('span', {
													class: 'pointer hover-bg-moon-gray pa1 br2',
													onclick: function() {
														if (DOMEditor.ls_selected.tagName == "A")
															DOMEditor.setAttribute('href', `#!/${data['name']}`)
														else
															alert("No link selected.")
													}
												},
												data['name']
											)
										})
		
			),
		]),
		// m('DETAILS', [
		// 	m('SUMMARY', {
		// 			"class": 'pointer'
		// 		},[
		// 			'Videos'
		// 	]),
		// 	m('DIV', {
		// 			"class": 'pl2 bl bw2 ml1 flex flex-column'
		// 		},
		// 		videos
		// 	),
		// ]),
		// m('DETAILS', [
		// 	m('SUMMARY', {
		// 			"class": 'pointer'
		// 		},[
		// 			'Styles'
		// 	]),
		// 	m('DIV', {
		// 			"class": 'pl2 bl bw2 ml1 flex flex-column'
		// 		},
		// 		css
		// 	),
		// ]),
		// m('DETAILS', [
		// 	m('SUMMARY', {
		// 			"class": 'pointer'
		// 		},[
		// 			'Scripts'
		// 	]),
		// 	m('DIV', {
		// 			"class": 'pl2 bl bw2 ml1 flex flex-column'
		// 		},
		// 		js
		// 	),
		// ])
	]
}   

const Files = {
    oninit: async (vnode) => {
		let project_id = Projects.project_id

		const response = await fetch("/list_assets?project=" + project_id);
		vnode.state.files = await response.json();

        m.redraw();
    },
    oncreate: function() {
    },
    view: vnode => {

        return vnode.state.files ? list_assets(Projects.project_id, vnode.state.files) : null

    }
}

export default Files
