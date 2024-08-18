// StateContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { GetCmcData } from '../service/service';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
 const [cartItem, setCartItems] = useState([]) 
 const [CoinsData, setCoinsData] = useState([])
 const [selectedStatus, setSelectedStatus] = useState('All');
 const [selectedRank, setSelectedRank] = useState('Top 10');
 const [selectedPercentage, setSelectedPercentage] = useState('24h');
 const [isLoading, setIsLoading] = useState(false)
 const [noDataFlag, setNoDataFlag] = useState(false)
 const [isLogedin, setIsLogedin] = useState(false);
 const [userData, setuserData] = useState({})
 useEffect(() => {

   const token = localStorage.getItem('user_token');
   if (token) {
     setIsLogedin(true)

   }
   else {
     setIsLogedin(false)
   
   }
 
 }, [])
 useEffect(() => {
  setIsLoading(true)
  fetchData()

  const interval = setInterval(fetchData, 20000);

  return () => clearInterval(interval);
  
 // eslint-disable-next-line
}, [selectedStatus, selectedRank, selectedPercentage])

const fetchData = () => {
  let number = null;
  if (selectedRank !== 'All') {
    number = parseInt(selectedRank.match(/\d+/)[0], 10);
  }
  GetCmcData(selectedStatus, number, selectedPercentage).then((result) => {
    setIsLoading(false)
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
      if (result?.body?.cmcData?.length === 0) {
        setNoDataFlag(true)
      }
      else {
        setNoDataFlag(false)
      }
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
    <StateContext.Provider value={{cartItem, setCartItems,CoinsData, setCoinsData,selectedStatus, setSelectedStatus,selectedRank, setSelectedRank,selectedPercentage,setSelectedPercentage,isLoading, noDataFlag,isLogedin, setIsLogedin,userData,setuserData}}>
      {children}
    </StateContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(StateContext);
};
