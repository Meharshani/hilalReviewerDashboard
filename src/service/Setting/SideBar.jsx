
import React from 'react'
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { AboutIconDark, AboutIconLight, HelpCenterIcon, LogoutRedIcon, RightArrowDark, RightArrowLight, SettingIconDark, SettingIconLight, ShareIcon, SubscriptionIconDark, SubscriptionIconLight, SunIcon } from '../../assets/custom-icon';
// import { UserCircleIcon } from '@heroicons/react/24/outline';
import avatar from '../../assets/avatar-img.svg'
function SideBar() {
    const currentPath = window.location.pathname;
    const UserData = JSON.parse(localStorage.getItem('user_Data'))
    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#7147B4',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));
    return (
        <div className='border-[1px] border-[#D7D9E4] rounded-3xl bg-[#fff] py-5'>
            <div className="px-5">
                <h2 className="text-2xl font-bold tracking-tight text-[#0C0F14] sm:text-32 border-[#D7D9E4] border-b-[1px] leading-normal pb-[30px]">
                    Account Setting
                </h2>
                <div className='pt-[30px] flex flex-col sm:flex-row items-center gap-4'>
                    <span className='flex relative'>
                       {
                        UserData?.image ?
                         <img
                         className='rounded-full w-[80px] h-[80px] object-cover'
                         src={UserData?.image}
                         alt='avatar' />
                         :
                         
                         <img
                         className='rounded-full w-[80px] h-[80px] object-cover'
                         src={avatar}
                         alt='avatar' />
                       }

                    </span>
                    <div className='text-base font-semibold text-center sm:text-left space-y-2'>
                        <div className='text-xl font-semibold'>{UserData?.fullName}</div>
                        <div className='text-[#6F7889] flex'>ID: 2895 <span><svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M14.7764 7V7C14.7764 6.06812 14.7764 5.60218 14.6241 5.23463C14.4211 4.74458 14.0318 4.35523 13.5417 4.15224C13.1742 4 12.7083 4 11.7764 4H8.77637C6.89075 4 5.94794 4 5.36215 4.58579C4.77637 5.17157 4.77637 6.11438 4.77637 8V11C4.77637 11.9319 4.77637 12.3978 4.92861 12.7654C5.1316 13.2554 5.52094 13.6448 6.011 13.8478C6.37854 14 6.84448 14 7.77637 14V14" stroke="#6F7889" strokeWidth="1.6" />
                            <rect x="10.7764" y="10" width="10" height="10" rx="2" stroke="#6F7889" strokeWidth="1.6" />
                        </svg></span></div>

                    </div>
                    <div className='px-[9px] py-[6px] bg-[#D9FFE1] rounded-[64px] text-[#098C26] flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
                            <path d="M7.92512 11.0001L10.606 13.6809L15.0741 8.31922M19.5421 11.0001C19.5421 15.4419 15.9414 19.0426 11.4996 19.0426C7.0578 19.0426 3.45703 15.4419 3.45703 11.0001C3.45703 6.55829 7.0578 2.95752 11.4996 2.95752C15.9414 2.95752 19.5421 6.55829 19.5421 11.0001Z" stroke="#098C26" strokeWidth="1.42979" strokeLinecap="round" />
                        </svg>
                        Verified
                    </div>
                </div>
            </div>
            <div className='pt-6'>

                <Link to="/about-us" className={`flex justify-between my-2 items-center px-4 py-4 ${currentPath === '/about-us' ? 'bg-primaryPurple text-white' : ''} `}>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                            {
                                currentPath === '/about-us' ?
                                    <AboutIconLight />
                                    :
                                    <AboutIconDark />
                            }
                        </span>
                        <span>About HilalFolio </span>
                    </div>
                    <div>
                        {
                            currentPath === '/about-us' ?
                                <RightArrowLight />
                                :
                                <RightArrowDark />
                        }

                    </div>
                </Link>
                <Link to="/subscription" className={`flex justify-between my-2 items-center px-5 py-4 border-[#D7D9E4] border-t-[1px] ${currentPath === '/subscription' ? 'bg-primaryPurple text-white' : ''}`}>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                            {
                                currentPath === '/subscription' ?
                                    <SubscriptionIconLight />
                                    :
                                    <SubscriptionIconDark />
                            }

                        </span>
                        <span>My Subscription</span>
                    </div>
                    <div>
                        {
                            currentPath === '/subscription' ?
                                <RightArrowLight />
                                :
                                <RightArrowDark />
                        }
                    </div>
                </Link>
                <div className='flex justify-between my-2 items-center px-5 py-4 border-[#D7D9E4] border-t-[1px]'>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                          <SunIcon/>
                        </span>
                        <span>Dark Mode</span>
                    </div>
                    <div>
                        <IOSSwitch />

                    </div>
                </div>
                <Link to="/settings" className={`flex justify-between my-2 items-center px-5 py-4 border-[#D7D9E4] border-t-[1px] ${currentPath === '/settings' ? 'bg-primaryPurple text-white' : ''}`}>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>

                            {
                                currentPath === '/settings' ?
                                    <SettingIconLight />
                                    :
                                    <SettingIconDark />
                            }
                        </span>
                        <span>Settings</span>
                    </div>
                    <div>
                        {
                            currentPath === '/settings' ?
                                <RightArrowLight />
                                :
                                <RightArrowDark />
                        }
                    </div>
                </Link>
                <div className='flex justify-between my-2 items-center px-5 py-4 border-[#D7D9E4] border-t-[1px]'>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                         <HelpCenterIcon/>
                        </span>
                        <span>Help Center</span>
                    </div>
                    <div>
                        {
                            currentPath === '/help-center' ?
                                <RightArrowLight />
                                :
                                <RightArrowDark />
                        }
                    </div>
                </div>
                <div className='flex justify-between my-2 items-center px-5 py-4 border-[#D7D9E4] border-t-[1px]'>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                          <ShareIcon/>
                        </span>
                        <span>Share with friends</span>
                    </div>
                    <div>

                        <RightArrowDark />

                    </div>
                </div>
                <div className='flex justify-between my-2 items-center px-5 py-4 '>
                    <div className='flex gap-2 text-base font-semibold'>
                        <span>
                         <LogoutRedIcon/>
                        </span>
                        <span className='text-[#CD0000]'>Logout</span>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default SideBar