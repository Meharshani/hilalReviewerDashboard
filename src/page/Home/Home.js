
import React, { useEffect, useState } from 'react';
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
import moment from 'moment';
import { url } from '../../environment'
import { Oval } from 'react-loader-spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Token } from '@mui/icons-material';
const reportData = [
  { name: 'not', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'In Progress', statusColor: 'text-yellow-500', symbol: 'bitcin', image: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg' },
  { name: 'ETH', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'In Progress', statusColor: 'text-yellow-500', symbol: 'bitcin', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxhrliIkY36R1SxpiIjIJvtRz8P1Y7vnLEg&s' },
  { name: 'USDT', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'Pending', statusColor: 'text-red-500', symbol: 'bitcoin', image: btc },
  { name: 'BNB', submission: '2/11/12 ', time: '11:23 pm', completion: '-', status: 'Pending', statusColor: 'text-red-500', symbol: 'bitcoin', image: btc },
  { name: 'SOL', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
  { name: 'XRP', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
  { name: 'USDC', submission: '2/11/12 ', time: '11:23 pm', completion: '2/11/12 11:23 pm', status: 'Report Submitted', symbol: 'bitcoin', statusColor: 'text-green-500', image: btc },
];




const Dashboard = () => {
  const [selected, setSelected] = useState('Home');
  const [searchText, setSearchText] = useState('');
  const [Data, setData] = useState([]);
  const [stats, setstats] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const userData = localStorage.getItem("user_token");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('totalReports');
  const [status, setstatus] = useState('all');


  // console.log(statusType);
  useEffect(() => {
    fetchData();

  }, [selectedOption, status]);
  const fetchData = () => {
    setLoading(true)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    // Base URL
    let apiUrl = `${url}api/reviewer/report/reqs`;

    // Adjust selectedOption and status based on the given conditions
    const requestedBy = selectedOption === "totalReports" ? null : selectedOption;
    const filteredStatus = status === "all" ? null : status;

    // Build query parameters if requestedBy or filteredStatus are provided
    const queryParams = [];
    if (filteredStatus) queryParams.push(`requestedBy=${filteredStatus}`);
    if (requestedBy) queryParams.push(`status=${requestedBy}`);

    // Append query parameters to the URL if they exist
    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join('&')}`;
    }
    // console.log('apiUrl',apiUrl);

    // Fetch data with the constructed URL
    fetch(apiUrl, requestOptions)
      .then((response) => response.json()) // Assuming the API returns JSON
      .then((result) => {
        // console.log(result);
        setData(result?.body?.ODRs); // Save ODRs in state
        setFilteredData(result?.body?.ODRs); // Save filtered data
        setstats(result?.body?.stats); // Save stats in state
        setLoading(false)

      })
      .catch((error) => {
        setLoading(false)
        console.error("Error:", error)

      });
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  // Access each stat directly from the stats object
  const initialReviewCount = stats?.initial_review || 0;
  const finalReviewCount = stats?.final_approval || 0;
  const completedCount = stats?.completed || 0;
  const report_generationcount = stats?.report_generation || 0;

  // Use the total_reports property for the total count
  const totalCount = stats?.total_reports || 0;

  // Initialize variables for each stat and total count
  // const initialReviewCount = stats?.find(stat => stat._id === "initial_review")?.count || 0;
  // const finalReviewCount = stats?.find(stat => stat._id === "final_review")?.count || 0;
  // const completedCount = stats?.find(stat => stat._id === "completed")?.count || 0;
  // const report_generationcount = stats?.find(stat => stat._id === "report_generation")?.count || 0;

  // const totalCount = stats?.reduce((acc, stat) => acc + stat.count, 0);

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




  const handleSearch = (searchQuery) => {
    setFilteredData(Data)
    const filtered = Data?.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleView = (report) => {
    // console.log(">>>>>>>>>>>>>>>>>,",report);

    navigate("/home/detailpage", {
      state: { reportId: report._id, reportName: report?.name, reportstatus: report?.status, reportDatasend: report },
    });

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
        {loading && (
          <div className="flex justify-center mt-10">
            <Oval
              height={30}
              width={30}
              color="#7147B4"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#7147B4"
              strokeWidth={5}
              strokeWidthSecondary={2}
            />
          </div>
        )}
        {
          selected === 'Home' && (
            <div className="flex-1 p-6 bg-white rounded-3xl m-10">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <h1 className="text-2xl font-bold">Home</h1>
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    className="flex items-center space-x-2 text-[#79747E] hover:bg-gray-100 rounded-md p-2 transition duration-300"
                  >
                    <img src={bell} alt="notification" className="h-7" />
                  </button>

                  {/* Make the search bar width responsive */}
                  <Searchbar
                    onSearch={handleSearch}
                    className="w-full sm:w-64 md:w-80 lg:w-96"
                  />
                </div>
              </div>

              {/* <h1 className="text-2xl font-bold">Home</h1> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6 mt-14">
                <div
                  className={`px-3 pb-1 rounded-lg border ${selectedOption === 'initial_review' ? 'border-[#7147B4]' : 'border-[#FDDEB8]'
                    } bg-[#FEF4E8] cursor-pointer`}
                  onClick={() => handleSelect('initial_review')}
                >
                  <h2 className="text-yellow-500 font-semibold py-2">Initial Review</h2>
                  <p className="text-2xl font-semibold">{initialReviewCount}</p>
                </div>

                <div
                  className={`px-3 pb-1 rounded-lg border ${selectedOption === 'final_review' ? 'border-[#7147B4]' : 'border-[#F0B0B0]'
                    } bg-[#FAE6E6] cursor-pointer`}
                  onClick={() => handleSelect('final_approval')}
                >
                  <h2 className="text-red-500 py-2 font-semibold">Final Review</h2>
                  <p className="text-2xl font-semibold">{finalReviewCount}</p>
                </div>

                <div
                  className={`px-3 pb-1 rounded-lg border ${selectedOption === 'report_generation' ? 'border-[#7147B4]' : 'border-[#ABA3B5]'
                    } bg-[#e9e9e9] cursor-pointer`}
                  onClick={() => handleSelect('report_generation')}
                >
                  <h2 className="text-gray-500 py-2 font-semibold">Report Generation</h2>
                  <p className="text-2xl font-semibold">{report_generationcount}</p>
                </div>

                <div
                  className={`px-3 pb-1 rounded-lg border ${selectedOption === 'completed' ? 'border-[#7147B4]' : 'border-[#B3DBBC]'
                    } bg-[#E6F4E9] cursor-pointer`}
                  onClick={() => handleSelect('completed')}
                >
                  <h2 className="text-green-500 py-2 font-semibold">Completed</h2>
                  <p className="text-2xl font-semibold">{completedCount}</p>
                </div>

                <div
                  className={`px-3 pb-1 rounded-lg border ${selectedOption === 'totalReports' ? 'border-[#7147B4]' : 'border-[#D3C6E8]'
                    } bg-[#F1EDF8] cursor-pointer`}
                  onClick={() => handleSelect('totalReports')}
                >
                  <h2 className="text-purple-500 py-2 font-semibold">Total Reports</h2>
                  <p className="text-2xl font-semibold">{totalCount}</p>
                </div>
              </div>
              {/* Status Cards */}
              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6 mt-14">
                <div className="px-3 pb-1 bg-[#FEF4E8] rounded-lg border-[#FDDEB8] border">
                  <h2 className="text-yellow-500 font-semibold py-2">Initial Review</h2>
                  <p className="text-2xl font-semibold">{initialReviewCount}</p>
                </div>
                <div className="px-3 pb-1 rounded-lg border border-[#F0B0B0] bg-[#FAE6E6]">
                  <h2 className="text-red-500 py-2 font-semibold ">Final Review</h2>
                  <p className="text-2xl font-semibold ">{finalReviewCount}</p>
                </div>
                <div className="px-3 pb-1 bg-[#e9e9e9] border border-[#ABA3B5] rounded-lg">
                  <h2 className="text-gray-500 py-2 font-semibold">Report Generation
                  </h2>
                  <p className="text-2xl font-semibold">{report_generationcount}</p>
                </div>
                <div className="px-3 pb-1 bg-[#E6F4E9] border border-[#B3DBBC] rounded-lg">
                  <h2 className="text-green-500 py-2 font-semibold">Completed</h2>
                  <p className="text-2xl font-semibold">{completedCount}</p>
                </div>
                <div className="px-3 pb-1 bg-[#F1EDF8] border border-[#D3C6E8] rounded-lg">
                  <h2 className="text-purple-500 py-2 font-semibold">Total Reports</h2>
                  <p className="text-2xl font-semibold">{totalCount}</p>
                </div>
              </div> */}
              <div className="flex justify-start py-4 space-x-4">
                {/* First Dropdown */}
                <div className="w-[210px] shadow-lg bg-white rounded-md p-2 border border-gray-300 hover:border-purple-500">
                  <select
                    className="w-full text-sm border-none outline-none bg-transparent text-center"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="client">Client</option>
                  </select>
                </div>


              </div>

              {/* <div className="flex justify-start py-4">
                <div className="w-[210px] shadow-lg bg-white rounded-md p-2 border border-gray-300 hover:border-purple-500">
                  <select
                    className="w-full text-sm border-none outline-none bg-transparent text-center"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="user">User</option>
                    <option value="client">Client</option>
                  </select>
                </div>
              </div> */}


              {/* Reports Table */}
              <div className="bg-white rounded-xl shadow-md overflow-auto ">
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
                      {filteredData?.map((report, index) => {
                        const createdAt = report?.createdAt;
                        const completedAt = report?.completedAt;

                        const formattedDate = createdAt ? new Date(createdAt).toISOString().split('T')[0] : 'N/A';
                        const formattedTime = createdAt ? moment(createdAt).utc().format('h:mm A') : 'N/A';

                        const completedDate = completedAt ? new Date(completedAt).toISOString().split('T')[0] : 'N/A';
                        const completedTime = completedAt ? moment(completedAt).utc().format('h:mm A') : 'N/A';

                        //  console.log('Created Date:', formattedDate);
                        //  console.log('Created Time:', formattedTime);
                        //  console.log('Completed Date:', completedDate);
                        //  console.log('Completed Time:', completedTime);

                        return (
                          <tr key={index} className="h-20">
                            <td className="py-2 px-3 border-b text-left flex items-center gap-2 h-20">
                              <img src={report?.logo} alt={report?.name} className="w-8 h-8 rounded-full" />
                              <div>
                                <div className="font-medium text-sm">{report?.name}</div>
                                <div className="text-sm text-gray-500">{report?.symbol}</div>
                              </div>
                            </td>
                            <td className="py-2 px-3 border-b text-left items-center gap-2">
                              <div>
                                <div className="font-medium text-sm">{formattedDate}</div>
                                <div className="text-sm text-gray-500">{formattedTime}</div>
                              </div>
                            </td>
                            <td className="py-2 px-3 border-b text-left items-center gap-2">
                              <div>
                                <div className="font-medium text-sm">{completedDate}</div>
                                <div className="text-sm text-gray-500">{completedTime}</div>
                              </div>
                            </td>
                            <td className={`py-2 px-3 border-b text-left ${report?.status === 'final_approval'
                              ? 'text-red-500'
                              : report?.status === 'initial_review'
                                ? 'text-yellow-500'
                                : report?.status === 'completed'
                                  ? 'text-green-500'
                                  : 'text-gray-500'}`}>
                              {report?.status}
                            </td>

                            {/* <td className={`py-2 px-3 border-b text-left ${report?.status}`}>{report?.status}</td> */}
                            <td className="py-2 px-1 border-b text-left">
                              <div
                                className="flex items-center space-x-2 text-[#79747E] hover:bg-gray-100 rounded-md p-2 transition duration-300 cursor-pointer"
                                onClick={() => handleView(report)}
                              >
                                <img src={eye} alt={report.name} className="w-5 h-4 rounded-full" />
                                <span className="hover:text-blue-700 cursor-pointer">View</span>
                              </div>

                            </td>
                          </tr>)
                      }
                      )
                      }
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
    </div >
  );
};

export default Dashboard;
