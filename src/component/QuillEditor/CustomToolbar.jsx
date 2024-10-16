import React from "react";
import formats from './ToolbarOptions.js';

const renderOptions = (formatData) => {
  const { className, options } = formatData;
  return (
    <select className={className} key={className}>
      {options.map((value, index) => (
        <option value={value} key={index}></option>
      ))}
    </select>
  );
};

const renderSingle = (formatData) => {
  const { className, value } = formatData;
  return (
    <button className={className} value={value} key={className}></button>
  );
};

const CustomToolbar = () => (
  <div id="toolbar">
    {
      formats.map((classes, index) => (
        <span className="ql-formats" key={index}>
          {
            classes.map((formatData, subIndex) => (
              formatData.options ? renderOptions(formatData) : renderSingle(formatData)
            ))
          }
        </span>
      ))
    }
  </div>
);

export default CustomToolbar;



// import React from "react";
// import formats from './ToolbarOptions.js'

// const renderOptions = (formatData)=>{
//     const {className,options} = formatData;
//     return (
//         <select className = {className}>
//             <option selected="selected"></option>
//             {
//                 options.map(value =>{
//                     return (
//                         <option value={value}></option>
//                     )
//                 })
//             }
//         </select>
//     )
// }
// const renderSingle = (formatData)=>{
//     const {className,value} = formatData;
//     return (
//         <button className = {className} value = {value}></button>
//     )
// }
// const CustomToolbar = () => (
//     <div id="toolbar">
//         {
//             formats.map(classes => {
//                 return (
//                     <span className = "ql-formats">
//                         {
//                             classes.map(formatData => {
//                                 return formatData.options?renderOptions(formatData):renderSingle(formatData)
//                             })
//                         }
//                     </span>
//                 )
//             })
//         }
//     </div>
//   )
//   export default CustomToolbar;