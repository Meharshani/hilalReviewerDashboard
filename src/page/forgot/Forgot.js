import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";
import imglOGO from "../../assets/header11.png";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { url } from "../../environment";
import FormControl from "@mui/material/FormControl";
const ForgetPassword = () => {
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address")
            .required("Email is required"),
    });

    const onSubmit = (values, actions) => {
        console.log("Form submitted with values:", values);
        sendOtp(values);
        actions.setSubmitting(false);
    };
    const sendOtp = (e) => {
        console.log(e);
        setLoading(true);

        fetch(`${url}/api/reviewer/admin/forgot-password`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify({
                email: e.email,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                console.log("API Response:", res); // Log the entire response to see its structure

                if (res?.success === true) { // Check if res.success exists and is true
                    localStorage.setItem("user_token", res.body.token);

                    toast.success(res.message, {
                        position: "top-center",
                        autoClose: 3000,
                    });

                    navigate("/otp", {
                        state: { email: e.email, component: "forget" },
                    });

                    setLoading(false);
                } else {
                    // Handle case where success is false or not present
                    toast.error(res.message || "Something went wrong", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching OTP:", error); // Log any errors
                toast.error("Failed to send OTP. Please try again later.", {
                    position: "top-center",
                    autoClose: 3000,
                });
                setLoading(false);
            });
    };

    // const sendOtp = (e) => {

    //     console.log(e);
    //     setLoading(true);
    //     fetch(`${url}/api/reviewer/admin/forgot-password1`, {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json",
    //             accept: "application/json",
    //         },
    //         body: JSON.stringify({
    //             email: e.email,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((res) => {

    //             if (res.success === true) {
    //                 localStorage.setItem("user_token", res.body.token);

    //                 toast.success(res.message, {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                 });

    //                 navigate("/otp", {
    //                     state: { email: e.email, component: "forget" },
    //                 });

    //                 setLoading(false);
    //             } else {
    //                 toast.error(res.message, {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                 });
    //                 setLoading(false);
    //             }
    //         })
    //         .catch(() => {
    //             setLoading(false);
    //         });
    // };
    return (
        <>
            <div className="flex h-screen">
                <ToastContainer />

                <div className="w-full">
                    {" "}
                    <div className=" h-[95vh] m-4 rounded-lg flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center mt-1">
                            <img src={imglOGO} className="h-[44px]" alt="logo" />
                        </div>
                        <div className="flex flex-col justify-center items-center mt-3 text-center ">
                            <p className="Welcome-text mb-3">Forgot password</p>
                            <span className="small-text">
                            Please enter your registered email to receive 
                                <br /> the OTP to reset your password.
                            </span>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ touched, errors, values }) => {
                                    // Determine if the button should be disabled
                                    const isDisabled = !!errors.email || !values.email;

                                    return (
                                        <Form className="max-w-sm w-[360px] mt-8">
                                            <div className="mb-6">
                                                <label
                                                    htmlFor="email"
                                                    className="block mb-2 text-sm font-medium text-black-800 text-start"
                                                >
                                                    Email
                                                </label>
                                                <FormControl
                                                    sx={{ width: "100%" }}
                                                    variant="outlined"
                                                    className="password-input"
                                                >
                                                    <Field
                                                        as={OutlinedInput}
                                                        name="email"
                                                        autoComplete="off"
                                                        error={touched.email && !!errors.email}
                                                        spellCheck={false}
                                                        sx={{ borderRadius: '8px', height: '50px' }}
                                                        placeholder="Enter your email"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {touched.email && !errors.email ? (
                                                                    <CheckCircleOutlineIcon sx={{ color: "green" }} />
                                                                ) : touched.email && errors.email ? (
                                                                    <CancelIcon sx={{ color: "#CD0000" }} />
                                                                ) : null}
                                                            </InputAdornment>
                                                        }
                                                        inputProps={{ autoComplete: "off" }}
                                                    />
                                                    <ErrorMessage
                                                        name="email"
                                                        component="div"
                                                        className="text-red-700 text-start text-xs"
                                                    />
                                                </FormControl>
                                            </div>
                                            <LoadingButton
                                                variant="contained"
                                                className="mx-auto submit-button !mb-8 w-full"
                                                style={{
                                                    background: !isDisabled
                                                        ? 'linear-gradient(95.15deg, #7147B4 0%, #423CAC 112.53%)'
                                                        : '#ccc',
                                                    color: 'white',
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                    height: '50px',
                                                    borderRadius: '8px',
                                                    textTransform: 'capitalize',
                                                    fontFamily: 'Open Sans',
                                                    border: 'none',
                                                    transition: 'background-color 0.3s ease',
                                                }}
                                                type="submit"
                                                disabled={isDisabled}
                                                loading={Loading}
                                            >
                                                {Loading ? "Adding ..." : "Submit"}
                                            </LoadingButton>
                                            <span className="small-text !text-[#1F1F1F] !font-semibold mt-1">
                                                Remember password?{" "}
                                                <Link className="forget-text" to={"/"}>
                                                    Login
                                                </Link>
                                            </span>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ForgetPassword;