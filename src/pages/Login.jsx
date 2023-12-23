import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  // Hook: Set and access isAuthenticated
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Navigate: Nagigate to home if user is authenticated
  if(isAuthenticated) return <Navigate to={"/"}/>

  // Function: Handle Submit Action
  const submitHandler = async (e) => {
    e.preventDefault();

    // Throttling
    setLoading(true);

    try {
      const {data} = await axios.post(
      `${server}/users/login`, 
      {
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
    setLoading(false);
      
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: '10px',
          fontFamily: 'sans-serif',
        },
      });
      console.log(error);

      // Registration is failure
      setIsAuthenticated(false);
      setLoading(false);
    }
  }

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <h2>Login</h2>
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

          <button disabled={loading} type='submit'>Login</button>
          <h4>Or</h4>
          <Link className='registerLoginButton' to={'/register'}>Register</Link>
        </form>
      </section>
    </div>
  )
}

export default Login