import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function ConfirmationModal({isOpen, setIsOpen,confirmDeleteAll,isLoading}) {

  function closeModal() {
    setIsOpen(false)
  }

  return (
    <>
       <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-sm z-[99] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Are you sure?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-base text-gray-500">
                      Do you really want to delete these records?
                    </p>
                  </div>

                  <div className="mt-4 flex justify-end gap-3">
                  <button
                      type="button"
                      className="bg-lightThemeSecondary text-white text-base font-medium px-4 flex gap-3 py-3  bg-opacity-65 rounded-[10px] hover:opacity-90"
                      onClick={closeModal}
                    >
                    Cancel
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="bg-primaryPurple text-white text-base font-medium px-4 flex gap-3 py-3  rounded-[10px] hover:opacity-90 disabled:opacity-50"
                      onClick={confirmDeleteAll}
                    >
                    Delete
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
