import Projects from '../../../Models/Projects.js';


var ArticleEditor = {
	main_node: null,
	editor: null,

	appendChild: function(node) {
		//DOMEditor.ls_selected.appendChild(node);
	},
	getJSON: function() {
		return {}; //Main2JSON(DOMEditor.main_node)
	},
	oncreate: function(vnode) {
		ArticleEditor.main_node = vnode.dom

		let obj = Projects.getActiveObject()

		let data = {}
		if (obj.hasOwnProperty('page')) {
			data = obj.page
		}

	    /**
	     * To initialize the Editor, create a new instance with configuration object
	     * @see docs/installation.md for mode details
	     */
	    ArticleEditor.editor = new EditorJS({
	      /**
	       * Enable/Disable the read only mode
	       */
	      readOnly: false,

	      /**
	       * Wrapper of Editor
	       */
	      holder: 'editor-container',

	      /**
	       * Common Inline Toolbar settings
	       * - if true (or not specified), the order from 'tool' property will be used
	       * - if an array of tool names, this order will be used
	       */
	      // inlineToolbar: ['link', 'marker', 'bold', 'italic'],
	      // inlineToolbar: true,

	      /**
	       * Tools list
	       */
	      tools: {
	        /**
	         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
	         */
	        header: {
	          class: Header,
	          inlineToolbar: ['marker', 'link'],
	          config: {
	            placeholder: 'Header'
	          },
	          shortcut: 'CMD+SHIFT+H'
	        },

	        /**
	         * Or pass class directly without any configuration
	         */
	        // image: SimpleImage,

	        list: {
	          class: List,
	          inlineToolbar: true,
	          shortcut: 'CMD+SHIFT+L'
	        },

	        // checklist: {
	        //   class: Checklist,
	        //   inlineToolbar: true,
	        // },

	        // quote: {
	        //   class: Quote,
	        //   inlineToolbar: true,
	        //   config: {
	        //     quotePlaceholder: 'Enter a quote',
	        //     captionPlaceholder: 'Quote\'s author',
	        //   },
	        //   shortcut: 'CMD+SHIFT+O'
	        // },

	        // warning: Warning,

	        marker: {
	          class:  Marker,
	          shortcut: 'CMD+SHIFT+M'
	        },

	        // code: {
	        //   class:  CodeTool,
	        //   shortcut: 'CMD+SHIFT+C'
	        // },

	        // delimiter: Delimiter,

	        inlineCode: {
	          class: InlineCode,
	          shortcut: 'CMD+SHIFT+C'
	        },

	        // linkTool: LinkTool,

	        // embed: Embed,

	        // table: {
	        //   class: Table,
	        //   inlineToolbar: true,
	        //   shortcut: 'CMD+ALT+T'
	        // },

	      },

	      /**
	       * This Tool will be used as default
	       */
	      // defaultBlock: 'paragraph',

	      /**
	       * Initial Editor data
	       */
	      data: data,
	      onReady: function(){
	        // saveButton.click();
	      },
	      onChange: function(api, event) {
	        console.log('something changed', event);
	      }
	    });
	},
	view: function() {
		return m("div", {"id":"editor-container", "class": "flex-auto flex flex-column overflow-y-auto"})
	}
}

export default ArticleEditor
