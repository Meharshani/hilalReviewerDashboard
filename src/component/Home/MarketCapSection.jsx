import React from 'react'
import { DownGraphRed, UpGraphGreen } from '../../assets/custom-icons'
import { Link } from 'react-router-dom'

function MarketCapSection() {
  return (
    <section className='pt-6 sm:pt-12'>
    <div className='2xl:max-w-2xl xl:max-w-xl lg:max-w-lg md:max-w-md mx-auto px-3 lg:px-0'>
      <div className="border-[2px] border-[#D7D9E4] rounded-3xl px-4 sm:px-8 py-6 bg-white">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-[#0C0F14] sm:text-32">
            {/* Cryptocurrency Prices by Market Cap */}
            My Favorites By Market Cap
          </h2>
          <p className="my-5 text-sm leading-[21px] text-lightSecondaryText">
            The total crypto market volume over the last 24 hours is $48.65B,
            which makes <span className="text-lightThemeDelete text-base font-semibold">16.38%</span> a decrease.<br /> The total volume in DeFi is currently
            $4.63B, 9.52% of the total crypto market 24-hour volume.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 text-[#0C0F14]">
          <div className="lg:w-1/4 py-[22px] px-[18px] border-[1px] border-lightstext-lightSecondaryText rounded-3xl">
            <div className="flex justify-between items-center gap-5">
              <div className="relative flex items-center gap-x-2">
                <img
                  src="assets/bitcoin.svg"
                  alt=""
                  className="w-8 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p>
                    <Link to="">
                      <span className="text-base font-semibold">

                        Bitcoin
                      </span>
                    </Link>
                  </p>
                  <p className="text-[9px] font-semibold leading-[12px]">$29,732.54
                    <span className="text-lightThemeSuccess text-[7px] ml-1">16.38%</span>
                  </p>
                </div>
              </div>
              <UpGraphGreen />
            </div>
          </div>
          <div className="lg:w-1/4 py-[22px] px-[18px] border-[1px] border-lightstext-lightSecondaryText rounded-3xl">
            <div className="flex justify-between items-center gap-5">

              <div className="relative flex items-center gap-x-2">
                <img
                  src="assets/bitcoin.svg"
                  alt=""
                  className="w-8 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p>
                    <Link to="">
                      <span className="text-base font-semibold">

                        Ethereum
                      </span>
                    </Link>
                  </p>
                  <p className="text-[9px] font-semibold leading-[12px]">$29,732.54
                    <span className="text-lightThemeDelete text-[7px] ml-1">16.38%</span>
                  </p>
                </div>
              </div>
              <DownGraphRed />
            </div>
          </div>
          <div className="lg:w-1/4 py-[22px] px-[18px] border-[1px] border-lightstext-lightSecondaryText rounded-3xl">
            <div className="flex justify-between items-center gap-5">

              <div className="relative flex items-center gap-x-2">
                <img
                  src="assets/uniswap.png"
                  alt=""
                  className="w-8 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p>
                    <Link to="">
                      <span className="text-base font-semibold">
                        Uniswaap
                      </span>
                    </Link>
                  </p>
                  <p className="text-[9px] font-semibold leading-[12px]">$29,732.54
                    <span className="text-lightThemeSuccess text-[7px] ml-1">16.38%</span>
                  </p>
                </div>
              </div>
              <UpGraphGreen />
            </div>
          </div>
          <div className="lg:w-1/4 py-[22px] px-[18px] border-[1px] border-lightstext-lightSecondaryText rounded-3xl">
            <div className="flex justify-between items-center gap-5">
              <div className="relative flex items-center gap-x-2">
                <img
                  src="
                  https://s3-alpha-sig.figma.com/img/5c00/2b5f/ad830d98fd412f805ebab7a189cfbb35?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fOZBBQPLHnNMaGD61KVLmz1IUD5UeaXBbOukjdRsEk~3dVMOnPUzwVzvlGzJ8fLKuVDIqZdY2qIiR6Xbn1t8HfoESUxIYawbzgTXieVpYb7udLU-yl8pGNpvQH5m3WFUx6l3bl1vox1OrOAt4Wl4jTEEKqnXL1tkmFhdawux9mxsWnEfbO2PyzanACAVQU4cg9qYPodLIK1ysuPBGtoqr0Q8-ftnUTTGUgPfHt4udsoRMNzukZdRu9WoPvm4cgxA-cP7Mw6NRtCfsGq~vh3s2HAIWpld8qiI9ob4HHuo50GGSR45md46W1G9LmFc2r~R6MX0lRW2a-z10yyRfZPxig__"
                  alt=""
                  className="w-8 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p>
                    <Link to="">
                      <span className="text-base font-semibold">
                        Cardano
                      </span>
                    </Link>
                  </p>
                  <p className="text-[9px] font-semibold leading-[12px]">$29,732.54
                    <span className="text-lightThemeSuccess text-[7px] ml-1">16.38%</span>
                  </p>
                </div>
              </div>
              <UpGraphGreen />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default MarketCapSection