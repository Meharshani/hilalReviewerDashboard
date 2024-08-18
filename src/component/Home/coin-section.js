import { UpGraphGreen, UpIconGreen, UpIconRed } from '../../assets/custom-icons'
import NewCarousel from './NewCarousel'
import { Link, useNavigate } from "react-router-dom";
import { AddToFavorite, RemoveFromFavorite } from "../../service/service";
import { HaramlIcon, HilalIcon, NoStatuslIcon } from "../../assets/custom-icon";
import { LinearProgress } from "@mui/material";
import TbaleDropDown from "./TbaleDropDown";
import { useGlobalState } from "../../context/context";

const CoinSecton = ({ searchQuery, isLogedin }) => {

  const { CoinsData, setCoinsData, selectedStatus, setSelectedStatus, selectedRank, setSelectedRank, selectedPercentage, setSelectedPercentage, isLoading, noDataFlag } = useGlobalState();
  const statuses = ['All', 'Compliant', 'Not Compliant'];
  const rank = ['All', 'Top 10', 'Top 20', 'Top 100'];
  const percentageChange = ['All', '1h', '24h', '7d'];


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
    //  console.log(CoinsData[index].favorite)
    if (!CoinsData[index].favorite) {
      const data = { symbols: [CoinsData[index]?.symbol] }
      addfav(data)
    }
    if (CoinsData[index].favorite) {
      const data = { symbols: [CoinsData[index]?.symbol] }
      removefav(data)
    }
    // Update the favorite key based on the index
    const updatedCoinsData = CoinsData?.map((coin, i) => {
      if (i === index) {
        // Toggle the favorite key

        return { ...coin, favorite: !coin.favorite };
      }
      return coin;
    });

    // console.log(updatedCoinsData)
    setCoinsData(updatedCoinsData);
  }
  const addfav = (data) => {
    AddToFavorite(data).then((result) => {
      console.log(result)
    })
  }
  const removefav = (data) => {
    RemoveFromFavorite(data).then((result) => {
      console.log(result)
    })
  }
  const filteredCoins = CoinsData && Array.isArray(CoinsData) ? CoinsData.filter(item =>
    (item.symbol && item.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  const GotoLogin = (e) => {
    e.stopPropagation()

    navigation('/sign-in')
  }
  return (
    <>
      {/* <MarketCapSection/> */}
      <section className='pt-6 sm:pt-8'>
        <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
          <div className="border-[2px] border-[#D7D9E4] rounded-3xl px-4 sm:px-8 py-8 bg-white">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-[30px]">
              Today's Cryptocurrency Prices by Market Cap
            </h2>
            <p className="text-base text-gray-600 mt-1">Your current cryptocurrency summary and activity.</p>
            <div className="py-6 flex flex-wrap gap-5">
              {/* <div className="px-6 py-2 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-base font-normal w-[116px]">USD<span className="text-[#747474]">/BTC</span></div> */}
              <TbaleDropDown
                value={selectedRank}
                onChange={setSelectedRank}
                placeholder='Select Rank'
                dataArray={rank}
              />
              <TbaleDropDown
                value={selectedPercentage}
                onChange={setSelectedPercentage}
                placeholder='Percentage'
                dataArray={percentageChange}
              />
              <TbaleDropDown
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder='Shariah Status'
                dataArray={statuses}
              />
            </div>
            <div className="overflow-x-auto table_parent h-[70vh]">
              <table className="w-full text-left relative">
                <thead className="text-base text-[#747474] bg-white sticky top-[-1px]">
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

                      // (item.id === 'Status' && !isLogedin) ? null :
                      (
                        <th key={item.id} scope="col" className="px-0 font-semibold ">
                          <div className={`${item?.id === 'Name' ? 'pl-14 text-left' : 'pl-6  whitespace-nowrap'} ${item.id === 'Status' ? 'text-left' : 'text-center'}  px-6 py-5 border-y-[1px] border-[#D7D9E4]`}>
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
                    filteredCoins?.map((item, index) => (

                      <tr
                        onClick={() => viewDetail(item)}
                        key={index + '-item'} className={`text-base font-semibold border-b-[1px] border-[#D7D9E4] cursor-pointer`}>

                        {
                          isLogedin &&
                          <td className="px-2 py-5">


                            <span
                              onClick={(e) => toggleFavorites(e, index)}
                            >
                              {

                                item?.favorite ?

                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.693 17.2191L7.8026 19.5653C7.65773 19.6499 7.51255 19.6855 7.36705 19.672C7.22153 19.6585 7.0898 19.6095 6.97185 19.5249C6.85391 19.4403 6.7629 19.3297 6.6988 19.1932C6.63468 19.0566 6.62442 18.9057 6.66802 18.7403L7.7007 14.323L4.2661 11.3499C4.1379 11.2384 4.05617 11.1092 4.02092 10.9625C3.98567 10.8157 3.99496 10.673 4.0488 10.5346C4.10265 10.3961 4.18021 10.283 4.2815 10.1952C4.38278 10.1073 4.52124 10.05 4.69687 10.023L9.22955 9.6269L10.9891 5.45575C11.0532 5.30063 11.1504 5.18589 11.2805 5.11152C11.4106 5.03717 11.5481 5 11.693 5C11.8378 5 11.9753 5.03717 12.1055 5.11152C12.2356 5.18589 12.3327 5.30063 12.3968 5.45575L14.1564 9.6269L18.6891 10.023C18.8647 10.05 19.0032 10.1073 19.1044 10.1952C19.2057 10.283 19.2833 10.3961 19.3371 10.5346C19.391 10.673 19.4003 10.8157 19.365 10.9625C19.3298 11.1092 19.248 11.2384 19.1198 11.3499L15.6852 14.323L16.7179 18.7403C16.7615 18.9057 16.7513 19.0566 16.6871 19.1932C16.623 19.3297 16.532 19.4403 16.4141 19.5249C16.2961 19.6095 16.1644 19.6585 16.0189 19.672C15.8734 19.6855 15.7282 19.6499 15.5833 19.5653L11.693 17.2191Z" fill="#F7931A" />
                                  </svg>
                                  :
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M8.54297 17.3557L11.693 15.4557L14.843 17.3807L14.018 13.7807L16.793 11.3807L13.143 11.0557L11.693 7.6557L10.243 11.0307L6.59297 11.3557L9.36797 13.7807L8.54297 17.3557ZM11.693 17.2191L7.8026 19.5653C7.65773 19.6499 7.51255 19.6855 7.36705 19.672C7.22153 19.6585 7.0898 19.6095 6.97185 19.5249C6.85391 19.4403 6.7629 19.3297 6.6988 19.1932C6.63468 19.0566 6.62442 18.9057 6.66802 18.7403L7.7007 14.323L4.2661 11.3499C4.1379 11.2384 4.05617 11.1092 4.02092 10.9625C3.98567 10.8157 3.99496 10.673 4.0488 10.5346C4.10265 10.3961 4.18021 10.283 4.2815 10.1952C4.38278 10.1073 4.52124 10.05 4.69687 10.023L9.22955 9.6269L10.9891 5.45575C11.0532 5.30063 11.1504 5.18589 11.2805 5.11152C11.4106 5.03717 11.5481 5 11.693 5C11.8378 5 11.9753 5.03717 12.1055 5.11152C12.2356 5.18589 12.3327 5.30063 12.3968 5.45575L14.1564 9.6269L18.6891 10.023C18.8647 10.05 19.0032 10.1073 19.1044 10.1952C19.2057 10.283 19.2833 10.3961 19.3371 10.5346C19.391 10.673 19.4003 10.8157 19.365 10.9625C19.3298 11.1092 19.248 11.2384 19.1198 11.3499L15.6852 14.323L16.7179 18.7403C16.7615 18.9057 16.7513 19.0566 16.6871 19.1932C16.623 19.3297 16.532 19.4403 16.4141 19.5249C16.2961 19.6095 16.1644 19.6585 16.0189 19.672C15.8734 19.6855 15.7282 19.6499 15.5833 19.5653L11.693 17.2191Z" fill="#6F7889" fillOpacity="0.5" />
                                  </svg>
                              }
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
                          isLogedin ?
                            <td className="px-6 py-5 text-center">
                              {
                                item?.shariahStatus === 'Compliant' ?
                                  <div>
                                    <span className="flex items-center gap-[2px] text-[#098C26]">
                                      <HilalIcon />
                                      Halal
                                    </span>
                                    <div

                                      className="text-[14px] cursor-pointer text-lightSecondaryText whitespace-nowrap font-medium text-left">View Report</div>
                                  </div>
                                  :
                                  item?.shariahStatus === 'Not Compliant' ?
                                    <div>
                                      <span className="flex items-center gap-[2px] text-[#CD0000]">
                                        <HaramlIcon />
                                        Haram
                                      </span>
                                      <div
                                        // onClick={viewDetail}
                                        className="text-[14px] cursor-pointer text-lightSecondaryText whitespace-nowrap font-medium text-left">View Report</div>
                                    </div>
                                    :
                                    <div>
                                      <span className="flex items-center gap-[2px] text-lightSecondaryText whitespace-nowrap">
                                        <NoStatuslIcon />
                                        No Status
                                      </span>
                                      <div
                                        // onClick={viewDetail}
                                        className="text-[14px] cursor-pointer text-lightSecondaryText whitespace-nowrap font-medium text-left">Request Report</div>
                                    </div>
                              }

                            </td>
                            :
                            <td className="px-6 py-5 text-center">
                              <div
                                onClick={GotoLogin}
                                className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                  <mask id="mask0_1121_33982" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="20">
                                    <rect x="0.325195" width="20" height="20" fill="#D9D9D9" />
                                  </mask>
                                  <g mask="url(#mask0_1121_33982)">
                                    <path d="M11.1585 17.5C10.9224 17.5 10.7245 17.4201 10.5648 17.2604C10.4051 17.1007 10.3252 16.9028 10.3252 16.6667C10.3252 16.4306 10.4051 16.2326 10.5648 16.0729C10.7245 15.9132 10.9224 15.8333 11.1585 15.8333H16.1585V4.16667H11.1585C10.9224 4.16667 10.7245 4.08681 10.5648 3.92708C10.4051 3.76736 10.3252 3.56944 10.3252 3.33333C10.3252 3.09722 10.4051 2.89931 10.5648 2.73958C10.7245 2.57986 10.9224 2.5 11.1585 2.5H16.1585C16.6169 2.5 17.0092 2.66319 17.3356 2.98958C17.662 3.31597 17.8252 3.70833 17.8252 4.16667V15.8333C17.8252 16.2917 17.662 16.684 17.3356 17.0104C17.0092 17.3368 16.6169 17.5 16.1585 17.5H11.1585ZM9.6377 10.8333H3.65853C3.42242 10.8333 3.2245 10.7535 3.06478 10.5938C2.90506 10.434 2.8252 10.2361 2.8252 10C2.8252 9.76389 2.90506 9.56597 3.06478 9.40625C3.2245 9.24653 3.42242 9.16667 3.65853 9.16667H9.6377L8.0752 7.60417C7.92242 7.45139 7.84603 7.26389 7.84603 7.04167C7.84603 6.81944 7.92242 6.625 8.0752 6.45833C8.22797 6.29167 8.42242 6.20486 8.65853 6.19792C8.89464 6.19097 9.09603 6.27083 9.2627 6.4375L12.2419 9.41667C12.4085 9.58333 12.4919 9.77778 12.4919 10C12.4919 10.2222 12.4085 10.4167 12.2419 10.5833L9.2627 13.5625C9.09603 13.7292 8.89811 13.809 8.66895 13.8021C8.43978 13.7951 8.24186 13.7083 8.0752 13.5417C7.92242 13.375 7.8495 13.1771 7.85645 12.9479C7.86339 12.7188 7.94325 12.5278 8.09603 12.375L9.6377 10.8333Z" fill="url(#paint0_linear_1121_33982)" />
                                  </g>
                                  <defs>
                                    <linearGradient id="paint0_linear_1121_33982" x1="2.8252" y1="2.5" x2="21.0775" y2="4.1445" gradientUnits="userSpaceOnUse">
                                      <stop stopColor="#7147B4" />
                                      <stop offset="1" stopColor="#423CAC" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                                <span className="text-primaryPurple text-sm font-semibold">Login To View</span>
                              </div>
                            </td>
                        }

                        <td className="px-6 py-5 text-center">

                          <span key={index} className={`flex items-center justify-center gap-[2px] ${item?.periods?.['24h']?.quote?.USD?.percent_change !== undefined && item.periods['24h'].quote.USD.percent_change >= 0
                            ? 'text-lightThemeSuccess'
                            : 'text-lightThemeDelete'
                            }`}>
                            {item?.periods?.['24h']?.quote?.USD?.percent_change !== undefined && item.periods['24h'].quote.USD.percent_change >= 0 ? (
                              <UpIconGreen />
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
            {/* <div className="flex justify-center pt-5">
              <button className="py-4 text-sm sm:text-base bg-primaryPurple rounded-lg text-white w-[80%] sm:w-1/3">See All Coins</button>
            </div> */}
          </div>
        </div>
      </section>
      <section className='pt-6 sm:pt-12'>
        <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
          <div className="border-[2px] border-[#D7D9E4] rounded-3xl px-4 sm:px-8 py-6 bg-white">
            <div className='flex justify-between items-center mb-6'>
              <h2 className="text-2xl font-bold tracking-tight text-[#0C0F14] sm:text-32">
                Latest News
              </h2>
              <Link to='/news' className='text-base font-medium text-primaryPurple'>
                See all
              </Link>
            </div>
            <div className="py-6">
              <NewCarousel />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CoinSecton;
