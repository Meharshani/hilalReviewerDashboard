
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
import Editpage from "../EditPage/Editpage";
import TextEditor from '../../component/TextEditor/TextEditor';
import Editor2 from '../../component/QuillEditor/Editor';
import { Oval } from 'react-loader-spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { url } from '../../environment';
import {
  reportSave,
  submitReport

} from "../../service/service";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Detailpage() {
  const [selected, setSelected] = useState('Settings');
  const [reportdata, setReportdata] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const { reportId, reportName } = location?.state || {}; // Destructure the passed data
  const userData = localStorage.getItem("user_token");
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState('completed');
  const [counter, setCounter] = useState(0);       // Counter for triggering data re-fetch
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  // console.log(editMode);
  const handleToggle = () => {
    setEditMode(!editMode);
  };

  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous screen
  };
  useEffect(() => {
    fetchReportData(reportId);

  }, [counter]);
  const fetchReportData = async (reportId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    try {
      setLoading(true)
      const response = await fetch(`${url}api/reviewer/report/reqs/${reportId}`, requestOptions);
      const result = await response.json(); // Assuming the API returns JSON data
      // console.log("=========>",result?.body.ODR);
      setReportdata(result?.body?.ODR)
      setLoading(false)
      return result;
    } catch (error) {
      setLoading(false)
      console.error('Error fetching report data:', error);
    }
  };
  // console.log("--->++++,",markdown);
  const handleReportSave = async () => {
    try {
      setLoading(true);
      // Call the reportSave function and pass the token and report content
      const result = await reportSave(markdown, reportId);
      if (result?.success === true) {
        setLoading(false)
        setCounter(prevCounter => prevCounter + 1); // Increment the counter
        toast.success('Report saved successfully!', { position: "top-center" });
      }
      // console.log('Report saved:', result);
    } catch (error) {
      setLoading(false)
      console.error('Error saving report:', error);
      toast.error('Failed to save the report.', { position: "top-center" }); // Display error toast

    }
  };
  const handleReportSubmit = async () => {
    try {
      setLoading(true)

      // Call the reportSave function and pass the token and report content
      const result = await submitReport(status, markdown, reportId);
      if (result?.success === true) {
        setLoading(false)

        setCounter(prevCounter => prevCounter + 1); // Increment the counter
        toast.success('Report submitted status successfully!', { position: "top-center" }); // Display success toast

      }
     } catch (error) {
      setLoading(false)

      console.error('Error saving report:', error);
      toast.error('Failed to submit status the report.', { position: "top-center" }); // Display error toast

    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <ToastContainer />
      {/* Sidebar */}
      <SideBar></SideBar>
      {/* Main Content */}

      <div className="flex-1  overflow-y-auto  ">
        < div className="p-6 bg-white rounded-3xl m-10 ">
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
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center space-x-2 ml-2">
              <h1 className="text-2xl font-bold">{reportdata?.name}</h1>
              <h1 className="text-sm mt-2 text-gray-500">{reportdata?.symbol}</h1>
            </div>

            {/* <div className="flex items-center gap-4">
              <button
                className="flex items-center space-x-2 text-[#79747E] hover:bg-gray-100 rounded-md p-2 transition duration-300"
              // onClick={() => handleView(report)}
              >
                <img src={bell} alt="notification" className=" h-7 " />
              </button>
              <Searchbar />

            </div> */}
          </div>
          <div className="flex flex-wrap items-center justify-end py-4 gap-2 w-full">
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

            <button className=" border border-[#098C26] text-[#098C26] font-semibold py-1 px-4 rounded-md hover:bg-green-200 transition w-full sm:w-auto"
              onClick={handleReportSave}
            >
              Save Changes
            </button>

            <button className="  border border-[#CD0000] text-[#CD0000] font-semibold py-1 px-4 rounded-md hover:bg-red-200 transition w-full sm:w-auto"
              onClick={handleGoBack}>
              Close
            </button>
            <button
              className="text-white font-semibold py-1 px-4 rounded-md hover:bg-purple-700 transition w-full sm:w-auto"
              style={{
                background: 'linear-gradient(95.15deg, #7147B4 0%, #423CAC 112.53%)'
              }}
              onClick={handleReportSubmit}

            >
              Submit Report
            </button>

            {/* 
            <button className="bg-purple-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-purple-700 transition w-full sm:w-auto">
              Submit Report
            </button> */}
          </div>

          <div>
            {/* <TextEditor editMode={editMode} /> */}
            <Editor2 editMode={editMode} reportdata={reportdata} setMarkdown={setMarkdown} />
          </div>

        </div>

      </div>

    </div >
  );
}

export default Detailpage;
