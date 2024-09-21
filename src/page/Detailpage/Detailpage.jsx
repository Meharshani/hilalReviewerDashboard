
import React, { useState } from 'react';
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
import Searchbar from "../../component/PasswordInput/Searchbar";
import SideBar from "../../component/Setting/SideBar";
import Editpage from "../EditPage/Editpage";
import TextEditor from '../../component/TextEditor/TextEditor';
import Editor2 from '../../component/QuillEditor/Editor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Detailpage() {
  const [selected, setSelected] = useState('Settings');
  const [SelectedSetting, setSelectedSetting] = useState('Settings');
  const [searchText, setSearchText] = useState('');
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  //   console.log(currentPath);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  // console.log(editMode);
  const handleToggle = () => {
    setEditMode(!editMode);
  };
 
  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous screen
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar></SideBar>
      {/* Main Content */}

      <div className="flex-1  overflow-y-auto  ">
        <div className="p-6 bg-white rounded-3xl m-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Detailpage</h1>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center space-x-2 text-[#79747E] hover:bg-gray-100 rounded-md p-2 transition duration-300"
              // onClick={() => handleView(report)}
              >
                <img src={bell} alt="notification" className=" h-7 " />
              </button>
              <Searchbar />

            </div>
          </div>
          <div className="flex items-center justify-end py-4 gap-2">
            <label className="text-gray-700 flex items-center gap-2">
              Edit
              <Switch
                checked={editMode}
                onChange={handleToggle}
                onColor="#4c51bf"
                offColor="#e2e8f0"
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={16}
                height={20}
                width={40}
              />
            </label>
            <button className="bg-green-100 text-green-600 font-semibold py-1 px-4 rounded-md hover:bg-green-200 transition">
              Save Changes
            </button>
            <button className="bg-red-100 text-red-600 font-semibold py-1 px-4 rounded-md hover:bg-red-200 transition"
                  onClick={handleGoBack}

            >
              Close
            </button>
            <button className="bg-purple-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-purple-700 transition">
              Submit Report
            </button>
          </div>
          <div>
            {/* <TextEditor editMode={editMode} /> */}
            <Editor2 editMode={editMode} />
           </div>

        </div>

      </div>

    </div>
  );
}

export default Detailpage;
