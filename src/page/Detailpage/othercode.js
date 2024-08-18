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

const TextEditor = () => {
  const [value, setValue] = useState('');
  const [editMode, setEditMode] = useState(true);

  const handleSave = () => {
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

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
              [{ header: '1' }, { header: '2' }],
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
      {editMode ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
    </div>
  );
};

export default TextEditor;
