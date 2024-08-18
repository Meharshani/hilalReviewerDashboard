// Sidebar.js
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import imglOGO from "../../assets/header11.png";
import robo from "../../assets/robo.png";
import homeicon from "../../assets/homeicon1.svg";
import logouticon from "../../assets/logout.svg";
import bell from "../../assets/bell.svg";
import settingsicon from "../../assets/settingicon.svg";
import btc from "../../assets/btc.png";
import eye from "../../assets/eye.png";
import notification from "../../assets/notification.png";
import editicon from "../../assets/editicon.svg";
import lock from "../../assets/lock.svg";
const SideBar = () => {
  const location = useLocation();
  const [selected, setSelected] = React.useState(getSelected(location?.pathname));

  function getSelected(pathname) {
    if (pathname.includes('home')) return 'Home';
    if (pathname.includes('settings')) return 'Settings';
    if (pathname.includes('logout')) return 'Logout';
    return '';
  }

  React.useEffect(() => {
    setSelected(getSelected(location.pathname));
  }, [location.pathname]);
  const svgIconStyle = (isSelected) => ({
    fill: isSelected ? 'white' : 'black',
  });
  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-start h-16">
        <img src={imglOGO} alt="logo" className="h-[35px] ml-5 mt-10" />
      </div>
      <nav className="mt-8">
        <Link
          to="/home" // Define the path for the route
          className={`flex items-center h-12 rounded-lg px-4 py-2 m-5 ${selected === 'Home' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' : 'hover:bg-purple-100'
            }`}
          onClick={() => setSelected('Home')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            style={svgIconStyle(selected === 'Home')}
            className="mr-4"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="font-medium">Home</span>
        </Link>
        <Link
          to="/settings" // Define the path for the route
          className={`flex items-center h-12 rounded-lg px-4 py-2 m-5 ${selected === 'Settings' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' : 'hover:bg-purple-100'
            }`}
          onClick={() => setSelected('Settings')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            style={svgIconStyle(selected === 'Settings')}
            className="mr-4"
          >
            <path d="M19.14 12.94a7.64 7.64 0 000-1.88l2.1-1.65a.5.5 0 00.11-.54l-2-3.46a.5.5 0 00-.61-.23l-2.49 1a7.72 7.72 0 00-1.69-.98L14.5 2.67a.5.5 0 00-.5-.42h-4a.5.5 0 00-.5.42l-.38 2.61a7.72 7.72 0 00-1.69.98l-2.49-1a.5.5 0 00-.61.23l-2 3.46a.5.5 0 00.11.54l2.1 1.65a7.64 7.64 0 000 1.88L2.86 14.6a.5.5 0 00-.11.54l2 3.46a.5.5 0 00.61.23l2.49-1a7.72 7.72 0 001.69.98l.38 2.61a.5.5 0 00.5.42h4a.5.5 0 00.5-.42l.38-2.61a7.72 7.72 0 001.69-.98l2.49 1a.5.5 0 00.61-.23l2-3.46a.5.5 0 00-.11-.54l-2.1-1.65zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
          </svg>
          <span className="font-medium">Settings</span>
        </Link>
        <Link
          to="/" // Define the path for the route
          className={`flex items-center h-12 rounded-lg px-4 py-2 m-5 ${selected === 'Logout' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' : 'hover:bg-purple-100'
            }`}
          // onClick={() => setSelected('Logout')}/
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="18"
            height="18"
            style={svgIconStyle(selected === 'Logout')}
            className="mr-4"
          >
            <path d="M16 13v-2H7V7l-5 5 5 5v-4zM20 3h-8v2h8v14h-8v2h8a2 2 0 002-2V5a2 2 0 00-2-2z" />
          </svg>
          <span className="font-medium">Log out</span>
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
