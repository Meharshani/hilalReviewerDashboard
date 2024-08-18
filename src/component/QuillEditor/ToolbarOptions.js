const colors = [
    "#000000", "#e60000", "#ff9900", "#ffff00", 
    "#008a00", "#0066cc", "#9933ff", "#ffffff",
    "#facccc", "#ffebcc", "#ffffcc", "#cce8cc",
    "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666",
    "#ffc266", "#ffff66", "#66b966", "#66a3e0",
    "#c285ff", "#888888", "#a10000", "#b26b00",
    "#b2b200", "#006100", "#0047b2", "#6b24b2"
  ];
  
  const formats = [
    [
      {
        className: "ql-font",
        options: ['serif', 'monospace']
      },
      {
        className: "ql-size",
        options: ["small", "large", "huge"]
      }
    ],
    [
      { className: "ql-bold" }, { className: "ql-italic" }, { className: "ql-underline" }, { className: "ql-strike" }
    ],
    [
      {
        className: "ql-color",
        options: colors
      },
      {
        className: "ql-background",
        options: colors
      }
    ],
    [
      {
        className: "ql-script",
        value: "sub"
      },
      {
        className: "ql-script",
        value: "super"
      }
    ],
    [
      {
        className: "ql-header",
        options: ["1", "2", "3"]
      },
      {
        className: "ql-blockquote"
      },
      {
        className: "ql-code-block"
      }
    ],
    [
      {
        className: "ql-list",
        value: "ordered"
      },
      {
        className: "ql-list",
        value: "bullet"
      },
      {
        className: "ql-indent",
        value: "-1"
      },
      {
        className: "ql-indent",
        value: "+1"
      }
    ],
    [
      {
        className: 'ql-direction',
        value: 'rtl'
      },
      {
        className: 'ql-align',
        options: ['right', 'center', 'justify']
      }
    ],
    [
      { className: 'ql-link' }, { className: 'ql-image' }, { className: 'ql-video' }, { className: 'ql-formula' }
    ],
  ];
  
  export default formats;
  