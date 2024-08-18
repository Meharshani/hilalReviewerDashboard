import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GetNews } from '../../service/service';

const NewCarousel = () => {
    const [news , setNews] = useState([])
    useEffect(() => {
        GetNews(5).then((res)=>{
            if(res.success){

                setNews(res.body?.news);
            }
        }).catch((err)=>console.log(err))
    }, []);
    const settings = {
        autoplay: true, 
        autoplaySpeed: 2500, 
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    const calculateTimeDifference = (inputDate) => {
        const now = new Date();
      
        // Attempt to convert inputDate to a Date object
        const targetDate = new Date(inputDate);
        if (isNaN(targetDate)) {
          return "Invalid date format";
        }
      
        const difference = now - targetDate; // Difference in milliseconds
      
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
      
      
        if (days > 0) {
          return `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
      };
    return (
        <Slider {...settings}>
            {
                news?.map((obj,index)=>(

            <a href={`${obj?.share_url}`} target="_blank" rel="noopener noreferrer" key={index+'-item'} className='md:px-3'>
                <img
                    className='rounded-xl h-[160px] md:h-[180px] w-full object-cover'
                    src={obj?.thumb}
                     alt="slide" />
                <div className='text-base font-semibold pt-4'>
                   {obj?.title}
                </div>
                <div className='text-sm float-left font-normal pt-2 text-[#747474]'>
                                                            {obj?.author} <br/>
                                                            {calculateTimeDifference(obj?.published_at?.date)}
                                                        </div>
                                                        <div className='text-sm  text-right font-normal pt-2 text-[#747474]'>
                                                           Cointelegraph
                                                        </div>
            </a>
                ))
            }
            {/* <div className='md:px-3'>
                <img
                    className='rounded-xl h-[160px] md:h-[180px] w-full object-cover'
                    src="https://picsum.photos/200"
                    alt="slide" />
                <div className='text-base font-semibold pt-4'>
                    Bitcoin Token ORDI Surges to New High, Top 50 Coins
                </div>
                <div className='text-sm font-normal pt-2 text-[#747474]'>
                    12m ago • The Block
                </div>
            </div>
            <div className='md:px-3'>
                <img
                    className='rounded-xl h-[160px] md:h-[180px] w-full object-cover'
                    src="https://picsum.photos/200"
                     alt="slide" />
                <div className='text-base font-semibold pt-4'>
                    Bitcoin Token ORDI Surges to New High, Top 50 Coins
                </div>
                <div className='text-sm font-normal pt-2 text-[#747474]'>
                    12m ago • The Block
                </div>
            </div>
            <div className='md:px-3'>
                <img
                    className='rounded-xl h-[160px] md:h-[180px] w-full object-cover'
                    src="https://picsum.photos/200"
                    alt="slide" />
                <div className='text-base font-semibold pt-4'>
                    Bitcoin Token ORDI Surges to New High, Top 50 Coins
                </div>
                <div className='text-sm font-normal pt-2 text-[#747474]'>
                    12m ago • The Block
                </div>
            </div> */}
        </Slider>
    );
};

export default NewCarousel;
