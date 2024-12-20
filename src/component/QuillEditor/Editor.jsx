import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './CustomToolbar';
import { marked } from 'marked'; // To convert Markdown to HTML
import TurndownService from 'turndown'; // To convert HTML back to Markdown
const Diff = require('diff');

const Editor = ({ editMode, reportdata, setMarkdown }) => {
  const [text, setText] = useState(''); // State to hold the HTML content in the editor
  const [curretmarkdown, setcurretmarkdown] = useState(''); // State to hold the current markdown content

  // Convert the fetched markdown report to HTML when report data is loaded
  useEffect(() => {
    // console.log(reportdata);
    
    if (reportdata?.report) {
      const initialHtml = marked(reportdata.report); // Convert Markdown to HTML
      setText(initialHtml); // Set the converted HTML in the editor
      setcurretmarkdown(reportdata.report); // Set the initial markdown report
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
    setcurretmarkdown(markdownContent); // Update the current markdown
  };

  // Quill toolbar and formats setup
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
  function compareReports(originalReport, editedReport) {
    // Check if inputs are strings and are defined
    if (typeof originalReport !== 'string' || typeof editedReport !== 'string') {
      return ''; // Return empty if the input is invalid
    }
  
    const diff = Diff.diffWords(originalReport, editedReport);
  
    let result = '';
  
    diff.forEach(part => {
      if (part.added) {
        // GitHub-style for added text (green background, + sign)
        result += `<span style="display: block; background-color: #e6ffed; color: #22863a; padding: 0.2em 0.4em;">+${part.value}</span>`;
      } else if (part.removed) {
        // GitHub-style for removed text (red background, - sign)
        result += `<span style="display: block; background-color: #ffeef0; color: #cb2431; padding: 0.2em 0.4em;">-${part.value}</span>`;
      } else {
        // Unchanged text remains the same (no highlight)
        result += `<span style="display: block; padding: 0.2em 0.4em;">${part.value}</span>`;
      }
    });
  
    return result;
  }
  
  
  // Function to compare original and edited reports and highlight changes
  // orignal
  // function compareReports(originalReport, editedReport) {
  //   // Check if inputs are strings and are defined
  //   if (typeof originalReport !== 'string' || typeof editedReport !== 'string') {
  //     return ''; // Return empty if the input is invalid
  //   }

  //   const diff = Diff.diffWords(originalReport, editedReport);

  //   let result = '';

  //   diff.forEach(part => {
  //     if (part.added) {
  //       result += `<span style="color: green;">${part.value}</span>`;
  //     } else if (part.removed) {
  //       result += `<span style="color: red;">${part.value}</span>`;
  //     } else {
  //       result += part.value;
  //     }
  //   });

  //   return result;
  // }

  // Compare the reports and get the highlighted diff
  const comparedResult = compareReports(reportdata?.report, curretmarkdown);

  // Convert the compared result (which contains HTML diff) to actual HTML for rendering
  const markdownTextArrayhtml = marked(comparedResult);

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
          dangerouslySetInnerHTML={{ __html: markdownTextArrayhtml }}
          style={{ padding: '10px' }}
        />
      )}
    </>
  );
};

export default Editor;
