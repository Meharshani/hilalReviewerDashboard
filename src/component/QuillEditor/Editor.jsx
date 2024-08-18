import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';

const Editor = ({ editMode }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('editMode:', editMode); // Check if the editMode prop is received correctly
  }, [editMode]);

  const handleChange = (html) => {
    setText(html);
  };

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  const formats = [
    'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'header', 'blockquote', 'code-block',
    'indent', 'list',
    'direction', 'align',
    'link', 'image', 'video', 'formula',
  ];

  return (
    <>
      {editMode ? (
        <>
          <CustomToolbar />
          <ReactQuill
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{
            padding: '10px',
          }}
        />
      )}
    </>
  );
};

export default Editor;
