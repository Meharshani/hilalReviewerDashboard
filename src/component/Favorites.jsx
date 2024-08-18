import React, { useEffect, useState } from 'react'

import { UpGraphGreen, UpIconGreen, UpIconRed } from '../assets/custom-icons'

import { Link, useNavigate } from "react-router-dom";

import { HaramlIcon, HilalIcon, NoStatuslIcon } from "../assets/custom-icon";
import { LinearProgress } from "@mui/material";
import { GetFavData, RemoveFromFavorite } from '../service/service';
import Footer from './Footer,';
import NavBar from './Navbar';
import TbaleDropDown from './Home/TbaleDropDown';
import { useGlobalState } from '../context/context';
// import MarketCapSection from './Home/MarketCapSection';
function Favorites() {
  const [CoinsData, setCoinsData] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedRank, setSelectedRank] = useState('All');
  const [selectedPercentage, setSelectedPercentage] = useState('All');
  const [isLoading, setIsLoading] = useState(false)
  const [noDataFlag, setNoDataFlag] = useState(false)
  const { isLogedin } = useGlobalState();
  const statuses = ['All', 'Compliant', 'Not Compliant'];
  const rank = ['All', 'Top 10', 'Top 20', 'Top 100'];
  const percentageChange = ['All', '1h', '24h', '7d'];
  useEffect(() => {
    setIsLoading(true)
    let number = null;
    if (selectedRank !== 'All') {
      number = parseInt(selectedRank.match(/\d+/)[0], 10);
    }
    GetFavData(selectedStatus, number, selectedPercentage).then((result) => {
      setIsLoading(false)
      if (result.success) {
        // console.log(result?.body?.coins)
        const sortedData = result?.body?.coins?.sort((a, b) => a.cmc_rank - b.cmc_rank);
        const formattedCoins = sortedData.map(item => {
          const price = item?.quote?.USD?.price?.toFixed(2);
          const high = item?.periods?.['24h']?.quote?.USD?.high?.toFixed(2);
          const low = item?.periods?.['24h']?.quote?.USD?.low?.toFixed(2);
          const percentChange = item?.periods?.['24h']?.quote?.USD?.percent_change?.toFixed(2);

          return {
            ...item,
            formattedPrice: `$${numberWithCommas(price)}`,
            formattedHigh: high !== undefined ? `$${numberWithCommas(high)}` : 'N/A',
            formattedLow: low !== undefined ? `$${numberWithCommas(low)}` : 'N/A',
            percentChange: percentChange !== undefined ? `${numberWithCommas(percentChange)}%` : 'N/A'
          };
        });
        setCoinsData(formattedCoins)
        if (result?.body?.coins?.length === 0) {
          setNoDataFlag(true)
        }
        else {
          setNoDataFlag(false)
        }
      }
    })
  }, [selectedStatus, selectedRank, selectedPercentage])



  const headCells = [

    {
      id: 'Name',

    },
    {
      id: 'Status',
    },
    {
      id: '24h%',
    },
    {
      id: 'Price',
    },
    {
      id: '24h High Price',
    },
    {
      id: '24h Low Price',
    },
    {
      id: 'Chart',
    },
  ]

  const navigation = useNavigate()
  const viewDetail = (obj) => {
    navigation('/btc-chart', { state: obj });
  }

  const toggleFavorites = (e, index) => {
    e.stopPropagation()

    const data = { symbols: [CoinsData[index]?.symbol] }
    RemoveFromFavorite(data).then((result) => {
      console.log(result)
      const updatedCoinsData = CoinsData.filter((_, idx) => idx !== index);
      setCoinsData(updatedCoinsData);
      if (updatedCoinsData?.length === 0) {
        setNoDataFlag(true)
      }
    })

  }


  const numberWithCommas = (number) => {
    if (typeof (number) === "string") {
      return parseFloat(number)?.toLocaleString()
    }
    else {

      return number?.toLocaleString();
    }
  };
  return (
    <>
      <div className="min-h-full bg-[#F2F2F2]">
        <NavBar />
        <div className="bg-[#F2F2F2]">
          
          <section className='pt-6 sm:pt-8'>
            <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
              <div className="border-[2px] border-[#D7D9E4] rounded-3xl px-4 sm:px-8 py-6 bg-white">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[30px]">
              My Favorites
            </h2>
            <p className="text-base text-gray-600 mt-1">Your current cryptocurrency summary and activity.</p>
                <div className="py-5 flex flex-wrap gap-5">
                  <div className="px-6 py-2 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-base font-normal w-[116px]">USD<span className="text-[#747474]">/BTC</span></div>
                  <TbaleDropDown
                    value={selectedRank}
                    onChange={setSelectedRank}
                    placeholder='Select Rank'
                    dataArray={rank}
                  />
                  <TbaleDropDown
                    value={selectedPercentage}
                    onChange={setSelectedPercentage}
                    placeholder='Percentage Change'
                    dataArray={percentageChange}
                  />
                  <TbaleDropDown
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    placeholder='Shariah Status'
                    dataArray={statuses}
                  />
                </div>
                <div className="overflow-x-auto table_parent h-[70vh] ">
                  <table className="w-full text-left relative">
                    <thead className="text-base text-[#747474] bg-white sticky top-[-1px] z-[5]">
                      <tr>
                        {
                          isLogedin &&
                          <th scope="col" className="px-0 font-semibold whitespace-nowrap ">
                            <div className="px-2 py-5 border-y-[1px] border-[#D7D9E4] h-[66px]">

                            </div>

                          </th>
                        }
                        <th scope="col" className="px-0 font-semibold whitespace-nowrap ">
                          <div className="px-2 py-5 border-y-[1px] border-[#D7D9E4] h-[66px] text-center">
                            #
                          </div>

                        </th>
                        {headCells?.map((item) => (

                          (item.id === 'Status' && !isLogedin) ? null :
                            (
                              <th key={item.id} scope="col" className="px-0 font-semibold ">
                                <div className={`${item?.id === 'Name' ? 'pl-14' : 'pl-6 text-center  whitespace-nowrap'}  px-6 py-5 border-y-[1px] border-[#D7D9E4]`}>
                                  {item.id}
                                </div>
                              </th>
                            )
                        ))}

                      </tr>
                    </thead>

                    <tbody>
                      {
                        !isLoading &&
                        CoinsData?.map((item, index) => (

                          <tr
                            onClick={() => viewDetail(item)}
                            key={index + '-item'} className="text-base font-semibold cursor-pointer">

                            {
                              isLogedin &&
                              <td className="px-2 py-5">
                                <span
                                  onClick={(e) => toggleFavorites(e, index)}
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.693 17.2191L7.8026 19.5653C7.65773 19.6499 7.51255 19.6855 7.36705 19.672C7.22153 19.6585 7.0898 19.6095 6.97185 19.5249C6.85391 19.4403 6.7629 19.3297 6.6988 19.1932C6.63468 19.0566 6.62442 18.9057 6.66802 18.7403L7.7007 14.323L4.2661 11.3499C4.1379 11.2384 4.05617 11.1092 4.02092 10.9625C3.98567 10.8157 3.99496 10.673 4.0488 10.5346C4.10265 10.3961 4.18021 10.283 4.2815 10.1952C4.38278 10.1073 4.52124 10.05 4.69687 10.023L9.22955 9.6269L10.9891 5.45575C11.0532 5.30063 11.1504 5.18589 11.2805 5.11152C11.4106 5.03717 11.5481 5 11.693 5C11.8378 5 11.9753 5.03717 12.1055 5.11152C12.2356 5.18589 12.3327 5.30063 12.3968 5.45575L14.1564 9.6269L18.6891 10.023C18.8647 10.05 19.0032 10.1073 19.1044 10.1952C19.2057 10.283 19.2833 10.3961 19.3371 10.5346C19.391 10.673 19.4003 10.8157 19.365 10.9625C19.3298 11.1092 19.248 11.2384 19.1198 11.3499L15.6852 14.323L16.7179 18.7403C16.7615 18.9057 16.7513 19.0566 16.6871 19.1932C16.623 19.3297 16.532 19.4403 16.4141 19.5249C16.2961 19.6095 16.1644 19.6585 16.0189 19.672C15.8734 19.6855 15.7282 19.6499 15.5833 19.5653L11.693 17.2191Z" fill="#F7931A" />
                                  </svg>
                                </span>
                              </td>
                            }
                            <td className="px-2 py-5 text-center"><span className="bg-[#EBEBEB] rounded px-2 py-[4px] text-lightSecondaryText text-[14px] font-medium">
                              {index + 1}
                            </span></td>
                            <td className="px-6 py-5 max-w-[150px]">
                              <div className="flex items-center gap-x-2">
                                <img
                                  src={item?.logo}
                                  alt="logo"
                                  className="w-8 rounded-full bg-gray-50"
                                />
                                <div className="text-sm leading-6">
                                  <p>
                                    <Link to="">
                                      <span className="text-base font-semibold">

                                        {item?.symbol}
                                      </span>
                                    </Link>
                                  </p>
                                  <p className="text-[14px] font-medium text-lightSecondaryText ">
                                    {item?.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            {
                              isLogedin &&
                              <td className="px-6 py-5 text-center">
                                {
                                  item?.shariahStatus === 'Compliant' ?
                                    <div>
                                      <span className="flex items-center gap-[2px] text-[#098C26]">
                                        <HilalIcon />
                                        Halal
                                      </span>
                                      <div className="text-[14px] text-lightSecondaryText whitespace-nowrap font-medium text-left">View Report</div>
                                    </div>
                                    :
                                    item?.shariahStatus === 'Not Compliant' ?
                                      <div>
                                        <span className="flex items-center gap-[2px] text-[#CD0000]">
                                          <HaramlIcon />
                                          Haram
                                        </span>
                                        <div className="text-[14px] text-lightSecondaryText whitespace-nowrap font-medium text-left">View Report</div>
                                      </div>
                                      :
                                      <div>
                                        <span className="flex items-center gap-[2px] text-lightSecondaryText whitespace-nowrap">
                                          <NoStatuslIcon />
                                          No Status
                                        </span>
                                        <div className="text-[14px] text-lightSecondaryText whitespace-nowrap font-medium text-left">Request Report</div>
                                      </div>
                                }

                              </td>
                            }

                            <td className="px-6 py-5 text-center">

                              <span key={index} className={`flex items-center justify-center gap-[2px] ${item?.periods?.['24h']?.quote?.USD?.percent_change !== undefined && item.periods['24h'].quote.USD.percent_change >= 0
                                ? 'text-lightThemeSuccess'
                                : 'text-lightThemeDelete'
                                }`}>
                                {item?.periods?.['24h']?.quote?.USD?.percent_change !== undefined && item.periods['24h'].quote.USD.percent_change >= 0 ? (
                                  <UpIconGreen/>
                                ) : (
                                  <UpIconRed className="rotate-180" />
                                )}
                                {item?.percentChange}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-center">{item?.formattedPrice}</td>
                            <td className="px-6 py-5 text-center text-lightThemeSuccess">{item?.formattedHigh}</td>
                            <td className="px-6 py-5 text-center text-lightThemeDelete"> {item?.formattedLow}</td>
                            <td className="px-6 py-5 text-center">
                              <UpGraphGreen />
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                  {
                    !isLoading && noDataFlag &&
                    <div className="text-center text-primaryDark text-base font-semibold py-4">
                      No Record Found
                    </div>
                  }
                  {
                    isLoading &&
                    <div className="w-screen">

                      <LinearProgress color="primary" />

                    </div>
                  }
                </div>

              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Favorites