import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Home = () => {

  // Hooks: Set title and Description of new task
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  // Function: Handle Submit Action
  const submitHandler = async (e) => {
    e.preventDefault();

    // Throttling
    setLoading(true);

    try {
      const {data} = await axios.post(
      `${server}/tasks/new`, 
      {
        title: title, 
        description: description,
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
    // Parent container
    <div className='container'>

    {/* New task form */}
      <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <h2>Tasks</h2>
          <input 
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)} 
            type='text' 
            placeholder='Title'/>

          <input 
            value={description} 
            required
            onChange={(e) => setDescription(e.target.value)} 
            type='text' 
            placeholder='Description'/>

          <button disabled={loading} type='submit'>Submit</button>
      
        </form>
      </section>
    </div>

      {/* List of existing tasks */}
      <section className='toDosContainer'>

      </section>
    </div>
  )
}

export default Home;