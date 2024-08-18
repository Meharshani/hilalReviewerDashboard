import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { ApplePayIcon, DeleteIcon, MasterCardIcon, TickIconWhite } from '../../assets/custom-icon';
import { useGlobalState } from '../../context/context';
import PaymentPopup from './PaymentPopup';
import { GenrateReport } from '../../service/service';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { url } from '../../environment';
const Payment = ({ setshowPayement }) => {
    const { cartItem, setCartItems } = useGlobalState();
    const [isLoading, setIsLoading] = useState("");
    console.log(cartItem);
    let [isOpen, setIsOpen] = useState(false)
    const [Total, setTotal] = useState(0)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        console.log('sssssssssssssssssssssssss')
        // e.preventDefault()
        setIsLoading(true)
        const symbols = cartItem.map(item => item.symbol);
        const data = {
            symbols
        }
        debugger
        GenrateReport(data).then((result) => {
            console.log(result);

            setIsLoading(false)
            if (result.success) {
                setIsOpen(true)
                setCartItems([])
                localStorage.removeItem('cartItems')
            }
        }).catch((error) => console.log(error))


    }
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        setCartItems(cartItems ?? [])
        getPaymentTotal()

    }, [])


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
    const stripePromise = loadStripe(
        "pk_test_51PFsNB08ZDzoXpLEzP4uFGQ9hdOrLtTgmdXDOgLvMjWdYCV8Z8EGheRcZjtzXgltIQ51OiMLdozUuc8QCfaL11Vk003pbrL8J9"
    );


    return (
        <div className="bg-[#F2F2F2]">
            <section className='pt-6 sm:pt-8'>
                <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
                    <div className='flex flex-col lg:flex-row gap-8'>

                        <div className="flex-1 rounded-2xl px-4 sm:px-8 py-8 bg-white min-h-[550px]">
                            <div className='flex justify-between'>
                                <div
                                    onClick={() => setshowPayement(false)}
                                    className='flex items-center gap-4 cursor-pointer'>
                                    <ArrowLeftIcon className="h-6 w-6" />
                                    <span className='text-30 font-bold'>Payment Method</span>
                                </div>

                            </div>
                            <div

                                className='mt-8 flex flex-wrap gap-4 overflow-auto payment-container'>

                                <div className='flex justify-between items-center max-h-16 gap-1 border-[2px] border-primaryPurple shadow-custom rounded-xl p-6 col-3-items'>
                                    <div className='flex items-center gap-2'>

                                        <div className="flex items-center gap-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="32" viewBox="0 0 46 32" fill="none">
                                                <rect width="46" height="32" rx="6" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.21 21.1451H11.4874L9.4457 13.0573C9.3488 12.6852 9.14304 12.3563 8.84037 12.2013C8.08504 11.8118 7.25272 11.5017 6.34473 11.3454V11.034H10.7307C11.336 11.034 11.79 11.5017 11.8657 12.045L12.925 17.879L15.6463 11.034H18.2933L14.21 21.1451ZM19.8066 21.1451H17.2353L19.3526 11.034H21.924L19.8066 21.1451ZM25.2506 13.8351C25.3263 13.2905 25.7803 12.9791 26.3099 12.9791C27.1422 12.9009 28.0489 13.0573 28.8056 13.4455L29.2596 11.2685C28.5029 10.9571 27.6706 10.8008 26.9152 10.8008C24.4196 10.8008 22.6036 12.2013 22.6036 14.1451C22.6036 15.6238 23.8899 16.4003 24.7979 16.868C25.7803 17.3344 26.1586 17.6458 26.0829 18.1122C26.0829 18.8118 25.3263 19.1232 24.5709 19.1232C23.6629 19.1232 22.7549 18.89 21.9239 18.5004L21.47 20.6787C22.3779 21.0669 23.3603 21.2233 24.2683 21.2233C27.0666 21.3001 28.8056 19.9009 28.8056 17.8008C28.8056 15.1561 25.2506 15.0011 25.2506 13.8351ZM37.8045 21.1451L35.7628 11.034H33.5699C33.1159 11.034 32.6619 11.3454 32.5105 11.8118L28.7299 21.1451H31.3769L31.9052 19.6677H35.1575L35.4602 21.1451H37.8045ZM33.9482 13.7569L34.7035 17.5676H32.5862L33.9482 13.7569Z" fill="#172B85" />
                                            </svg>
                                            <p className="text-base font-semibold text-gray-700 line-clamp-1">

                                                Visa Card
                                            </p>
                                        </div>
                                    </div>
                                    {

                                        <div className={`rounded-full size-6 border-[1px] border-lightThemeOutline flex items-center justify-center ${true ? 'bg-primaryPurple' : ''}`}>
                                            <TickIconWhite />
                                        </div>
                                    }
                                </div>
                                <div className='flex justify-between items-center max-h-16 gap-1 border-[1px] border-lightThemeOutline shadow-custom rounded-xl p-6 col-3-items'>
                                    <div className='flex items-center gap-2'>

                                        <div className="flex items-center gap-x-2">
                                            <MasterCardIcon />
                                            <p className="text-base font-semibold text-gray-700 line-clamp-1">

                                                Master Card
                                            </p>
                                        </div>
                                    </div>
                                    {

                                        <div className={`rounded-full size-6 border-[1px] border-lightThemeOutline flex items-center justify-center ${false ? 'bg-primaryPurple' : ''}`}>
                                            <TickIconWhite />
                                        </div>
                                    }
                                </div>
                                <div className='flex justify-between items-center max-h-16 gap-1 border-[1px] border-lightThemeOutline shadow-custom rounded-xl p-6 col-3-items'>
                                    <div className='flex items-center gap-2'>

                                        <div className="flex items-center gap-x-2">
                                            <ApplePayIcon />
                                            <p className="text-base font-semibold text-gray-700 line-clamp-1">
                                                Apply Pay
                                            </p>
                                        </div>
                                    </div>
                                    {

                                        <div className={`rounded-full size-6 border-[1px] border-lightThemeOutline flex items-center justify-center ${false ? 'bg-primaryPurple' : ''}`}>
                                            <TickIconWhite />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='text-30 py-8 font-bold'>Card Details</div>
                            {/* <form>
                                <div className='flex mb-6 gap-4'>
                                    <div className='flex flex-col gap-[6px] flex-1'>
                                        <label className='text-sm font-semibold' htmlFor="card-name">Name on card</label>
                                        <input type="text" className='outline-none px-[14px] py-[10px] border-gray-300 border-[1px] rounded-lg' name="card-name" id="card-name" />
                                    </div>
                                    <div className='flex flex-col gap-[6px] w-[112px]'>
                                        <label className='text-sm font-semibold' htmlFor="card-expiry">Expiry</label>
                                        <input type="text" className='outline-none px-[14px] py-[10px] border-gray-300 border-[1px] rounded-lg' name="card-expiry" id="card-expiry" />
                                    </div>
                                </div>
                                <div className='flex mb-6 gap-4'>
                                    <div className='flex flex-col gap-[6px] flex-1'>
                                        <label className='text-sm font-semibold' htmlFor="card-name">Card number</label>
                                        <input type="number" className='outline-none px-[14px] py-[10px] border-gray-300 border-[1px] rounded-lg' name="card-name" id="card-name" />
                                    </div>
                                    <div className='flex flex-col gap-[6px] w-[112px]'>
                                        <label className='text-sm font-semibold' htmlFor="card-expiry">CVV</label>
                                        <input type="text" className='outline-none px-[14px] py-[10px] border-gray-300 border-[1px] rounded-lg' name="card-expiry" id="card-expiry" />
                                    </div>
                                </div>
                                <button
                                    // onClick={openModal}
                                    onClick={handleSubmit}
                                    disabled={isLoading || cartItem.length === 0}
                                    className="bg-primaryPurple w-full p-3 rounded-xl text-white font-semibold text-base disabled:opacity-50 h-12 flex justify-center items-center hover:opacity-90">
                                    {isLoading ? 'Loading...' : 'Pay $51.00'}
                                </button>

                            </form> */}
                              <Elements stripe={stripePromise} >
                
                <CheckoutForm total={Total} openModal={openModal}/>
            </Elements>
                        </div>
                        <div className="inset-y-0 rounded-2xl max-h-[874px] round w-full max-w-[430px] overflow-y-auto bg-white px-6 py-6  sm:ring-1 sm:ring-gray-900/10">
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

                                <div className="mt-6 space-y-4">
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

                        </div>
                    </div>
                </div>
            </section>
          
            <PaymentPopup
                isOpen={isOpen}
                closeModal={closeModal}
                setshowPayement={setshowPayement}
            />
        </div>
    );
}

export default Payment;
