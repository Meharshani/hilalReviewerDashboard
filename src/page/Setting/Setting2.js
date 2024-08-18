
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Setting() {
    const [selected, setSelected] = useState('Settings');
    const [SelectedSetting, setSelectedSetting] = useState('Settings');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const currentPath = window.location.pathname;
    //   console.log(currentPath);
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar></SideBar>
            {/* Main Content */}

            <div className="flex-1  overflow-y-auto  ">
                <div className="p-6 bg-white rounded-3xl m-10 h-[610px]">
                    <div className="items-center">
                        <h1 className="text-2xl font-bold">Settings</h1
                        >
                        <Link to="/settings/editpage" className="flex items-center gap-3 mt-5 text-black font-semibold rounded-md hover:bg-purple-100 transition"
                        // onClick={() => screenselect('editpage')}

                        >
                            <img src={editicon} alt="Alert icon" className="w-5 h-5" />
                            <span>Edit Profile</span>
                        </Link>
                        <Link to="/settings/changepassword" className="flex items-center gap-3 mt-5 text-black font-semibold rounded-md hover:bg-purple-100 transition">
                            <img src={lock} alt="Alert icon" className="w-5 h-5" />
                            <span>Change Password</span>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Setting;
