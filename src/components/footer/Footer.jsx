import React from 'react'
import './footer.css';
import { FaFacebook } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { FaInstagram } from "react-icons/fa6";
const footer = () => {
  return (
    <footer>
        <div className='footer-content'>
            <p>
                &copy; 2024 your E-Learning Platform. ALL RIGHTS ARE RESERVED.<br/>
                Made With ❤️<a herf="">BALI </a>
            </p>
        <div className='social-links'>
            <a herf=""><FaFacebook /></a>
            <a herf=""><DiGithubBadge /></a>
            <a herf= ""><FaInstagram /></a>
            
        </div>
    </div>
    </footer>
    
  )
}

export default footer
