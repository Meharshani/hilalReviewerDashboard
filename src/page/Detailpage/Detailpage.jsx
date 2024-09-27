
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
  const [status, setStatus] = useState('initial_review');
  const [counter, setCounter] = useState(0);       // Counter for triggering data re-fetch

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
      const response = await fetch(`${url}api/reviewer/report/reqs/${reportId}`, requestOptions);
      const result = await response.json(); // Assuming the API returns JSON data
      // console.log("=========>",result?.body.ODR);
      setReportdata(result?.body?.ODR)
      return result;
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };
  // console.log("--->++++,",markdown);
  const handleReportSave = async () => {
    try {
      // Call the reportSave function and pass the token and report content
      const result = await reportSave(markdown, reportId);
      if (result?.success === true) {
        setCounter(prevCounter => prevCounter + 1); // Increment the counter
        toast.success('Report saved successfully!', { position: "top-center" }); 
      }
      console.log('Report saved:', result);
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error('Failed to save the report.', { position: "top-center" }); // Display error toast

    }
  };
  const handleReportSubmit = async () => {
    try {
      // Call the reportSave function and pass the token and report content
      const result = await submitReport(status, markdown, reportId);
      if (result?.success === true) {
        setCounter(prevCounter => prevCounter + 1); // Increment the counter
        toast.success('Report submitted status successfully!', { position: "top-center" }); // Display success toast

      }
      console.log('Report saved:', result);
    } catch (error) {
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
        <div className="p-6 bg-white rounded-3xl m-10 ">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Detail Page</h1>
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
            <button className="bg-green-100 text-green-600 font-semibold py-1 px-4 rounded-md hover:bg-green-200 transition"
              onClick={handleReportSave} // save report 

            >
              Save Changes
            </button>
            <button className="bg-red-100 text-red-600 font-semibold py-1 px-4 rounded-md hover:bg-red-200 transition"
              onClick={handleGoBack}

            >
              Close
            </button>
            <button className="bg-purple-600 text-white font-semibold py-1 px-4 rounded-md hover:bg-purple-700 transition"
              onClick={handleReportSubmit}
            >
              Submit Report
            </button>
          </div>
          <div>
            {/* <TextEditor editMode={editMode} /> */}
            <Editor2 editMode={editMode} reportdata={reportdata} setMarkdown={setMarkdown} />
          </div>

        </div>

      </div>

    </div>
  );
}

export default Detailpage;
