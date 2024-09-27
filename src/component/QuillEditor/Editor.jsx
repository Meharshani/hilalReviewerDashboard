import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';
import { marked } from 'marked'; // To convert Markdown to HTML
import TurndownService from 'turndown'; // To convert HTML back to Markdown

const Editor = ({ editMode, reportdata, setMarkdown }) => {
  const [text, setText] = useState(''); // State to hold the HTML content in the editor

  // Convert the fetched markdown report to HTML when report data is loaded
  useEffect(() => {
    if (reportdata?.report) {
      const initialHtml = marked(reportdata.report); // Convert Markdown to HTML
      setText(initialHtml); // Set the converted HTML in the editor
    }
  }, [reportdata]);

  // Handle changes in the editor, capturing the HTML content
  const handleChange = (html) => {
    setText(html); // Update the editor's HTML content
    convertHtmlToMarkdown(html); // Convert HTML back to Markdown
  };

  // Convert HTML to Markdown for saving to backend
  const convertHtmlToMarkdown = (htmlContent) => {
    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(htmlContent);
    setMarkdown(markdownContent); // Pass the markdown back to the parent component
  };

  const modules = {
    toolbar: {
      container: "#toolbar", // Custom toolbar for the editor
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
            value={text} // Set the editor content to the HTML version of the report
            theme="snow"
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </>
      ) : (
        // Display the HTML content when not in edit mode
        <div
          dangerouslySetInnerHTML={{ __html: text }}
          style={{ padding: '10px' }}
        />
      )}
    </>
  );
};

export default Editor;
