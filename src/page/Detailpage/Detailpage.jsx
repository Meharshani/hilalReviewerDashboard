
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
import {
  GetProfileData,
} from "../../service/service";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"; // Import Font Awesome icons


function Detailpage() {
  const [selected, setSelected] = useState('Settings');
  const [reportdata, setReportdata] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const location = useLocation();
  const { reportId, reportName, reportstatus, reportDatasend } = location?.state || {}; // Destructure the passed data
  const userData = localStorage.getItem("user_token");
  const [markdown, setMarkdown] = useState('');
  const [status, setStatus] = useState('completed');
  const [counter, setCounter] = useState(0);       // Counter for triggering data re-fetch
  const [loading, setLoading] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [UserData, setUserData] = useState({});
  const [userrole, setuserrole] = useState("");
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const currentPath = window?.location.pathname;
  // console.log('reportData', reportDatasend);

  useEffect(() => {

    fetchdata();
  }, []);

  const fetchdata = () => {
    GetProfileData()
      .then((result) => {
        const userDataCopy = { ...result?.body?.user }; // Create a copy of userData

        setUserData(userDataCopy); // Update user data with the modified dob
        // const data = result?.body?.user;
        // console.log(userDataCopy.role);
        setuserrole(userDataCopy?.role);
        localStorage.setItem("user_Data", JSON.stringify(userDataCopy));
        setRefresh((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // console.log( userrole );

  // console.log(reportstatus);
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
      // console.log("=========>", result?.body.ODR);
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

      // Call the reportSave function and pass necessary parameters
      const result = await reportSave(markdown, reportId, statusType, reportDatasend);

      if (result?.success === true) {
        setCounter(prevCounter => prevCounter + 1); // Increment the counter
        toast.success("Report saved successfully!", { position: "top-center" });
      } else {
        toast.error("No changes detected. Please update the report or select a Shariah status before saving.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error saving report:", error);
      toast.error("Failed to save the report.", { position: "top-center" });
    } finally {
      setLoading(false); // Ensure loading is always stopped
    }
  };
  const handleReportSubmit = async () => {
    try {
      setLoading(true);

      // Call the submitReport function
      const result = await submitReport(markdown, reportId, statusType, reportDatasend);

      if (result?.success === true) {
        await toast.success("Report submitted successfully!", { position: "top-center" });
        setCounter(prevCounter => prevCounter + 1); // Increment counter
        goToHome(); // Navigate to home screen
      } else {
        toast.error("No changes detected. Please update the report or select a Shariah status before submitting.", { position: "top-center" });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error("Submission failed. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false); // Ensure loading stops in all cases
    }
  };


  const goToHome = () => {
    navigate("/home"); // Navigates to the home screen
  };
  const getStatusDisplay = (status) => {
    // console.log(status);

    switch (status) {
      case "Compliant":
        return (
          <div className="flex items-center text-green-500">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Compliant
          </div>
        );
      case "Not Compliant":
        return (
          <div className="flex items-center text-red-500">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            Not Compliant
          </div>
        );
      case "Doubtful":
        return (
          <div className="flex items-center text-orange-500">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            Doubtful
          </div>
        );
      case "No Status":
        return (
          <div className="flex items-center text-gray-500">
            <FontAwesomeIcon icon={faTimesCircle} className="mr-2" />
            No Status
          </div>
        );
      default:
        return null;
    }
  };
  // console.log(reportdata); // Check if this is logging a valid status

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
              <div className="flex items-center space-x-2 mt-2 "> {/* Using flex and spacing between elements */}
                {/* <label className="font-medium">Status: </label> */}
                <span>{getStatusDisplay(reportdata?.shariahStatus)}</span>
              </div>

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
          {(userrole === "final_reviewer" || (userrole === "initial_reviewer" && reportstatus === "initial_review")) && (

            <div className="flex flex-wrap items-center justify-end py-4 gap-2 w-full">
              {/* Second Dropdown (Status Type) */}

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
              <div className="w-[210px] shadow-lg bg-white rounded-md p-2 border border-gray-300 hover:border-purple-500">
                <select
                  className="w-full text-sm border-none outline-none bg-transparent text-center"
                  value={statusType}
                  onChange={(e) => setStatusType(e.target.value)}
                >
                  <option value="">Shariah Status</option>
                  <option value="No Status">No Status</option>
                  <option value="Compliant">Compliant</option>
                  <option value="Not Compliant">Not Compliant</option>
                  <option value="Doubtful">Doubtful</option>
                </select>
              </div>
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
          )}
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
