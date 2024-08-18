import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { TickIconWhite } from '../../assets/custom-icon';
import { GetCoinData, GetReport } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { ToastContainer } from "react-toastify";

import { Tab } from '@headlessui/react'
import AccordianBox from './Disclosure';

const ReportedCoins = ({ CoinsData, isLoadingCoins,setShowAssets }) => {
    const navigation = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');

    const handleItemClick = (item) => {

        setSelectedItem(item);

    };
    const handleViewReport = (data) => {
        let Coindata = {};
        setIsLoading(true)
        GetCoinData(data?._id).then((result) => {
            if (result.success) {
                Coindata = result?.body?.cmcData
                if (Coindata?.reportId) {

                    GetReport(Coindata?.reportId).then((result) => {
                        setIsLoading(false)
                        if (result?.success) {
                            const data = result?.body?.report
                            navigation('/review', { state: data });
                        }
                    }).catch((error) => console.log(error))
                }
            }
        }).catch((error) => console.log(error))


    }
    const GotoCoinsSelction = () => {
     
        setShowAssets(true)
    
      }

    return (
        <>
            <ToastContainer />
            <div className="bg-[#F2F2F2]">
                <section className='pt-6 sm:pt-8'>
                    <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
                        <div className="rounded-2xl px-4 sm:px-8 py-8 bg-white  min-h-[585px]">
                            <div className='flex justify-between mb-6'>
                                <div
                                    className='flex items-center gap-4 cursor-pointer'>
                                    {/* <ArrowLeftIcon className="h-6 w-6" /> */}
                                    <span className='text-30 font-bold'>Welcome To ODR</span>
                                    
                                </div>
                                <div className='flex gap-2'>
                                <button
                                className="bg-primaryPurple text-white font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-10  text-center rounded-lg disabled:opacity-50  z-[1]"
                                onClick={()=>GotoCoinsSelction()}
                            >
                                + Add
                            </button>
                            <div className='flex items-center border-[1px] border-lightThemeOutline h-12 w-[343px] rounded-lg px-3 py-2'>
                                    <span>
                                        <MagnifyingGlassIcon className="h-6 w-6 text-lightThemeSecondary" />

                                    </span>
                                    <input type="text"
                                        placeholder='Search here'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className='outline-none h-full w-full pl-3' />
                                </div>
                                </div>
                               
                            </div>

                            <Tab.Group>
                                <Tab.List>
                                    <Tab
                                        className={({ selected }) =>
                                            `${selected ? 'bg-[#F9F5FF] text-[#6941C6] font-bold' : 'font-semibold bg-white text-gray-500'} px-4 py-2 rounded-md w-64 text-base`
                                        }
                                    >
                                        View Progress
                                    </Tab>
                                    <Tab
                                        className={({ selected }) =>
                                            `${selected ? 'bg-[#F9F5FF] text-[#6941C6] font-bold' : 'font-semibold bg-white text-gray-500'} px-4 py-2 rounded-md w-64 text-base`
                                        }
                                    >
                                        Completed Reports
                                    </Tab>

                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <AccordianBox
                                            CoinsData={CoinsData}
                                            isLoadingCoins={isLoadingCoins}
                                        />

                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div style={{ height: 'calc(100% - 11rem)' }}>
                                            <div

                                                className='mt-8 flex flex-wrap gap-4 overflow-auto'>

                                                {
                                                    isLoadingCoins ?
                                                        <div className='w-full flex justify-center'>
                                                            <CircularProgress size={40} color='primary' />
                                                        </div>
                                                        :
                                                        <>
                                                            {
                                                                CoinsData?.map((item, index) => (
                                                                    <div key={index + '-item'}
                                                                        onClick={() => handleItemClick(item)}
                                                                        className='flex justify-between items-center max-h-24 gap-1 border-[1px] border-lightThemeOutline shadow-custom rounded-xl p-6 col-3-items'>
                                                                        <div className='flex items-center gap-2'>
                                                                            <span className="bg-[#EBEBEB] rounded px-2 py-[4px] text-lightSecondaryText text-[14px] font-medium">
                                                                                {index + 1}
                                                                            </span>
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
                                                                        {
                                                                            // item?.reportGenerated ?
                                                                            <>

                                                                                {

                                                                                    (isLoading && selectedItem?._id === item?._id) ?
                                                                                        <span className="p-2 bg-[#F2F2F2] rounded-lg flex justify-center items-center cursor-pointer">

                                                                                            <CircularProgress size={20} color='primary' />
                                                                                        </span>
                                                                                        :
                                                                                        <div
                                                                                            onClick={() => handleViewReport(item)}
                                                                                            className='text-primaryPurple text-sm font-semibold whitespace-nowrap cursor-pointer'>View Report</div>
                                                                                }
                                                                            </>

                                                                            // :
                                                                            // <div className={`rounded-full size-6 border-[1px] border-lightThemeOutline flex items-center justify-center ${selectedItems.includes(item) ? 'bg-primaryPurple' : ''}`}>
                                                                            //     <TickIconWhite />
                                                                            // </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                           

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default ReportedCoins;
