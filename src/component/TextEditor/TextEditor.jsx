import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Define the custom module
class CustomModule {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
  }

  // Add any custom functionality here
}

// Register the custom module
ReactQuill.Quill.register('modules/customModule', CustomModule);

const TextEditor = ({ editMode }) => {
  const [value, setValue] = useState('');

  // Custom icons for the toolbar
  const customIcons = {
    'header-1': '<svg viewBox="0 0 18 18"> <text x="4" y="15" font-size="18" font-family="Arial, Helvetica, sans-serif">H1</text> </svg>',
    'header-2': '<svg viewBox="0 0 18 18"> <text x="4" y="15" font-size="18" font-family="Arial, Helvetica, sans-serif">H2</text> </svg>',
    'header-3': '<svg viewBox="0 0 18 18"> <text x="4" y="15" font-size="18" font-family="Arial, Helvetica, sans-serif">H3</text> </svg>',
  };

  // Register the custom icons
  Object.keys(customIcons).forEach((iconName) => {
    ReactQuill.Quill.import('ui/icons')[iconName] = customIcons[iconName];
  });

  return (
    <div>
      {editMode ? (
        <ReactQuill
          value={value}
          onChange={(value) => setValue(value)}
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [
                { header: '1', attributes: { 'class': 'ql-header-1' } },
                { header: '2', attributes: { 'class': 'ql-header-2' } },
                // { header: '3', attributes: { 'class': 'ql-header-3' } },
              ],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              ['link', 'image'],
              [{ 'color': [] }, { 'background': [] }], // Dropdown with defaults from theme
              [{ 'align': [] }],
              ['clean'],
            ],
            customModule: {}, // Register the custom module
          }}
          formats={[
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'blockquote',
            'code-block',
            'list',
            'bullet',
            'script',
            'link',
            'image',
            'color',
            'background',
            'align',
          ]}
          placeholder="Type something..."
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: value }}
          style={{
            padding: '10px',
          }}
        />
      )}
    </div>
  );
};

export default TextEditor;
