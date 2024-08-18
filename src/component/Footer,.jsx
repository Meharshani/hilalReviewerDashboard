import React from 'react'
import logo from "../assets/Logo-new.png"
import { Link } from 'react-router-dom'
import { FacebookIcon, GooglePlusIcon, TwitterIcon } from '../assets/custom-icon'
function Footer() {
    const quickLinks = [


        {
            name: 'About Us',
            href: '/about-us'
        },
        {
            name: 'Blog',
            href: '/blog'
        },
        {
            name: 'Team',
            href: '#'
        },
        {
            name: 'Career',
            href: '#'
        },
        {
            name: 'Contact',
            href: '/contact-us'
        },



    ]
    const companyLink = [


        {
            name: 'Privacy',
            href: '#'
        },
        {
            name: 'Support',
            href: '#'
        },
        {
            name: 'Help Desk',
            href: '#'
        },
        {
            name: 'FAQ',
            href: '#'
        },




    ]
    return (
        <footer id='main-footer' className='bg-white px-2 xs:px-5 pt-8 lg:pt-[60px] mt-6 sm:mt-12'>
            <div className="2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto">
                <div className='flex flex-col md:flex-row gap-y-6 justify-between text-whiteGrey'>
                    <div className='space-y-6'>

                        <div>
                            <Link
                                to="/"
                            >
                                <span className="sr-only">HilalFolio</span>
                                <img className="w-[166px]" src={logo} alt="HilalFolio" />
                            </Link>
                        </div>
                        {/* <div className='leading-7 text-base font-normal max-w-48 text-lightSecondaryText'>
                        Be sure to take a look at our Terms of Use and Privacy Policy
                        </div> */}
                        <div className='flex flex-wrap items-center gap-x-8 mt-8 text-gray-600 font-semibold text-base'>

                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Overview
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Features
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Pricing
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Careers
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Help
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                    {/* <div>
                        <div className='text-lg font-bold text-primaryDark'>
                        About
                        </div>
                        <ul className='flex mt-3 h-24 md:h-[unset] flex-col gap-y-[10px] lg:gap-x-[55px] flex-wrap max-h-[200px] text-lightSecondaryText'>

                            {
                                quickLinks.map((obj) => (
                                    <li key={obj.name}>
                                        <Link to={obj?.href} className="text-base font-normal leading-7 hover:text-primaryDark text-whiteGrey flex items-center">
                                            {obj.name}
                                        </Link>
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                    <div>
                        <div className='text-lg font-bold text-primaryDark'>
                        Company
                        </div>
                        <ul className='flex mt-3 h-24 md:h-[unset] flex-col gap-y-[10px] lg:gap-x-[55px] flex-wrap max-h-[200px] text-lightSecondaryText'>

                            {
                                companyLink.map((obj) => (
                                    <li key={obj.name}>
                                        <Link to={obj?.href} className="text-base font-normal leading-7 hover:text-primaryDark text-whiteGrey flex items-center">
                                            {obj.name}
                                        </Link>
                                    </li>
                                ))
                            }

                        </ul>
                    </div> */}
                    <div>
                        <div className='text-sm font-bold text-gray-900'>
                            Stay up to date
                        </div>
                        <div className='flex flex-col xs:flex-row items-center gap-2 mt-4'>
                            <input type="text"
                                className='p-4 w-full outline-none h-[50px] border-[1px] border-[#D7D9E4] rounded-lg bg-transparent'
                                placeholder='Your email'
                            />
                            <button
                                className="bg-primaryPurple w-full xs:w-28 text-white font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 text-center rounded-lg disabled:opacity-50  z-[1]"
                            >
                                Subscribe
                            </button>
                        </div>



                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-center gap-x-8 border-t-[1px] border-[#D7D9E4] mt-10 pt-8 pb-10 justify-between'>
                    <div className='text-gray-500 text-base font-normal'>
                        © 2024 Hilalfolio. All rights reserved
                    </div>
                    <div className='flex text-gray-500 text-base items-center gap-x-4'>
                           
                           <Link
                               to={'/'}
                               target="_blank"
                           >
                             Terms
                           </Link>
                           <Link
                               to={'/'}
                               target="_blank"
                           >
                               Privacy
                           </Link>
                           <Link
                               to={'/'}
                               target="_blank"
                           >
                              Cookies
                           </Link>
                          
                       </div>
                    <div className='flex items-center gap-x-8'>
                           
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                <TwitterIcon
                                className="w-6 fill-slate-500"
                                />
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                <FacebookIcon
                                className="w-5 fill-slate-500"
                                />
                            </Link>
                            <Link
                                to={'/'}
                                target="_blank"
                            >
                                <GooglePlusIcon
                                className="w-8 fill-slate-500"
                                />
                            </Link>
                           
                        </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer