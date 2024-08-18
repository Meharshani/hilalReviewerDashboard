// src/components/HomePage/HomePage.js
import React, { useState } from 'react';
import imglOGO from "../../assets/header11.png";
import robo from "../../assets/robo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const Forgotnavigate = () => {
        navigate('/forgot');
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
                <div className="w-full max-w-md">
                    {/* <img src={imglOGO}alt="Hilalfolio Logo" className="mx-auto mb-4" /> */}
                    <div className="text-center mb-8 justify-self-center font-sans">
                        <img src={imglOGO} alt="logo" className="h-[44px] mb-4 mx-auto" />
                        <h1 className="text-3xl font-semibold mb-2">Login</h1>
                        <h1 className="text-1xl  text-customGray font-sans">Enter your credentials to login.</h1>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                            <input
                                className="w-full px-3 py-2 border  border-[#423CAC] rounded-md"
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                style={{
                                    borderColor: '#CAC4D0',
                                    borderRadius: 8
                                }}
                            />
                        </div>
                        {/* <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.97 10.97 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8c2.577 0 4.895 1.175 6.375 3.001M15 12h.01M19 12h.01M9 12h.01M12 15h.01M12 9h.01" />
                  </svg>
                </span>
              </div>
            </div> */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    className="w-full px-3 py-2 border border-[#423CAC]  rounded-md"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    style={{
                                        borderColor: '#CAC4D0',
                                        borderRadius: 8

                                    }}
                                />
                                <span
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400" />
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Switch
                                    checked={isChecked}
                                    onChange={handleToggle}
                                    offColor="#bbb"

                                    onColor="#423CAC"
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    className="react-switch"
                                    handleDiameter={20} // Diameter of the handle (knob)
                                    height={24} // Height of the switch
                                    width={40} // Width of the switch

                                    // Customize styles for the handle and switch
                                    onHandleStyle={{ borderRadius: '50%', width: '22px', height: '22px' }}
                                    offHandleStyle={{ borderRadius: '50%', width: '22px', height: '2px' }}
                                    onTrackStyle={{ borderRadius: '50%' }}
                                    offTrackStyle={{ borderRadius: '50%' }}

                                />
                                <span className="ml-3 text-sm">Remember Me</span>
                            </div>

                            <a href="" className="text-sm text-purple-600 hover:underline"
                                onClick={Forgotnavigate}

                            >Forgot password</a>
                        </div>
                        <button
                            className="w-full py-2 text-white font-semibold rounded-md transition bg-custom-gradient hover:bg-purple-700"
                            type="submit"
                            onClick={() => {
                                navigate('/home');

                            }}
                        >
                            Login
                        </button>

                    </form>
                </div>
            </div>
            <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-50">
                <div className="text-center">
                    <img src={robo} alt="Illustration" className="h-[330px] mx-auto mb-8" />
                    <h1 className="text-3xl font-bold">Welcome to Hilalfolio!</h1>
                    <p className="text-lg">Your Halal Crypto Portfolio Tracker and Manager</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
