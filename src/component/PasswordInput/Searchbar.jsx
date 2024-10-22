import React, { useEffect, useState } from 'react';
import search2 from "../../assets/search2.png";
import search from "../../assets/search.png";
import logout from "../../assets/logout.svg";

const SearchBar = ({ onSearch, isMobile }) => {
  const [searchText, setSearchText] = useState('');
  const [inputWidth, setInputWidth] = useState(window.innerWidth <= 480 ? 100 : 300);
  useEffect(() => {
    const handleResize = () => {
      setInputWidth(window.innerWidth <= 480 ? 100 : 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const value = e.target.value;

    // setSearchText(value);
    onSearch(value);
  };
  // min-w-[100px] sm:w-[100px] md:w-[100px] lg:w-[300px] 
  // console.log(inputWidth);

  return (
    <div className={`flex items-center gap-3 h-[40px]  border border-[#CAC4D0] rounded-md  -mt-2
      sm:w-[120px] md:w-[300px] w-[120px]   
    
    ` }>
      {inputWidth >= 300 && (
        <img src={search2} alt="logo" className="w-4 h-4 ml-2  " />
      )}
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        className=" 
        w-full
         h-full py-2  border-none rounded-md focus:outline-none placeholder-gray-400"
        placeholder="Search.."
      />
    </div>


  );
};


export default SearchBar;
