import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';

export default function PaymentPopup({ isOpen, closeModal ,setshowPayement}) {

    const navigate = useNavigate();
    const handleLogout = () => {
        setshowPayement(false)
    }
    return (
        <>


            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[500px] transform overflow-hidden rounded-2xl bg-white p-6 px-14 text-center align-middle shadow-xl transition-all">
                                    <div className='flex justify-center mb-5'>
                                        <svg width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50.5" r="50" fill="#D9FFE1" />
                                            <path d="M50 74.5C63.2548 74.5 74 63.7548 74 50.5C74 37.2452 63.2548 26.5 50 26.5C36.7452 26.5 26 37.2452 26 50.5C26 63.7548 36.7452 74.5 50 74.5Z" fill="#2ECD51" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M45.7476 58.4675L38.69 50.9138C37.7237 49.8796 37.7792 48.2434 38.8133 47.2772C39.8475 46.311 41.4837 46.3666 42.4499 47.4006L47.8939 53.2272L56.511 45.1759C56.5885 45.1034 56.6695 45.037 56.7532 44.976L60.8055 41.1899C61.8396 40.2236 63.476 40.2793 64.442 41.3134C65.4083 42.3474 65.3527 43.9837 64.3187 44.95L51.9419 56.514L51.9287 56.4998L47.6474 60.5L45.7476 58.4675Z" fill="white" />
                                        </svg>

                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-[28px] font-bold leading-10 text-primaryDark"
                                    >
                                        Payment Successful 
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-lg text-gray-500">
                                        Your payment successful.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className='bg-primaryPurple w-full max-w-[310px] text-white hover:bg-opacity-90 py-3 px-2 rounded-lg disabled:opacity-50 '
                                            onClick={
                                                handleLogout
                                            }
                                        >
                                            Back to ODR
                                        </button>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
