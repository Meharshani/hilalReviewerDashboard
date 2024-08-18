import React, { useEffect, useState } from 'react';
import { GetCmcData } from '../service/service';


const TrendingBar = () => {

    const [CoinsData, setCoinsData] = useState([])

    useEffect(() => {
        fetchData()
        const interval = setInterval(fetchData, 20000);
        return () => clearInterval(interval);
        
       // eslint-disable-next-line
      }, [])
      
      const fetchData = () => {
        
        
        GetCmcData('All', 10, '24h').then((result) => {
       
          if (result.success) {
      
            const sortedData = result?.body?.cmcData?.sort((a, b) => a.cmc_rank - b.cmc_rank);
            const formattedCoins = sortedData.map(item => {
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
            setCoinsData(formattedCoins)
           
          }
        }).catch((err) => {
          console.log(err)
        })
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
        <div className='bg-white flex gap-4 h-[50px] items-center'>
            {CoinsData?.map((item,index)=>(
              <div  key={index + '-item'} className='flex gap-x-4 items-center border-r-[1px] border-lightThemeOutline pr-4 text-base font-semibold'>
                 <span className="">
               {item?.symbol}
             </span>
             <span className="text-lightThemeSuccess">
               {item?.formattedPrice}
             </span>
              </div>
            ))}
        </div>
    );
}

export default TrendingBar;
