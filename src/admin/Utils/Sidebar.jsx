import React from 'react'
import "./common.css";
import { SiHomeadvisor } from "react-icons/si";
import { IoBook } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>
            <li>
                <Link to ={'/admin/dashboard'}>
                <div className='icon'>
                  <SiHomeadvisor/>  
                </div>
                <span>HOME</span>
                </Link>
            </li>

            <li>
                <Link to ={'/admin/course'}>
                <div className='icon'>
                <IoBook /> 
                </div>
                <span>COURSE</span>
                </Link>
            </li>

            
            <li>
                <Link to ={'/admin/users'}>
                <div className='icon'>
                <FiUsers />
                </div>
                <span>USERS</span>
                </Link>
            </li>

            <li>
                <Link to ={'/account'}>
                <div className='icon'>
                <TbLogout />
                </div>
                <span>LOGOUT</span>
                </Link>
            </li>
        </ul>
      
    </div>
  )
}

export default Sidebar
