import React, { useState } from 'react';
import search2 from "../../assets/search2.png";
import search from "../../assets/search.png";
import logout from "../../assets/logout.svg";

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 w-[300px] h-[40px] bg-white border border-[#CAC4D0] rounded-md">
      <img src={search2} alt="logo" className="w-4 h-4 ml-2" />
      <input
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        className="flex-1 h-full  py-2 border-none rounded-md focus:outline-none"
        placeholder="Search..."
      />
      <button className="h-full  text-gray-600 hover:text-gray-800 focus:outline-none">

      </button>
    </div>
  );
};


export default SearchBar;
