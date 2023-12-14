import Projects from '../../../Models/Projects.js';


var ArticleEditor = {
	main_node: null,
	quill: null,

	appendChild: function(node) {
		//DOMEditor.ls_selected.appendChild(node);
	},
	getJSON: function() {
		return {}; //Main2JSON(DOMEditor.main_node)
	},
	oncreate: function(vnode) {
		ArticleEditor.main_node = vnode.dom

		var BackgroundClass = Quill.import('attributors/class/background');
		var ColorClass = Quill.import('attributors/class/color');
		var SizeStyle = Quill.import('attributors/style/size');
		Quill.register(BackgroundClass, true);
		Quill.register(ColorClass, true);
		Quill.register(SizeStyle, true);

		ArticleEditor.quill = new Quill('#editor-container', {
			modules: {
				syntax: true,
				toolbar: '#toolbar-container'
			},
			placeholder: 'Compose an epic...',
			theme: 'snow'
		});
	},
	view: function() {
		return m("div", {"id":"quilljs-container", "class": "flex-auto flex flex-column"},
				  [
				    m("div", {"id":"toolbar-container"},
				      [

				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-header","value":"1"}),
				            m("button", {"class":"ql-header","value":"2"})
			              ]
			            )
				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-bold"}),
				            m("button", {"class":"ql-italic"}),
				            m("button", {"class":"ql-underline"}),
				            m("button", {"class":"ql-strike"})
				          ]
				        ),
				        m("span", {"class":"ql-formats"},
				          [
				            m("select", {"class":"ql-color"},
							  [
							    m("option", {"selected":"selected"}),
							    m("option", {"value":"red"}),
							    m("option", {"value":"orange"}),
							    m("option", {"value":"yellow"}),
							    m("option", {"value":"green"}),
							    m("option", {"value":"blue"}),
							    m("option", {"value":"purple"})
							  ]
							),
				            m("select", {"class":"ql-background"},
						      [
						        m("option", {"selected":"selected"}),
						        m("option", {"value":"red"}),
						        m("option", {"value":"orange"}),
						        m("option", {"value":"yellow"}),
						        m("option", {"value":"green"}),
						        m("option", {"value":"blue"}),
						        m("option", {"value":"purple"})
						      ]
						    )
				          ]
				        ),
				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-script","value":"sub"}),
				            m("button", {"class":"ql-script","value":"super"})
				          ]
				        ),
				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-blockquote"}),
				            m("button", {"class":"ql-code-block"})
				          ]
				        ),
				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-list","value":"ordered"}),
				            m("button", {"class":"ql-list","value":"bullet"}),
				            m("button", {"class":"ql-indent","value":"-1"}),
				            m("button", {"class":"ql-indent","value":"+1"})
				          ]
				        ),
				        m("span", {"class":"ql-formats"},
				          [
				            m("button", {"class":"ql-direction","value":"rtl"}),
				            m("select", {"class":"ql-align"})
				          ]
				        ),
				        // m("span", {"class":"ql-formats"},
				        //   [
				        //     m("button", {"class":"ql-link"}),
				        //     m("button", {"class":"ql-image"}),
				        //     m("button", {"class":"ql-video"}),
				        //     m("button", {"class":"ql-formula"})
				        //   ]
				        // ),
				        m("span", {"class":"ql-formats"}, 
				          m("button", {"class":"ql-clean"})
				        )
				      ]
				    ),
				    m("div", {"id":"editor-container", "class": "flex-auto"})
				  ]
				)
	}
}

export default ArticleEditor
