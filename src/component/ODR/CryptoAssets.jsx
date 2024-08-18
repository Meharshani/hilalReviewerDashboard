import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { TickIconWhite } from '../../assets/custom-icon';
import { GetCoinData, GetReport } from '../../service/service';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
const CryptoAssets = ({ setShowAssets, CoinsData ,setReresh,isLoadingCoins}) => {
    const navigation = useNavigate();
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCoins,setFilteredCoins]= useState([]);

    useEffect(() => {
        
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems) {
            const updatedCoinsData = CoinsData.filter(item => !cartItems.some(cartItem => cartItem._id === item._id));
            const filteredCoins = updatedCoinsData && Array.isArray(updatedCoinsData) ? updatedCoinsData.filter(item =>
                (item.symbol && item.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            ) : [];
            setFilteredCoins(filteredCoins)
        }
        else{
            const filteredCoins = CoinsData && Array.isArray(CoinsData) ? CoinsData.filter(item =>
                (item.symbol && item.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            ) : [];
            setFilteredCoins(filteredCoins)
        }
    }, [CoinsData,searchQuery]);
    
    const handleItemClick = (item) => {
        
        setSelectedItem(item);
       if(!item.reportGenerated){
        const isSelected = selectedItems.includes(item);
        if (isSelected) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item)); // Remove item from selectedItems
        } else {
            setSelectedItems([...selectedItems, item]); // Add item to selectedItems
        }
       }
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
    const AddToCart = () => {
        // Store selectedItems in local storage
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? [];
        const selectedCoins = [...cartItems, ...selectedItems];
        const updatedCoinsData = CoinsData.filter(item => !selectedCoins.some(cartItem => cartItem._id === item._id));
        localStorage.setItem('cartItems', JSON.stringify(selectedCoins));
        // Clear selectedItems
        setSelectedItems([]);
        
        // Update CoinsData
        setFilteredCoins(updatedCoinsData);

        //refresh Cart in Navbar
        setReresh((prev)=>!prev)

        // Optionally, display a toast notification
        toast.success('Coins added to cart!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
        });
    };
    
    return (
        <>
          <ToastContainer />
        <div className="bg-[#F2F2F2]">
            <section className='pt-6 sm:pt-8'>
                <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
                    <div className="rounded-2xl px-4 sm:px-8 py-8 bg-white h-screen max-h-[585px]">
                        <div className='flex justify-between'>
                            <div
                                onClick={() => setShowAssets(false)}
                                className='flex items-center gap-4 cursor-pointer'>
                                <ArrowLeftIcon className="h-6 w-6" />
                                <span className='text-30 font-bold'>Add Crypto Assets</span>
                            </div>
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
                        <div
                            style={{ height: 'calc(100% - 11rem)' }}
                            className='mt-8 flex flex-wrap gap-4 overflow-auto'>
                              
                            {
                                   isLoadingCoins ?
                                   <div className='w-full flex justify-center'>
                                        <CircularProgress size={40} color='primary' />
                                   </div>
                                   :
                                <>
                                {
                                filteredCoins?.map((item, index) => (

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
                                            item?.reportGenerated ?
                                                <>

                                                    {

                                                        (isLoading && selectedItem?._id == item?._id) ?
                                                            <span className="p-2 bg-[#F2F2F2] rounded-lg flex justify-center items-center cursor-pointer">

                                                                <CircularProgress size={20} color='primary' />
                                                            </span>
                                                            :
                                                            <div
                                                                onClick={() => handleViewReport(item)}
                                                                className='text-primaryPurple text-sm font-semibold whitespace-nowrap cursor-pointer'>View Report</div>
                                                    }
                                                </>

                                                :
                                                <div className={`rounded-full size-6 border-[1px] border-lightThemeOutline flex items-center justify-center ${selectedItems.includes(item) ? 'bg-primaryPurple' : ''}`}>
                                                    <TickIconWhite />
                                                </div>
                                        }
                                    </div>
                                ))
                                }
                                </>
                            }
                        </div>
                        <div className='pt-8 mt-4 border-t-[1px] border-lightThemeOutline flex flex-col lg:flex-row gap-5 justify-end'>
                            <div className='text-sm font-semibold flex flex-col'>
                                <button
                                    onClick={() => setSelectedItems([])}
                                    disabled={isLoading} type='button' className='text-primaryPurple border-primaryPurple border-[1px] hover:bg-opacity-90 py-3 px-4 rounded-lg disabled:opacity-50 '>Cancel</button>
                            </div>
                            <div className='text-sm font-semibold flex flex-col'>
                                <button 
                                onClick={AddToCart}
                                disabled={isLoading || selectedItems.length ===0 } type='button' className='bg-primaryPurple text-white hover:bg-opacity-90 py-3 px-4 rounded-lg disabled:opacity-50 '>Add to Cart</button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}

export default CryptoAssets;
