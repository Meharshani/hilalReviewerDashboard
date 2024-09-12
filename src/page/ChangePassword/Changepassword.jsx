import React, { useState } from 'react';
import imglOGO from "../../assets/header11.png";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { useNavigate } from 'react-router-dom';
import ChangePasswordComponent from "../../component/Setting/ChangePassword";
import SideBar from "../../component/Setting/SideBar";

function Changepassword() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar></SideBar>
            {/* Main Content */}

            <div className="flex-1  overflow-y-auto  ">
 
                <div className="p-6 bg-white rounded-3xl m-10 h-[610px]">
                    <ChangePasswordComponent />
                </div>

            </div>

        </div>
    );
}

export default Changepassword;
