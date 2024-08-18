import { useState, Fragment, useEffect } from "react";
import { Menu, Transition, Popover, Dialog } from "@headlessui/react";
import logo from "../assets/header11.png";
import { ArrowRightEndOnRectangleIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { BellNotificationIcon, CartIcon, DeleteIcon, GreenDot, SearchIcon, SunIcon } from "../assets/custom-icon";
// import img from "../assets/image 4.png"
import { useGlobalState } from "../context/context";
import TrendingBar from "./TrendingBar";
import SearchModal from "./SearchModal";
import { url } from '../environment'
const NavBar = ({ refresh, setShowAssets, setshowPayement, }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [Total, setTotal] = useState(0);
  const [cartOpen, setcartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false)

  const { cartItem, setCartItems, isLogedin, setIsLogedin, userData, setuserData } = useGlobalState();
  const currentPath = window.location.pathname;
  useEffect(() => {
    //refresh (in dependency array) is using to get latest data after updating data from settings

    const UserData = JSON.parse(localStorage.getItem('user_Data'))
    const token = localStorage.getItem('user_token');
    if (token) {
      setuserData(UserData)
    }
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    setCartItems(cartItems ?? [])
    getPaymentTotal()

    // eslint-disable-next-line
  }, [refresh, cartOpen])
  const removeCoinFromCart = (coinToRemove) => {

    // Ensure that coinToRemove is not null or undefined
    if (!coinToRemove) {
      console.error('coinToRemove must be provided');
      return;
    }

    // Retrieve current cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems) {

      // Filter out the item with the specified ID
      const updatedCartItems = cartItems?.filter(item => item._id !== coinToRemove._id);

      // Update local storage with the updated cart items
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));


      setCartItems(updatedCartItems);
      getPaymentTotal()

    }

  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_Data');
    setIsLogedin(false);
    setuserData({})
    navigate('/')
  };
  const GotoCoinsSelction = () => {
    if (currentPath === "/odr") {

      setcartOpen(false)
      setshowPayement(false)
      setShowAssets(true)
    }
    else {

      navigate('/odr', {
        state: {
          showAssets: true
        }
      })


    }

  }
  const handleCheckout = () => {
    if (currentPath === "/odr") {

      setcartOpen(false)
      setshowPayement(true)
    }
    else {

      navigate('/odr', {
        state: {
          showPayment: true
        }
      })
    }
  }


  const getPaymentTotal = (e) => {

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let symbols = cartItems?.map((item) => item.symbol)
    fetch(`${url}/api/payment/calculate`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`

      },
      body: JSON.stringify({
        symbols: symbols ?? [],
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setTotal(res.body.total)
      })
      .catch((error) => {

      });
  };

  return (
    <>

      <div className='bg-white hidden lg:block'>

        {/* <marquee width="100%" direction="left" behavior="scroll" scrollamount="3">
          <TrendingBar/>
        </marquee> */}
        <div style={{ overflow: 'hidden', width: '100%', display: 'flex', justifyContent: 'end' }}>
          <div className="trending-bar-container">
            <TrendingBar />
          </div>
        </div>

      </div>
      <header
        id="main-header"
        className={`bg-white border-y-[1px] border-[#D7D9E4] ${!mobileMenuOpen && "z-50"
          }`}
      >
        <nav
          className="2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md  mx-auto flex  items-center justify-between p-6 lg:py-[18px] lg:px-0"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 z-[1]">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Shariah</span>
              <img className="h-auto  w-[137px]" src={logo} alt="Shariah" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 bg-primaryPurple text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
              >
                <rect
                  width="18.4868"
                  height="2.77302"
                  rx="1.38651"
                  fill="#F9F9F9"
                />
                <rect
                  x="6.47021"
                  y="8.31982"
                  width="17.5624"
                  height="2.77302"
                  rx="1.38651"
                  fill="#F9F9F9"
                />
                <rect
                  y="16.6382"
                  width="18.4868"
                  height="2.77302"
                  rx="1.38651"
                  fill="#F9F9F9"
                />
              </svg>
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-5 xl:gap-x-8 px-4">
            <Link
              to="/"
              className={`text-base font-semibold rounded-lg px-3 py-2 leading-normal ${currentPath === "/"
                ? 'text-white bg-primaryPurple' : 'text-lightThemeSecondary'} flex items-center`}
            >
              Home
            </Link>
            <Link
              to="/odr "
              className={`text-base font-semibold rounded-lg px-3 py-2 leading-normal ${currentPath === "/odr"
                ? 'text-white bg-primaryPurple' : 'text-lightThemeSecondary'} flex items-center`}
            >
              ODR
            </Link>
            <Link
              to="/hilalbot"
              className={`text-base font-semibold rounded-lg px-3 py-2 leading-normal ${currentPath === "/hilalbot"
                ? 'text-white bg-primaryPurple' : 'text-lightThemeSecondary'} flex items-center`}
            >
              HilalBot
            </Link>
            <Link
              to="/favorites"
              className={`text-base font-semibold rounded-lg px-3 py-2 leading-normal ${currentPath === "/favorites"
                ? 'text-white bg-primaryPurple' : 'text-lightThemeSecondary'} flex items-center`}
            >
              Favorites
            </Link>



          </Popover.Group>


          <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-2 mr-4">
            {
              // currentPath === "/" &&

              <div className="p-2 relative">
                <SearchIcon className="cursor-pointer" onClick={() => setShowSearch(true)} />
                {
                  showSearch &&
                  // <div className="border-lightThemeOutline border-[1px] hidden lg:flex lg:flex-1  rounded-lg p-3 h-10 items-center mr-4">
                  //   <SearchIcon />
                  //   <input
                  //     value={searchQuery}
                  //     onChange={(e) => setSearchQuery(e.target.value)}
                  //     placeholder="Search here" className="outline-none border-none px-2 w-full" />
                  //   <XMarkIcon
                  //     onClick={clearSearch}
                  //     class="h-6 w-6 cursor-pointer text-gray-500" />
                  // </div>]
                  <SearchModal setSearchOpen={setShowSearch} />
                }
              </div>
            }
            {
              isLogedin &&
              <>
                <div className="p-2 ">
                  <BellNotificationIcon />

                </div>
                <div className="p-2 ">
                  <span className="relative" role="button" onClick={() => setcartOpen(true)}>
                    <CartIcon />
                    {
                      cartItem?.length > 0 &&
                      <GreenDot className="absolute top-0 right-0" />
                    }
                  </span>
                </div>
              </>
            }
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 cursor-pointer size-10 flex items-center">
              {
                isDarkMode ?

                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.56851 13.3984C4.11418 14.9441 5.99759 15.7169 8.21873 15.7169C10.125 15.7169 11.8085 15.1171 13.2695 13.9176C14.7304 12.7181 15.6273 11.1965 15.9603 9.3528C16.0035 9.1701 15.9972 9.01115 15.9413 8.87594C15.8854 8.74073 15.7999 8.63405 15.6848 8.55593C15.5812 8.4778 15.4561 8.42883 15.3094 8.409C15.1628 8.38915 15.0126 8.41289 14.8587 8.4802C14.5438 8.63405 14.1766 8.76926 13.7572 8.88583C13.3377 9.00241 12.8978 9.0607 12.4375 9.0607C10.901 9.0607 9.59501 8.52294 8.51948 7.44743C7.44395 6.3719 6.90618 5.0659 6.90618 3.52943C6.90618 3.11063 6.95306 2.71147 7.04681 2.33193C7.14056 1.95239 7.28418 1.58654 7.47768 1.23438C7.57263 1.06852 7.6117 0.902357 7.59487 0.735889C7.57804 0.56942 7.52275 0.427895 7.429 0.311317C7.33525 0.194739 7.21326 0.106998 7.06302 0.0480915C6.91279 -0.0107992 6.73911 -0.0156036 6.54199 0.0336776C4.63695 0.449553 3.11203 1.37684 1.96722 2.81554C0.822406 4.25423 0.25 5.89844 0.25 7.74818C0.25 9.96932 1.02284 11.8527 2.56851 13.3984Z" fill="#667085" />
                  </svg>

                  :
                  <SunIcon />
              }
            </div>
          </div>
          <div className="bg-[#D0D5DD] w-[1px] mr-4 h-6">

          </div>
          <div className="relative hidden lg:flex p-2 mr-4">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button>
                    <div className="flex items-center justify-center gap-x-3">
                      <div className="flex items-center text-base font-medium">
                        {t('Languages')}

                      </div>
                      {/* <div>{userData?.fullName}</div> */}
                      <div className="flex items-center">
                        <svg
                          className="w-[16px] h-[12px]"
                          xmlns="http://www.w3.org/2000/svg"
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M5.57253 6.69703L9.3327 2.1221C9.38457 2.05899 9.42542 1.98853 9.45525 1.91071C9.48508 1.83287 9.5 1.74947 9.5 1.66052C9.5 1.48262 9.45056 1.32806 9.35168 1.19684C9.25281 1.06561 9.1225 1 8.96073 1L1.03927 1C0.877501 1 0.747186 1.06624 0.648323 1.19872C0.549439 1.33123 0.499999 1.4858 0.499999 1.66245C0.499999 1.70663 0.555843 1.85995 0.667534 2.12239L4.42746 6.69707C4.5139 6.80223 4.60324 6.87901 4.6955 6.92741C4.78779 6.9758 4.88928 7 5 7C5.11072 7 5.21221 6.9758 5.30449 6.92741C5.39675 6.87901 5.4861 6.80222 5.57253 6.69703Z"
                            fill="#0C0F14"
                          />
                        </svg>
                      </div>
                    </div>
                  </Menu.Button>

                  {open && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="z-10 bgWhite border bg-white w-56 border-gray-300 absolute right-0 top-8 mt-2 rounded-md shadow-lg focus:outline-none"
                      >
                        <div className="px-1 py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active
                                  ? "bg-primaryPurple text-white"
                                  : "text-black"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-base font-semibold`}
                                onClick={() => changeLanguage('en')}
                              >

                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                                {/* <UserCircleIcon className="h-6 w-6 mr-2 text-primaryDark" /> */}

                                {t('English')}

                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${active
                                  ? "bg-primaryPurple text-white"
                                  : "text-black"
                                  } group flex w-full items-center rounded-md px-2 py-2 text-base font-semibold`}
                                onClick={() => changeLanguage('fr')}
                              >

                                <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#fff"></rect><path d="M1.638,5.847H30.362c-.711-1.108-1.948-1.847-3.362-1.847H5c-1.415,0-2.651,.739-3.362,1.847Z" fill="#bc271a"></path><path d="M1.031,7.692c-.008,.103-.031,.202-.031,.308v1.539H31v-1.539c0-.105-.023-.204-.031-.308H1.031Z" fill="#bc271a"></path><path fill="#bc271a" d="M1 11.384H31V13.231H1z"></path><path fill="#bc271a" d="M1 15.077H31V16.924H1z"></path><path fill="#bc271a" d="M1 18.769H31V20.616H1z"></path><path d="M1,24c0,.105,.023,.204,.031,.308H30.969c.008-.103,.031-.202,.031-.308v-1.539H1v1.539Z" fill="#bc271a"></path><path d="M30.362,26.153H1.638c.711,1.108,1.948,1.847,3.362,1.847H27c1.415,0,2.651-.739,3.362-1.847Z" fill="#bc271a"></path><path d="M16,4H5c-2.209,0-4,1.791-4,4v10.769h15V4Z" fill="#010062"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path fill="#f6cd46" d="M11.639 8.108L11.931 10.106 13.061 8.432 12.455 10.36 14.2 9.342 12.818 10.816 14.833 10.655 12.949 11.384 14.833 12.113 12.818 11.952 14.2 13.427 12.455 12.408 13.061 14.336 11.931 12.662 11.639 14.661 11.346 12.662 10.216 14.336 10.822 12.408 9.077 13.427 10.459 11.952 8.444 12.113 10.328 11.384 8.444 10.655 10.459 10.816 9.077 9.342 10.822 10.36 10.216 8.432 11.346 10.106 11.639 8.108z"></path><path d="M10,8.189c-1.764-.783-3.829,.013-4.612,1.777-.783,1.764,.013,3.829,1.777,4.612,.903,.4,1.932,.4,2.835,0-1.764,1.266-4.221,.862-5.487-.903s-.862-4.221,.903-5.487c1.37-.983,3.214-.983,4.584,0Z" fill="#f6cd46"></path></svg>

                                {t('Bahasa')}

                              </button>
                            )}
                          </Menu.Item>

                        </div>
                      </Menu.Items>
                    </Transition>
                  )}
                </>
              )}
            </Menu>
          </div>
          {isLogedin ? (
            <>
              <div className="relative hidden lg:flex p-2">

                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button>
                        <div className="flex items-center justify-center gap-x-3">
                          <div className="flex items-center">
                            {
                              userData?.image ?

                                <img
                                  className="w-10 h-10 rounded-full object-cover"
                                  src={userData?.image}
                                  alt="prifile icon"
                                />
                                :
                                <UserCircleIcon className="h-10 w-10 text-primaryDark" />
                            }
                          </div>
                          {/* <div>{userData?.fullName}</div> */}
                          {/* <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                            >
                              <path
                                d="M5.57253 6.69703L9.3327 2.1221C9.38457 2.05899 9.42542 1.98853 9.45525 1.91071C9.48508 1.83287 9.5 1.74947 9.5 1.66052C9.5 1.48262 9.45056 1.32806 9.35168 1.19684C9.25281 1.06561 9.1225 1 8.96073 1L1.03927 1C0.877501 1 0.747186 1.06624 0.648323 1.19872C0.549439 1.33123 0.499999 1.4858 0.499999 1.66245C0.499999 1.70663 0.555843 1.85995 0.667534 2.12239L4.42746 6.69707C4.5139 6.80223 4.60324 6.87901 4.6955 6.92741C4.78779 6.9758 4.88928 7 5 7C5.11072 7 5.21221 6.9758 5.30449 6.92741C5.39675 6.87901 5.4861 6.80222 5.57253 6.69703Z"
                                fill="#0C0F14"
                              />
                            </svg>
                          </div> */}
                        </div>
                      </Menu.Button>

                      {open && (
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="z-10 bgWhite border bg-white w-56 border-gray-300 absolute right-0 top-8 mt-2 rounded-md shadow-lg focus:outline-none"
                          >
                            <div className="px-1 py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active
                                      ? "bg-primaryPurple text-white"
                                      : "text-black"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-base font-semibold`}
                                    onClick={() => navigate("/profile")}
                                  >


                                    <UserCircleIcon className="h-6 w-6 mr-2 text-primaryDark" />

                                    Profile
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active
                                      ? "bg-primaryPurple text-white"
                                      : "text-black"
                                      } group flex w-full items-center rounded-md px-2 py-2 text-base font-semibold`}
                                    onClick={handleSignOut}
                                  >
                                    {active ? (

                                      <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-5 text-white" />

                                    ) : (

                                      <ArrowRightEndOnRectangleIcon className="mr-2 h-5 w-5" />

                                    )}
                                    Sign Out
                                  </button>
                                )}
                              </Menu.Item>

                            </div>
                          </Menu.Items>
                        </Transition>
                      )}
                    </>
                  )}
                </Menu>
              </div>
            </>
          ) : (
            <div className='hidden lg:flex gap-4 justify-end text-base h-10'>
              <Link
                to="/sign-in"
                className="bg-primaryPurple text-white font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 text-center rounded-lg disabled:opacity-50  z-[1]"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="text-primaryPurple border-primaryPurple border-[1px] font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 text-center rounded-lg disabled:opacity-50  z-[1]"
              >

                Signup
              </Link>



            </div>
          )}

        </nav>

        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6  sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Hilalfolio</span>
                <img className="h-10 w-auto" src={logo} alt="Hilalfolio" />
              </Link>
              <div className="flex items-center xs:gap-3">
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    className="h-6 w-6 text-primaryDark"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    to='/'
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${currentPath === "/"
                      ? 'text-white bg-primaryPurple' : 'text-primaryDark'} hover:bg-gray-50`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/hilalbot"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    HilalBot
                  </Link>
                  <Link
                    to=''
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    ODR
                  </Link>
                  <Link
                    to=''
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Favorites
                  </Link>


                </div>
                {
                  isLogedin ?

                    <div className="border-t border-gray-700 pb-3 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          {
                            userData?.image ?

                              <img
                                className="h-10 w-10 rounded-full"
                                src={userData?.image}
                                alt="avatar"
                              />
                              :
                              <UserCircleIcon className="h-10 w-10 text-gray-500" />
                          }

                        </div>
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-primaryDark">
                            {userData?.fullName}
                          </div>
                          {/* <div className="text-sm font-medium leading-none text-primaryDark">
                      tom@example.com
                    </div> */}
                        </div>
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">View notifications</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <Link
                          to='/profile'
                          className="block rounded-md px-3 py-2 text-base font-medium text-primaryDark hover:bg-gray-700 hover:text-white"
                        >
                          Your Profile
                        </Link>

                        <Link
                          onClick={handleSignOut}
                          className="block rounded-md px-3 py-2 text-base font-medium text-primaryDark hover:bg-gray-700 hover:text-white"
                        >
                          Sign out
                        </Link>
                      </div>
                    </div>
                    :
                    <div className="space-y-4">
                      <Link
                        to="/sign-in"
                        className="text-primaryPurple h-10  border-primaryPurple border-[1px] font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 text-center rounded-lg disabled:opacity-50  z-[1]"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/sign-up"
                        className="bg-primaryPurple h-10 text-white font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 text-center rounded-lg disabled:opacity-50  z-[1]"
                      >
                        Sign up
                      </Link>
                    </div>
                }
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>


        <Dialog //popup for cart
          as="div"
          open={cartOpen}
          onClose={setcartOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 top-24 rounded-l-2xl max-h-[874px] round z-10 w-full max-w-[430px] bg-white px-6 py-6  sm:ring-1 sm:ring-gray-900/10 overflow-y-auto">
            <div className="flex items-baseline justify-between pb-6 border-b-[1px] border-lightThemeOutline">
              <div className="-m-1.5 p-1.5">
                <span className='text-30 font-bold'>Order Summary</span>
              </div>
              <div className="flex items-center xs:gap-3">
                <span className="text-sm font-semibold text-lightThemeSecondary">{`Total items ${cartItem?.length}`}</span>
              </div>
            </div>
            <div className="pb-6 mt-6 border-b-[1px] overflow-y-auto max-h-[274px] border-lightThemeOutline space-y-4">
              {cartItem?.map((item, index) => (
                <div key={index + '-item'} className="flex items-center gap-4">
                  <div className='flex flex-1 justify-between items-center gap-1 border-[1px] h-[75px] border-lightThemeOutline shadow-custom rounded-xl p-4'>
                    <div className='flex items-center gap-2'>

                      <div className="flex items-center gap-x-2">
                        <img
                          src={item?.logo}
                          alt="logo"
                          className="w-8 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                          <p>

                            <span className="text-base font-semibold">

                              {item?.symbol}
                            </span>

                          </p>
                          <p className="text-[14px] font-medium text-lightSecondaryText line-clamp-1">
                            {item?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      $10.00
                    </div>
                  </div>
                  <div onClick={() => removeCoinFromCart(item)} className="bg-[#FFE5E5] rounded-lg flex justify-center items-center min-h-[75px] w-[70px] cursor-pointer">
                    <DeleteIcon />
                  </div>
                </div>
              ))}
              {
                cartItem?.length === 0 &&
                <div className="bg-white w-full p-3 rounded-lg text-primaryPurple font-semibold text-base h-12 flex justify-center items-center ">
                  No item to show
                </div>
              }
            </div>
            {
              cartItem?.length > 0 &&

              <div className="pb-6 mt-6 border-b-[1px] border-lightThemeOutline space-y-4">
                <div className="text-lightThemeSecondary text-base font-medium flex justify-between items-center">
                  <div>
                    {'Discount (FRIENDS)'}
                  </div>
                  <div>
                    {'10% ($4.90)'}
                  </div>
                </div>
                <div className="text-lightThemeSecondary text-base font-medium flex justify-between items-center">
                  <div>
                    {'Express shipping'}
                  </div>
                  <div>
                    {'$3.99'}
                  </div>
                </div>
                <div className="text-primaryDark text-base font-semibold flex justify-between items-center">
                  <div>
                    {'Total'}
                  </div>
                  <div>
                    {Total ? Total : 0}
                  </div>
                </div>
              </div>
            }
            <div className="mt-6 space-y-4">
              <button
                disabled={cartItem?.length === 0}
                onClick={handleCheckout}
                className="bg-primaryPurple w-full p-3 rounded-lg text-white font-semibold text-base disabled:opacity-50 h-12 flex justify-center items-center hover:opacity-90">Checkout</button>
              <button
                onClick={GotoCoinsSelction}
                className="bg-white w-full p-3 rounded-lg text-primaryPurple font-semibold text-base disabled:opacity-50 h-12 flex justify-center items-center hover:opacity-90 hover:border-[1px] hover:bg-gray-50">
                Continue adding coins
              </button>

            </div>
          </Dialog.Panel>
        </Dialog>

      </header>
    </>
  );
};
export default NavBar;
