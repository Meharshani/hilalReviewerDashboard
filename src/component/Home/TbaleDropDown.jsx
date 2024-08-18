import { Listbox } from '@headlessui/react'
import React from 'react'

function TbaleDropDown({value,placeholder,onChange,dataArray}) {
  return (
    <Listbox value={value} onChange={onChange}>
    {({ open }) => (
      <>
        <div className="relative">
          <Listbox.Button
            className="relative min-w-40 rounded-lg bg-[#F2F2F2] border  shadow-sm px-6  pr-10 py-2 text-left cursor-pointer sm:text-base"
          >
            <span className="block truncate text-primaryDark font-semibold ">{ value}</span>
            <span className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none`}>
              <svg className={`${open ?'rotate-180' :''}`} xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M5.5001 6.27434C5.41976 6.27434 5.34497 6.26152 5.27575 6.23587C5.20652 6.21023 5.14071 6.16621 5.07832 6.10382L2.08217 3.10767C1.98986 3.01537 1.94263 2.89935 1.9405 2.7596C1.93836 2.61986 1.98558 2.5017 2.08217 2.40512C2.17874 2.30854 2.29583 2.26025 2.43343 2.26025C2.57103 2.26025 2.68812 2.30854 2.7847 2.40512L5.5001 5.12052L8.2155 2.40512C8.3078 2.31282 8.42382 2.2656 8.56357 2.26345C8.7033 2.26132 8.82146 2.30854 8.91803 2.40512C9.01462 2.5017 9.06292 2.61879 9.06292 2.7564C9.06292 2.894 9.01462 3.01109 8.91803 3.10767L5.92188 6.10382C5.85949 6.16621 5.79368 6.21023 5.72445 6.23587C5.65523 6.26152 5.58044 6.27434 5.5001 6.27434Z" fill="#6F7889" />
              </svg>
            </span>
          </Listbox.Button>
          <Listbox.Options
            className="absolute mt-1 w-full rounded-md bg-white shadow-lg max-h-56 overflow-auto z-10"
          >
            {dataArray?.map((status, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `${active ? 'bg-primaryPurple text-white' : 'text-black'}
              cursor-pointer select-none relative py-2 pl-3 pr-9`
                }
                value={status}
              >
                {({ selected, active }) => (
                  <>
                    <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                      {status}
                    </span>
                    {selected ? (
                      <span
                        className={`${active ? 'text-white' : 'text-indigo-600'}
                    absolute inset-y-0 right-0 flex items-center pr-4`}
                      >
                       
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </>
    )}
  </Listbox>
  )
}

export default TbaleDropDown