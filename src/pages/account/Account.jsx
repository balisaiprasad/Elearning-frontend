import React from 'react'
import { MdDashboardCustomize } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import "./Account.css";
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
const Account = ({user}) => {
  const {setIsAuth, setUser} = UserData();

  const navigate = useNavigate()

  const logoutHandler=() =>{
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Successfully Logged Out");
    navigate("/login");

  };
  return (
    <div>
      {user && <div className='profile'>
        <h2>MY PROFILE</h2>
        <div className='profile-info'>
            <p>
                <strong>NAME - {user.name}</strong>
            </p>

            <p> 
                <strong>EMAIL - {user.email}</strong>
            </p>

            <button onClick={()=> navigate(`/${user._id}/dashboard`)} className='common-btn'><MdDashboardCustomize/>Dashboard</button> <br/>
            {user.role === "admin" && (<button onClick={()=> navigate(`/admin/dashboard`)} className='common-btn'><MdDashboardCustomize/>AdminDashboard</button>)} <br/>
            <button onClick={logoutHandler} style={{background:"red"}} className='common-btn'><GrLogout/>Logout</button>
        </div>
        </div>}
    </div>
  )
}

export default Account;
