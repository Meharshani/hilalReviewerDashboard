import React, { useState } from "react";
// import NavBar from "../../Component/Navbar";
// import Banner from "../Component/Setting/Banner";
import SideBar from "../../component/Setting/SideBar";
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
import { useEffect } from "react";
import {
    GetProfileData,
    UpdateProfileData,
    UpdateProfileImage,
} from "../../service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../assets/avatar-img.svg";
// import Footer from "../../Component/Footer,";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Editpage() {
    const UserData = JSON.parse(localStorage.getItem("user_Data"));
    const [isLoading, setIsLoading] = useState(false);
    const [imageLodaing, setimageLodaing] = useState(false);
    const [isShowBtn, setIsShowBtn] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [userImg, setUserImg] = useState(null);
    const [selected, setSelected] = useState('Settings');
    const [SelectedSetting, setSelectedSetting] = useState('Settings');
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const currentPath = window.location.pathname;
    // const [Imgfile, setImgFile] = useState(null)
    console.log('-------------->', currentPath);
    const [userData, setUserData] = useState({
        fullName: "",
        dob: "",
        phoneNo: "",
        gender: "",
        email: "",
        referralCode: "",
    });

    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line
    }, []);
    const fetchdata = () => {
        GetProfileData()
            .then((result) => {
                const userDataCopy = { ...result?.body?.user }; // Create a copy of userData
                // console.log(userDataCopy)
                if (userDataCopy?.dob) {
                    userDataCopy.dob = changeformatdata(userDataCopy.dob); // Change the format of dob
                }
                setUserData(userDataCopy); // Update user data with the modified dob
                // const data = result?.body?.user;
                // console.log(userDataCopy);
                localStorage.setItem("user_Data", JSON.stringify(userDataCopy));
                const userSettings = result?.body?.userSettings;
                localStorage.setItem("user_Setting", JSON.stringify(userSettings));
                setRefresh((prev) => !prev);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setIsShowBtn(true);
    };
    const HandleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const date = new Date(userData.dob);

        const day = date.getDate();
        const month = date.getMonth() + 1; // Note: Month starts from 0 (January is 0)
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

        const data = {
            fullName: userData.fullName,
            phoneNo: userData.phoneNo,
            gender: userData.gender,
            dob: formattedDate,
        };
        UpdateProfileData(data)
            .then((result) => {
                if (result.success) {
                    // console.log(result.message)
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                    setIsShowBtn(false);
                } else {
                    toast.error(result.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000,
                    });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
            });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // setImgFile(file)
        if (file) {
            // setIsShowBtn(true)
            const reader = new FileReader();
            reader.onloadend = () => {
                if (file) {
                    setimageLodaing(true);
                    UpdateProfileImage(file).then((result) => {
                        setimageLodaing(false);
                        if (result.success) {
                            setUserImg(reader.result);
                            fetchdata();
                        } else {
                            toast.error(result.message, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 3000,
                            });
                        }
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const changeformatdata = (dateString) => {
        const parts = dateString.split("-");

        const dateObject = new Date(parts[2], parts[1] - 1, parts[0]);

        const formattedDate = dateObject.toISOString().slice(0, 10);

        return formattedDate;
    };
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <SideBar></SideBar>
            {/* Main Content */}
            <div className="flex-1  overflow-y-auto  ">
                <div className="p-6 bg-white rounded-3xl m-10 h-[610px]">
                    <form onSubmit={HandleSubmit} className="h-full">
                        <div className="border-[1px] border-[#fff] rounded-3xl   bg-[#fff] h-full">
                            <h2 className="text-2xl font-bold tracking-tight text-[#0C0F14] sm:text-32">
                                Edit Profile
                            </h2>
                            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                                {imageLodaing ? (
                                    <div className="size-[96px] rounded-full border-[2px] border-primaryPurple bg-white  flex items-center justify-center">
                                        <CircularProgress size={20} color="primary" />
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="profile_image"
                                        className="flex relative"
                                    >
                                        {userImg ? (
                                            <img
                                                className="rounded-full w-[96px] h-[96px] object-cover"
                                                src={userImg}
                                                alt="avatar"
                                            />
                                        ) : UserData?.image ? (
                                            <img
                                                className="rounded-full w-[96px] h-[96px] object-cover"
                                                src={UserData?.image}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <img
                                                className="rounded-full w-[96px] h-[96px] object-cover"
                                                src={avatar}
                                                alt="avatar"
                                            />
                                        )}
                                        <div className="w-[28px] h-[28px] rounded-full border-[2px] border-white bg-primaryPurple absolute cursor-pointer right-0 bottom-0 flex items-center justify-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                            >
                                                <path
                                                    d="M6 9.7334H10.2"
                                                    stroke="white"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M8.10078 2.0336C8.28643 1.84795 8.53823 1.74365 8.80078 1.74365C8.93078 1.74365 9.05951 1.76926 9.17962 1.81901C9.29972 1.86876 9.40886 1.94168 9.50078 2.0336C9.59271 2.12553 9.66562 2.23466 9.71537 2.35476C9.76512 2.47487 9.79073 2.6036 9.79073 2.7336C9.79073 2.8636 9.76512 2.99233 9.71537 3.11244C9.66562 3.23255 9.59271 3.34168 9.50078 3.4336L3.66745 9.26693L1.80078 9.7336L2.26745 7.86693L8.10078 2.0336Z"
                                                    stroke="white"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".png, .jpg"
                                            name="profile_image"
                                            id="profile_image"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>
                            <div className="pt-6 flex flex-col lg:flex-row gap-5">
                                <div className="text-sm font-semibold flex flex-col lg:w-1/2">
                                    <label htmlFor="">Name</label>
                                    <input
                                        value={userData?.fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        maxLength={30}
                                        className="p-4 outline-none border-[1px] border-[#D7D9E4] rounded-lg bg-transparent mt-2"
                                        placeholder="Michael Smith"
                                        type="text"
                                    />
                                </div>
                                <div className="text-sm font-semibold flex flex-col lg:w-1/2">
                                    <label htmlFor="">Email</label>
                                    <input
                                        // value={userData?.email}
                                        defaultValue={userData?.email}
                                        name="email"
                                        // onChange={handleChange}
                                        // readOnly
                                        className="p-4 outline-none border-[1px] border-[#D7D9E4] rounded-lg bg-[#F2F2F2] mt-2"
                                        placeholder="info@hilalfolio.com"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="pt-6 flex flex-col lg:flex-row gap-5 mr-5">
                                <div className="text-sm font-semibold flex flex-col lg:w-1/2">
                                    <label htmlFor="">{`Phone Number (Optional)`}</label>
                                    <input
                                        value={userData?.phoneNo}
                                        onChange={handleChange}
                                        name="phoneNo"
                                        className="p-4 outline-none border-[1px] border-[#D7D9E4] rounded-lg bg-transparent mt-2"
                                        placeholder="+1 717-676-2047"
                                        type="text"
                                    />
                                </div>
                            </div>
                            {isShowBtn && (
                                <div className="pt-6 flex flex-col lg:flex-row gap-5 justify-end">
                                    <div className="text-sm font-semibold flex flex-col w-24">
                                        <button
                                            onClick={() => setIsShowBtn(false)}
                                            disabled={isLoading}
                                            type="button"
                                            className="text-primaryPurple border-primaryPurple border-[1px] hover:bg-opacity-90 py-3 px-2 rounded-lg disabled:opacity-50 "
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="text-sm font-semibold flex flex-col w-32">
                                        <button
                                            disabled={isLoading}
                                            type="submit"
                                            className="bg-primaryPurple text-white hover:bg-opacity-90 py-3 px-2 rounded-lg disabled:opacity-50 "
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* <div className='pt-6 flex flex-col lg:flex-row gap-5'>
                                            <div className='text-sm font-semibold flex flex-col lg:w-1/2'>
                                                <label htmlFor="">{`Gender (Optional)`}</label>
                                                <input
                                                    value={userData?.gender}
                                                    onChange={handleChange}
                                                    name='gender'
                                                    className='p-4 outline-none border-[1px] border-[#D7D9E4] rounded-lg bg-transparent mt-2' placeholder='Male' type="text" />
                                            </div>

                                        </div> */}
                        </div>

                    </form>
                </div>

            </div>

        </div>
    );
}

export default Editpage;
