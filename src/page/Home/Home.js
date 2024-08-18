
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom





const Dashboard = () => {
  const [selected, setSelected] = useState('Home');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  console.log(currentPath);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const gradientStyle = {
    background: 'linear-gradient(95.15deg, #7147B4 0%, #423CAC 112.53%)',
    color: 'white'
  };

  const svgIconStyle = (isSelected) => ({
    fill: isSelected ? 'white' : 'black',
  });

  const reportData = [
    { name: 'not', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'In Progress', statusColor: 'text-yellow-500', symbol: 'bitcin', image: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg' },
    { name: 'ETH', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'In Progress', statusColor: 'text-yellow-500', symbol: 'bitcin', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxhrliIkY36R1SxpiIjIJvtRz8P1Y7vnLEg&s' },
    { name: 'USDT', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'Pending', statusColor: 'text-red-500', symbol: 'bitcoin', image: btc },
    { name: 'BNB', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'Pending', statusColor: 'text-red-500', symbol: 'bitcoin', image: btc },
    { name: 'SOL', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
    { name: 'XRP', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
    { name: 'USDC', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
  ];
  const handleView = (report) => {

  }

  const editscreen = (report) => {
    navigate('/editpage');

  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        {/* <div className="flex items-center justify-start h-16">
          <img src={imglOGO} alt="logo" className="h-[35px] ml-5 mt-10" />
        </div> */}
        <SideBar></SideBar>

        {/* <nav className="mt-8">
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
            to="/logout" // Define the path for the route
            className={`flex items-center h-12 rounded-lg px-4 py-2 m-5 ${selected === 'Logout' ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' : 'hover:bg-purple-100'
              }`}
            onClick={() => setSelected('Logout')}
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
        </nav> */}
      </div>
     
      {/* Main Content */}
      <div className="flex-1  overflow-y-auto  ">
        {
          selected === 'Home' && (
            <div className="flex-1 p-6  bg-white rounded-3xl	  m-10 	">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Home</h1>
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
              {/* <h1 className="text-2xl font-bold">Home</h1> */}

              {/* Status Cards */}
              <div className="grid grid-cols-4 gap-6 my-6">
                <div className="px-3 pb-1 bg-[#FEF4E8] rounded-lg border-[#FDDEB8] border">
                  <h2 className="text-yellow-500 font-semibold py-2">In Progress</h2>
                  <p className="text-2xl font-semibold">250</p>
                </div>
                <div className="px-3 pb-1 rounded-lg border border-[#F0B0B0] bg-[#FAE6E6]">
                  <h2 className="text-red-500 py-2 font-semibold ">Pending Reports</h2>
                  <p className="text-2xl font-semibold ">300</p>
                </div>
                <div className="px-3 pb-1 bg-[#E6F4E9] border border-[#B3DBBC] rounded-lg">
                  <h2 className="text-green-500 py-2 font-semibold">Completed</h2>
                  <p className="text-2xl font-semibold">700</p>
                </div>
                <div className="px-3 pb-1 bg-[#F1EDF8] border border-[#D3C6E8] rounded-lg">
                  <h2 className="text-purple-500 py-2 font-semibold">Total Reports</h2>
                  <p className="text-2xl font-semibold">1000</p>
                </div>
              </div>

              {/* Reports Table */}
              <div className="bg-white rounded-xl shadow-md">
                <div > {/* Adjust height as needed */}
                  <table className="min-w-full border-black rounded-xl">
                    <thead className="bg-[#E9E9E9] text-[#79747E] text-sm h-10">
                      <tr className="rounded-xl">
                        <th className="py-2 px-3 border-b text-left first:rounded-tl-xl last:rounded-tr-xl">Name</th>
                        <th className="py-2 px-3 border-b text-left">Submission</th>
                        <th className="py-2 px-3 border-b text-left">Completion</th>
                        <th className="py-2 px-3 border-b text-left">Status</th>
                        <th className="py-2 px-3 border-b text-left last:rounded-tr-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#000]">
                      {reportData?.map((report, index) => (
                        <tr key={index} className="h-20">
                          <td className="py-2 px-3 border-b text-left flex items-center gap-2 h-20">
                            <img src={report?.image} alt={report.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <div className="font-medium text-sm">{report.name}</div>
                              <div className="text-sm text-gray-500">{report?.symbol}</div>
                            </div>
                          </td>
                          <td className="py-2 px-3 border-b text-left items-center gap-2">
                            <div>
                              <div className="font-medium text-sm">{report.submission}</div>
                              <div className="text-sm text-gray-500">{report?.time}</div>
                            </div>
                          </td>
                          <td className="py-2 px-3 border-b text-left">{report.completion}</td>
                          <td className={`py-2 px-3 border-b text-left ${report.statusColor}`}>{report.status}</td>
                          <td className="py-2 px-1 border-b text-left">
                            <Link
                            to="/home/Detailpage"
                              className="flex items-center space-x-2 text-[#79747E] hover:bg-gray-100 rounded-md p-2 transition duration-300"
                              // onClick={() => handleView(report)}
                            >
                              <img src={eye} alt={report.name} className="w-5 h-4 rounded-full" />
                              <span className="hover:text-blue-700">View</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        }
        {
          selected === 'Settings' && (
            <div className="p-6 bg-white rounded-3xl m-10 h-[610px]">
              <div className="items-center">
                <h1 className="text-2xl font-bold">Settings</h1
                >
                <button className="flex items-center gap-3 mt-5 text-black font-semibold rounded-md hover:bg-purple-100 transition"
                  onClick={() => editscreen()}

                >
                  <img src={editicon} alt="Alert icon" className="w-5 h-5" />
                  <span>Edit Profile</span>
                </button>
                <button className="flex items-center gap-3 mt-5 text-black font-semibold rounded-md hover:bg-purple-100 transition">
                  <img src={lock} alt="Alert icon" className="w-5 h-5" />
                  <span>Change Password</span>
                </button>
              </div>
            </div>
          )
        }


      </div>
    </div>
  );
};

export default Dashboard;