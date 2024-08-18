import React, { useState, useEffect } from "react";
// import "./Otp-verification.css";
import {
  //  Link,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
// import * as Yup from "yup";
import OtpInput from "react-otp-input";
import { ToastContainer, toast } from "react-toastify";
import imglOGO from "../../assets/header11.png";
import { GetProfileData } from "../../service/service";

import "react-toastify/dist/ReactToastify.css";
import { LoadingButton } from "@mui/lab";
import { url } from "../../environment";
const OtpVerification = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const receivedData = location.state;

  // console.log(receivedData);

  const [otp, setOtp] = useState("");

  const handleOtpChange = (otpValue) => {
    // Allow only numbers in the OTP input
    const numericOtp = otpValue.replace(/\D/g, "");
    setOtp(numericOtp);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  const verifyOtp = (e) => {
    if (otp.length < 6) {
      return;
    }
    let token = "Bearer " + localStorage.getItem("token");
    setLoading(true);
    fetch(`${url}/api/auth/verify`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        otp: otp,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          if (receivedData.component === "signUp") {
            navigate("/");
            localStorage.setItem("user_token", res?.body?.token);
            GetProfileData()
              .then((result) => {
                const data = result?.body?.user;

                localStorage.setItem("user_Data", JSON.stringify(data));
              })
          } else {
            navigate("/new-password");
          }
          toast.success(res.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          setOtp("");
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const sendOtp = (e) => {
    setLoading(true);
    fetch(`${url}/api/auth/resend-otp`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: receivedData?.email,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success === true) {
          setSeconds(60);
          localStorage.setItem("token", res.body.token);
          toast.success(res.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full">
          <ToastContainer />{" "}
          <div className=" h-full rounded-lg flex flex-col justify-center items-center overflow-hidden">
            <div className="flex justify-center mt-1">
              <img src={imglOGO} className="h-[44px]" alt="logo" />
            </div>
            <div className="flex max-w-sm w-[360px] flex-col justify-center items-center mt-3 text-center ">
              <p className="text-35 Welcome-text">OTP Verification</p>
              <span className="small-text">
                It was popularised in the 1960s with the release of Lorem Ipsum.
              </span>

              <div className="mb-6">
                <OtpInput
                  value={otp}
                  type="number"
                  onChange={handleOtpChange}
                  inputStyle={{
                    width: "3.5rem",
                    height: "3.5rem",
                    margin: "20px 5px",
                    fontSize: "1rem",
                    borderRadius: "14px",
                    border: "1px solid var(--Light-Theme-Outline, #D7D9E4)",
                    background: " var(--Light-Theme-White, #FFF)",
                  }}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <LoadingButton
                variant="contained"
                className={` ${otp?.length === 6 ? 'submit-button' : 'submit-button-dis'}  submit-button !mb-8 `}
                style={{ spinnerColor: "white", color: 'white', fontSize: '16px', fontWeight: '600', height: '50px', borderRadius: '8px', textTransform: 'capitalize', fontFamily: 'Open Sans' }}
                onClick={() => verifyOtp()}
                loading={Loading}
              >
                {Loading ? "Adding ..." : "Verify"}
              </LoadingButton>
              {/* <span className="small-text mt-1">
                Resend code:{" "}
                <div className="forget-text">
                  {" "}
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p className="cursor-pointer" onClick={() => sendOtp()}>
                      Didn't recieve code?{" "}
                    </p>
                  )}
                </div>
              </span> */}
              <span className="small-text !text-[#1F1F1F] !font-semibold mt-1">
                Remember password?{" "}
                <Link className="forget-text" to={"/login"}>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OtpVerification;
