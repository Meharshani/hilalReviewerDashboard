import { Combobox, } from '@headlessui/react'
import { useState, useEffect, useRef } from 'react'

import { useNavigate } from 'react-router-dom';
import { GetCmcSearchData } from '../service/service';
import { XMarkIcon } from '@heroicons/react/24/outline';



export default function SearchModal({ setSearchOpen }) {
    const navigate = useNavigate();
    const inputRef = useRef(null); // Create a ref for the input element

    const [loading, setloading] = useState(false);
    const [coins, setcoins] = useState([]);
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState({})

    useEffect(() => {
        inputRef.current.focus(); // Focus on the input field when the component mounts
    }, []);
    function closeModal() {
        setSearchOpen(false)
        setSelected({})
    }
    // let timeoutId;

    const makeAPICall = (searchValue) => {


        GetCmcSearchData(searchValue)
            .then((result) => {
                setloading(false)
                const formattedCoins = result.body?.cmcData.map(item => {
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
               
                setcoins(formattedCoins);

            });
    };


    const handleChange = (event) => {
        const searchValue = event.target.value;
        setQuery(searchValue)
        if (searchValue) {
            setloading(true)
        }


    };
    useEffect(() => {
        const getData = setTimeout(() => {
            if (query !== '') {
                makeAPICall(query); // Make the API call after the delay
            }
            if (query === '') {
                setloading(false)
            }
        }, 1000)

        return () => clearTimeout(getData)
    }, [query])


    const handleDropdown = (data) => {
        setSelected(data)
        closeModal()
        navigate('/btc-chart', { state: data });
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
        <div className="w-[600px] transform rounded-lg bg-white absolute top-[-5px] text-left align-middle shadow-xl transition-all z-20 right-[-360px]">

            <div className=' rounded-lg md:bg-opacity-[0.4] py-1'>

                <Combobox

                    as='div'
                    value={selected}
                    onChange={handleDropdown}
                >
                    <div className="flex items-center gap-x-2 w-full px-4 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <Combobox.Input
                            onChange={handleChange}
                            displayValue={(person) => person.title}
                            ref={inputRef} 
                            placeholder='search...'
                            className="block w-full bg-transparent outline-none border-0 py-1.5 text-primaryDark focus:border-transparent sm:text-lg sm:leading-normal font-semibold"
                        />
                        <XMarkIcon onClick={closeModal} className="h-6 w-6 cursor-pointer text-gray-500" />
                    </div>

                    <Combobox.Options className={`py-2 px-4 border-t-[1px] border-[#D2D6DC]`}>
                        {
                            loading ?
                                <div className='flex justify-center'>
                                    Loading...
                                </div>

                                :
                                <>
                                    {
                                        coins.length === 0 ?
                                            <div className='flex justify-center h-[100px]'>
                                                No data found
                                            </div>
                                            :
                                            <>
                                                {
                                                    coins.length > 0 &&
                                                    <>

                                                        {
                                                            coins?.map((item) => (
                                                                <Combobox.Option
                                                                    key={item._id}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-4 pr-4 ${active ? 'bg-primaryPurple text-white' : 'text-primaryDark'
                                                                        }`
                                                                    }
                                                                    value={item}
                                                                >
                                                                    <div className='flex w-full justify-between items-center'>

                                                                    <div className='flex w-full gap-4'>
                                                                        <img
                                                                            src={item?.logo}
                                                                            alt="logo"
                                                                            className="w-8 rounded-full bg-gray-50"
                                                                        />
                                                                        <span>

                                                                            {item.name}
                                                                        </span>
                                                                        
                                                                    </div>
                                                                    <span>
                                                                            {item?.formattedPrice}
                                                                        </span>
                                                                    </div>

                                                                </Combobox.Option>
                                                            ))
                                                        }
                                                        {/* <div onClick={() => viewAll('class')} className='text-sm font-bold cursor-pointer pl-4 pt-4 text-primaryPurple'>View all</div> */}
                                                        <hr className='my-4 bg-[#D2D6DC] h-[1px]' />
                                                    </>
                                                }

                                            </>
                                    }
                                </>
                        }

                    </Combobox.Options>
                </Combobox>


            </div>
        </div>

    )
}
