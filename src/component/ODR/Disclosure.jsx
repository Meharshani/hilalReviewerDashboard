import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

export default function AccordianBox({ CoinsData, isLoadingCoins }) {


    return (
        <div className='overflow-auto' style={{ height: 'calc(100% - 11rem)' }}>
            <div className='mt-8 flex flex-wrap gap-4 '>
                {isLoadingCoins ? (
                    <div className='w-full flex justify-center'>
                        <CircularProgress size={40} color='primary' />
                    </div>
                ) : (
                    <>
                        {CoinsData?.map((item, index) => (
                            <Disclosure
                                key={index + '-item'}
                                as='div'
                                className='col-3-items border-[1px] h-fit border-lightThemeOutline shadow-custom rounded-xl'

                            >
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className='flex justify-between items-center max-h-24 gap-1 p-6 w-full'>
                                            <div className='flex items-center gap-2'>
                                                <span className='bg-[#EBEBEB] rounded px-2 py-[4px] text-lightSecondaryText text-[14px] font-medium'>
                                                    {index + 1}
                                                </span>
                                                <div className='flex items-center gap-x-2'>
                                                    <img
                                                        src={item?.logo}
                                                        alt='logo'
                                                        className='w-8 rounded-full bg-gray-50'
                                                    />
                                                    <div className='text-sm leading-6'>
                                                        <p>
                                                            <span className='text-base font-semibold'>
                                                                {item?.symbol}
                                                            </span>
                                                        </p>
                                                        <p className='text-[14px] font-medium text-lightSecondaryText line-clamp-1'>
                                                            {item?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronDownIcon className={`size-5 fill-black/60 ${open ? 'rotate-180' : ''}`} />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className={`p-6 pt-0 ${open ? '' : 'hidden'}`}>
                                            <div className='flex flex-col gap-6'>
                                                <div className='flex gap-5 items-center'>
                                                    <span className='flex justify-center items-center rounded-full size-6 bg-[#7147B4]'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
                                                            <g clipPath="url(#clip0_1776_1051)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M12.1382 0.799221C12.1829 0.843809 12.2184 0.896778 12.2426 0.955093C12.2668 1.01341 12.2793 1.07592 12.2793 1.13906C12.2793 1.2022 12.2668 1.26471 12.2426 1.32303C12.2184 1.38134 12.1829 1.43431 12.1382 1.4789L5.41824 8.1989C5.37365 8.2436 5.32068 8.27907 5.26237 8.30326C5.20405 8.32746 5.14154 8.33992 5.0784 8.33992C5.01526 8.33992 4.95275 8.32746 4.89443 8.30326C4.83612 8.27907 4.78315 8.2436 4.73856 8.1989L1.37856 4.8389C1.28843 4.74877 1.23779 4.62653 1.23779 4.49906C1.23779 4.3716 1.28843 4.24935 1.37856 4.15922C1.46869 4.06909 1.59093 4.01845 1.7184 4.01845C1.84586 4.01845 1.96811 4.06909 2.05824 4.15922L5.0784 7.18034L11.4586 0.799221C11.5031 0.75452 11.5561 0.719055 11.6144 0.694857C11.6727 0.670659 11.7353 0.658203 11.7984 0.658203C11.8615 0.658203 11.9241 0.670659 11.9824 0.694857C12.0407 0.719055 12.0937 0.75452 12.1382 0.799221Z" fill="white" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_1776_1051">
                                                                    <rect width="11.5209" height="8.64" fill="white" transform="translate(0.758789 0.179688)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </span>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <h3 className='text-base font-semibold'>
                                                            Report Genration
                                                        </h3>
                                                        <div className='text-lightThemeSecondary text-sm font-normal'>
                                                            Is a sales copy really omnipotent?
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 items-center'>
                                                    <span className='flex justify-center items-center rounded-full size-6 bg-[#7147B4] text-white text-[13px]'>2</span>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <h3 className='text-base font-semibold'>
                                                            Initial Review
                                                        </h3>
                                                        <div className='text-lightThemeSecondary text-sm font-normal'>
                                                            Is a sales copy really omnipotent?
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex gap-5 items-center'>
                                                    <span className='flex justify-center items-center rounded-full size-6 border-lightThemeOutline border-[1px]'>
                                                        
                                                    </span>
                                                    <div className='flex flex-col gap-[2px]'>
                                                        <h3 className='text-base font-semibold'>
                                                            Final Approval
                                                        </h3>
                                                        <div className='text-lightThemeSecondary text-sm font-normal'>
                                                            Is a sales copy really omnipotent?
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
