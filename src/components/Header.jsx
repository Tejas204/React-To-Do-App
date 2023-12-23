import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

  // Function: Handle Submit Action
  const logoutHandler = async () => {
    // Throttling
    setLoading(true);

    try {
      const {data} = await axios.get(
      `${server}/users/logout`, 
      {
        withCredentials: true
      }
    );
      
    toast.success("Logged out successfully", {
      style: {
        borderRadius: '10px',
        fontFamily: 'sans-serif',
      },
    });

    // Registration is success
    setIsAuthenticated(false);
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
      setIsAuthenticated(true);
      setLoading(false);
    }
  }

  return (
    <nav>
        <div>
          <h2>To Do App</h2>
        </div>
        <article>
            <Link className='pageURI' to={'/'}>Home</Link>
            <Link className='pageURI' to={'/profile'}>Profile</Link>
            {
              isAuthenticated ? <button className='pageURI' disabled={loading} onClick={logoutHandler} to={'/'}>Logout</button> : 
              <Link className='pageURI' to={'/login'}>Login</Link>
            }
        </article>
    </nav>
  )
}

export default Header