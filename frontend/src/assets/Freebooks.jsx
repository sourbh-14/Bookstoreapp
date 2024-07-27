import React from 'react';
import {useState,useEffect} from "react"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import Cards from './Cards';
import axios from "axios"; 

function Freebooks() {
  const[book,setBook]=useState([]); 
  useEffect(()=>{
    const getBook=async()=>{
      try{
       const res = await axios.get("http://localhost:4001/book"); 
      //  console.log(res.data.filter((data) => data.category === "free")); 
       setBook(res.data.filter((data) => data.category === "free")); 
      } catch(error){
         console.log("error",error); 
      }
    }
    getBook(); 
  },[]); 
  

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
      <div>
        <h1 className='font-semibold text-xl pb-2'>
          Free offered Courses
        </h1>
        <p className='mb-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Imp tenetur, quis architecto natus aut ratione, quae accusantium molestias eum odit obcaecati!
        </p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {book.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Freebooks;