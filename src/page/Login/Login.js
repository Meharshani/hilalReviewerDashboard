// src/components/HomePage/HomePage.js
import React, { useEffect, useState } from 'react';
import imglOGO from "../../assets/header11.png";
import robo from "../../assets/robo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch'; // Import the switch component
import { useNavigate } from 'react-router-dom';
import { url } from '../../environment'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup'; // Import Yup
import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    //  useFormik
} from "formik";
import { GetProfileData } from "../../service/service";
import Toggle from 'react-toggle';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(false);
    const [email, setEmail] = useState('usman@');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';

        if (savedEmail && savedPassword && rememberMe) {
            setIsChecked(true);
        }
    }, []);



    const handleToggle = () => {
        setIsChecked(!isChecked);
        // console.log("++++>>>", !isChecked);
        
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const Forgotnavigate = () => {
        navigate('/forgot');
    };

    const SavesubmitCredentials = (values, { setSubmitting }) => {
        if (isChecked) {
            localStorage.setItem('email', values.email);
            localStorage.setItem('password', values.password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('rememberMe');
        }

        // Simulate an API login (you can replace this with actual API logic)
        // console.log('Login credentials:', values);
        setSubmitting(false);
    };


    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
    });
    const submitCredentials = async (values, { setSubmitting }) => {
        // console.log("Submit credentials working...");

        // Call save function for remembering credentials
        SavesubmitCredentials(values, { setSubmitting });

        // Start loading and disable submit button
        setSubmitting(true);
        setLoading(true);

        try {
            const response = await fetch(`${url}api/reviewer/admin/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(values),
            });

            const res = await response.json();

            if (res?.success) {
                // Login success
                toast.success("Login Successfully", {
                    position: "top-center",
                    autoClose: 3000,
                });
                localStorage.setItem("user_token", res?.body?.token);

                GetProfileData()
                    .then((result) => {
                        const data = result?.body?.user;
                        localStorage.setItem("user_Data", JSON.stringify(data));
                        navigate("/home");

                    })
                    .catch((err) => {
                        console.log(err.message);
                    });


            } else {
                // Login failure
                toast.error(res.message || "Login failed", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            // Handle network or API errors
            toast.error(error.message || "An error occurred", {
                position: "top-center",
                autoClose: 3000,
            });
        } finally {
            // Stop loading and allow form submission
            setLoading(false);
            setSubmitting(false);
        }
    };

    // const submitCredentionals = async (e) => {
    //     e.preventDefault(); // Prevent default form submission behavior
    //     setLoading(true); // Show loading spinner or disable button

    //     try {
    //         // Validate form data against the schema
    //         await validationSchema.validate({ email, password });

    //         // If validation passes, proceed to submit credentials
    //         fetch(`${url}api/reviewer-app/admin/login`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Accept: "application/json",
    //             },
    //             body: JSON.stringify({
    //                 email: email,
    //                 password: password,
    //             }),
    //         })
    //             .then((response) => response.json())
    //             .then((res) => {
    //                 if (res.success === true) {
    //                     toast.success("Login Successfully", {
    //                         position: "top-center", // Use string for positioning
    //                         autoClose: 3000,
    //                     });

    //                     // Save token and socialLogin in localStorage
    //                     localStorage.setItem("user_token", res?.body?.token || '');
    //                     localStorage.setItem("socialLogin", res.socialLogin || '');

    //                     // Fetch user profile data after login
    //                     GetProfileData()
    //                         .then((result) => {
    //                             const data = result?.body?.user;
    //                             console.log('login response=>:', data);

    //                             if (data) {
    //                                 // Save user data in localStorage
    //                                 localStorage.setItem("user_Data", JSON.stringify(data));
    //                                 const userSettings = result?.body?.userSettings;
    //                                 localStorage.setItem("user_Setting", JSON.stringify(userSettings || {}));

    //                                 // Navigate to home screen after successful login
    //                                 navigate("/");
    //                             }
    //                         })
    //                         .catch((err) => {
    //                             console.error("Error fetching profile data:", err.message);
    //                         });
    //                 } else {
    //                     // Handle login failure
    //                     toast.error(res.message || "Login failed", {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                     });
    //                 }
    //             })
    //             .catch((error) => {
    //                 // Handle any network or API error
    //                 toast.error(error.message || "An error occurred", {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                 });
    //             })
    //             .finally(() => {
    //                 // Ensure loading spinner is hidden in both success and error cases
    //                 setLoading(false);
    //             });
    //     } catch (err) {
    //         // Handle validation errors
    //         toast.error(err.message, {
    //             position: "top-center",
    //             autoClose: 3000,
    //         });
    //         setLoading(false); // Ensure loading spinner is hidden if validation fails
    //     }
    // };


    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <ToastContainer />

            <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
                <div className="w-full max-w-md">
                    {/* <img src={imglOGO}alt="Hilalfolio Logo" className="mx-auto mb-4" /> */}
                    <div className="text-center mb-8 justify-self-center font-sans">
                        <img src={imglOGO} alt="logo" className="h-[44px] mb-4 mx-auto" />
                        <h1 className="text-3xl font-semibold mb-2">Login</h1>
                        <h1 className="text-1xl  text-customGray font-sans">Enter your credentials to login.</h1>
                    </div>
                    <Formik
                        initialValues={{
                            email: localStorage.getItem('email') || '',
                            password: localStorage.getItem('password') || ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submitCredentials}
                    >
                        {({ errors, touched, isSubmitting, values, handleChange }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className={`w-full px-3 py-2 border rounded-md ${errors.email && touched.email ? 'border-red-500' : 'border-[#CAC4D0]'}`}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="mb-6 relative">
                                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className={`w-full px-3 py-2 border rounded-md ${errors.password && touched.password ? 'border-red-500' : 'border-[#CAC4D0]'}`}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 mt-6 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400" />
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Toggle
                                            checked={isChecked}
                                            onChange={handleToggle}
                                            className="custom-toggle"
                                            icons={false} // This also removes the default tick/cross icons

                                        />
                                        {/* <Switch
                                            checked={isChecked}
                                            onChange={handleToggle}
                                            offColor="#bbb"
                                            onColor="#423CAC"
                                            uncheckedIcon={false}
                                            checkedIcon={false}
                                            className="react-switch"
                                            handleDiameter={20}
                                            height={24}
                                            width={40}
                                            onHandleStyle={{ borderRadius: '50%', width: '22px', height: '22px' }}
                                            offHandleStyle={{ borderRadius: '50%', width: '22px', height: '2px' }}
                                            onTrackStyle={{ borderRadius: '50%' }}
                                            offTrackStyle={{ borderRadius: '50%' }}
                                        /> */}
                                        <span className="ml-3 text-sm text-[#49454F] font-medium">Remember Me</span>
                                    </div>

                                    <a
                                        href=""
                                        className="text-sm hover:underline gradient-text font-semibold "
                                        onClick={Forgotnavigate}
                                    >
                                        Forgot password
                                    </a>

                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2 text-white font-semibold rounded-md transition bg-custom-gradient hover:bg-purple-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Loading...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {/* <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={submitCredentials}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className={`w-full px-3 py-2 border rounded-md ${errors.email && touched.email ? 'border-red-500' : 'border-[#CAC4D0]'}`}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="mb-6 relative">
                                    <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className={`w-full px-3 py-2 border rounded-md ${errors.password && touched.password ? 'border-red-500' : 'border-[#CAC4D0]'}`}
                                    />

                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 mt-6 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-400" />
                                    </span>
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
                                    type="submit"
                                    className="w-full py-2 text-white font-semibold rounded-md transition bg-custom-gradient hover:bg-purple-700"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Loading...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik> */}
                    {/* <form>
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
                                value={email}  // Binding the email state variable
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        
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
                                    value={password}  // Binding the password state variable
                                    onChange={(e) => setPassword(e.target.value)} 
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
                            onClick={submitCredentionals}
                        >
                            Login
                        </button>

                    </form> */}
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
