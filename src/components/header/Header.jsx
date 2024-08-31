import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import { MdLaptopChromebook } from "react-icons/md";


const Header = ({isAuth}) => {
  return (
    <header>
        <div className='logo'>ELantroing
     <a href=''><MdLaptopChromebook />
    </a>
    </div>
    <div className='link'>
        <Link to = {'/'}>Home</Link>
        <Link to = {'/courses'}>Courses</Link>
        
        <Link to = {'/about'}>About</Link>
        {isAuth?(
          <Link to = {'/account'}>Account</Link>
        ):(
          <Link to = {'/login'}>Login</Link>
        )}
    </div>
    </header>
  );
};

export default Header
