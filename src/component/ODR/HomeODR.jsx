import React from 'react';
import { AddTokenIcon } from '../../assets/custom-icon';

const HomeODR = ({setShowAssets}) => {
    return (
        <div className="bg-[#F2F2F2]">
        <section className='pt-6 sm:pt-8'>
            <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
                <div className="rounded-2xl px-4 sm:px-8 py-8 bg-white h-screen max-h-[500px]">
                    <div className='flex justify-center items-center h-full'>
                        <div className='flex flex-col items-center text-center gap-4'>
                            <AddTokenIcon/>
                            <div className='text-lg font-bold'>
                                No Recent Reviewed Tokens
                                <p className='text-sm font-medium text-lightSecondaryText'>
                                    Click Add to get started
                                </p>
                            </div>
                            <button
                                className="bg-primaryPurple text-white font-semibold flex justify-center items-center hover:bg-opacity-90 py-3 px-8 min-w-28 w-full text-center rounded-lg disabled:opacity-50  z-[1]"
                                onClick={()=>setShowAssets(true)}
                            >
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}

export default HomeODR;
