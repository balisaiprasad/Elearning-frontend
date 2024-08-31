import React from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {UserData}from "../../context/UserContext";
const Register = () => {
  const navigate = useNavigate();
const {btnLoading,registerUser} = UserData();
const [name,setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState ("");

  const submitHandler =async(e) =>{
    e.preventDefault()
    await  registerUser(name,email,password,navigate);
  }
  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2>REGISTER</h2>
        <form onSubmit={submitHandler}>

        <label htmlFor='name'>Username</label>
        <input type="text"   value={name}
             onChange={(e) => setName(e.target.value)}required/>
            
            <label htmlFor='email'>Email</label>
            <input type="email" value={email}
             onChange={(e) => setEmail(e.target.value)} required/>

            <label htmlFor='password'>Password</label>
            <input type="password"  value={password}
             onChange={(e) => setPassword(e.target.value)} required/>

            <button type='submit' disabled={btnLoading} className='common-btn'>{btnLoading?"Please Wait.!":"Register"}</button>

        </form>
        <p>Already Have an Account? <Link to="/login">Login</Link></p>
           
        
     </div>
    </div>
  )
}

export default Register
