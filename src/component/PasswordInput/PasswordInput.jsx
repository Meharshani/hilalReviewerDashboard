import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function PasswordInput({ value, onChange, placeholder, ...otherProps }) {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='relative'>
    <input
        value={value}
        onChange={onChange}
        {...otherProps}
        className='p-4 w-full outline-none border-[1px] border-[#D7D9E4] rounded-lg bg-transparent mt-2' placeholder={placeholder} type={showPassword?`text`:'password'} />
        <span className='absolute right-2 top-[22px] cursor-pointer' onClick={()=>setShowPassword(!showPassword)}>
        {showPassword ? (
                 <VisibilityIcon />
            ) : (
           
              <VisibilityOffIcon />
            )}
        </span>
    </div>
  )
}

export default PasswordInput