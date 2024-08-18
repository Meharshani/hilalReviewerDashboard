
import React, { useState } from 'react'
import PasswordInput from '../PasswordInput/PasswordInput';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetNewPassword } from '../../service/service';
import ResetPasswordPopup from './ResetPasswordPopup';

import PasswordStrengthBar from "../../component/passwordStrengthCheck";

function ChangePassword() {
  const [isLoading, setIsLoading] = useState(false)
  const [inputData, setInputData] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const HandleSubmit = (event) => {
    event.preventDefault();

    // Perform validation before submitting the form
    const { password, newPassword, confirmPassword } = inputData;
    let passwordError = !password ? 'Please enter your current password.' : '';
    let newPasswordError = !newPassword ? 'Please enter a new password.' : '';
    let confirmPasswordError = !confirmPassword ? 'Please confirm your new password.' : (confirmPassword === newPassword ? '' : 'Passwords do not match.');

    if (!newPassword) {
      newPasswordError = 'Please enter a new password.';
    } else if (newPassword.length < 8) {
      newPasswordError = 'Password must be at least 8 characters long.';
      // eslint-disable-next-line
    } else if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      newPasswordError = 'Invalid password';
    } else if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword)) {
      newPasswordError = 'Invalid password';
    }

    if (passwordError || newPasswordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError
      });
      return;
    }

    // Proceed with form submission if all validations pass
    setIsLoading(true);
    const data = {
      oldPassword: password,
      newPassword: newPassword
    }
    SetNewPassword(data).then((result) => {
      if (result.success) {
        setIsLoading(false);
        setInputData({
          password: '',
          newPassword: '',
          confirmPassword: ''
        });
        setErrors({
          password: '',
          newPassword: '',
          confirmPassword: ''
        });
        // toast.success(result.message, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000,
        // });
        openModal()
      } else {
        setIsLoading(false);
        toast.error(result.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }).catch((error) => {
      setIsLoading(false);
      console.log('error', error)
    })

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value; // Initialize updatedValue with the current value

    // Remove spaces if the input field is 'password' or 'newPassword'
    if (name === 'password' || name === 'newPassword' || name === 'confirmPassword') {
      updatedValue = value.replace(/\s/g, ''); // Remove spaces from the value
    }

    setInputData({
      ...inputData,
      [name]: updatedValue, // Use updatedValue instead of value
    });

    let errorMessage = '';
    switch (name) {
      case 'password':
        errorMessage = updatedValue ? '' : 'Please enter your current password.';
        break;
      case 'newPassword':
        errorMessage = updatedValue ? '' : 'Please enter a new password.';
        break;
      case 'confirmPassword':
        errorMessage = updatedValue ? (updatedValue === inputData.newPassword ? '' : 'Passwords do not match.') : 'Please confirm your new password.';
        break;
      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: errorMessage
    });
  }


  return (
    <>
      <ToastContainer />
      <form onSubmit={HandleSubmit} className='h-full'>
        <div className="  rounded-3xl  bg-[#fff] h-full">
          <h2 className="text-2xl font-bold tracking-tight text-[#0C0F14] sm:text-32">
            Change password
          </h2>

          <div className='pt-6 flex flex-col  gap-5'>
            <div className='text-sm font-semibold flex flex-col'>
              <label htmlFor="">Current password</label>
              <PasswordInput
                onChange={handleChange}
                value={inputData?.password}
                placeholder='Password'
                name='password'
              />
              {errors.password && <span className="text-red-500">{errors.password}</span>}
            </div>

            <div className='text-sm font-semibold flex flex-col'>
              <label htmlFor="">Enter new password</label>
              <PasswordInput
                onChange={handleChange}
                value={inputData?.newPassword}
                placeholder='Password'
                name='newPassword'
              />
              {errors.newPassword && <span className="text-red-500">{errors.newPassword}</span>}
            </div>
            {/* Password strength bar */}
            <PasswordStrengthBar password={inputData.newPassword} />
            <div className='text-sm font-semibold flex flex-col'>
              <label htmlFor="">Confirm new password</label>
              <PasswordInput
                onChange={handleChange}
                value={inputData?.confirmPassword}
                placeholder='Password'
                name='confirmPassword'
              />
              {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
            </div>
          </div>

          <div className='pt-6 '>
            <div className='text-sm font-semibold flex flex-col '>
              {/* {isShowBtn && ( */}
                <div className="pt-6 flex flex-col lg:flex-row gap-5 justify-end">
                  <div className="text-sm font-semibold flex flex-col w-24">
                    <button
                      // onClick={() => setIsShowBtn(false)}
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
              {/* )} */}
              {/* <button disabled={isLoading} type='submit' className='bg-primaryPurple text-white hover:bg-opacity-90 py-3 px-2 rounded-lg disabled:opacity-50 '>Confirm change password</button> */}
            </div>

          </div>

        </div>

      </form>

      <ResetPasswordPopup
        isOpen={isOpen}
        closeModal={closeModal}

      />
    </>
  )
}

export default ChangePassword