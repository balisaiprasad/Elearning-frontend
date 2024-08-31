

import React from 'react';
import {  useNavigate } from 'react-router-dom';
import "./home.css";
import Testimonial from '../../components/testimonials/Testimonial';


const Home = () => {
  return (
    <div>
    <div className='home'>
        <div className='home-content'>
            <h1>Welcome where talent meets knowledge</h1>
            <p> Dream,Learn,Achive</p>
            <button onClick={()=> useNavigate("/courses")}
            className='common-btn'>Launch</button>
        </div>
    </div>
    <Testimonial/>
   
    </div>
  );
};

export default Home;
