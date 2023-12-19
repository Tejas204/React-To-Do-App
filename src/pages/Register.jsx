import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {

  // Hooks: Set Name, Email, Password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  // Function: Handle Submit Action
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(
      `${server}/users/new`, 
      {
        name: name, 
        email: email, 
        password: password,
      }, 
      {
        headers:{
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );
      
    toast.success(data.message, {
      style: {
        borderRadius: '10px',
        fontFamily: 'sans-serif',
      },
    });

    // Registration is success
    setIsAuthenticated(true);
      
    } catch (error) {
      toast.error("Error");
      console.log(error);

      // Registration is failure
      setIsAuthenticated(false);
    }
  }

  // Navigate: Nagigate to home if user is authenticated
  if(isAuthenticated) return <Navigate to={"/"}/>

  /*
  * Component: Register
  * Functionality: Contains the registration form
  */
  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <h2>Register</h2>
          <input 
            value={name} 
            required
            onChange={(e) => setName(e.target.value)} 
            type='text' 
            placeholder='Name'/>

          <input 
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            placeholder='Email'/>

          <input 
            value={password} 
            required
            onChange={(e) => setPassword(e.target.value)} 
            type='password' 
            placeholder='Password'/>

          <button type='submit'>Submit</button>
          <h4>Or</h4>
          <Link className='registerLoginButton' to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register