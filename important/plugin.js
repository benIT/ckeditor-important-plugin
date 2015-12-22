/*
 This plugin allows to wrap into a <span class="className"> the selected text.
 If the selected text has already been wrapped, the span is removed.
 Copyright (c) benoit.works@gmail.com
 For licensing, see LICENSE.md or http://ckeditor.com/license
 */
CKEDITOR.plugins.add('important', {
    //trick to get a 16*16 icon : http://www.favicomatic.com
    icons: 'important',
    init: function (editor) {
        var className = 'important';
        editor.addCommand('important', {
            // Define the function that will be fired when the command is executed.
            exec: function (editor) {
                var editorSelection = editor.getSelection();
                var selected_text = editorSelection.getSelectedText();
                var startElement = editorSelection.getStartElement();

                //if the element has already been wrapped, let's UNwrap it
                if (className === startElement.$.className) {
                    var html = startElement.$.innerHTML;
                    editor.getSelection().getStartElement().remove();
                    editor.insertHtml(html);
                } else {
                    //if the element has NOT already been wrapped, let's wrap it
                    var newElement = new CKEDITOR.dom.element("span");
                    newElement.setAttributes({class: 'important'});
                    newElement.setText(selected_text);
                    editor.insertElement(newElement);
                }
            }
        });

        // Create the toolbar button that executes the above command.
        editor.ui.addButton('important', {
            label: 'Set this as important',
            command: 'important',
            toolbar: 'insert'
        });
    }
});