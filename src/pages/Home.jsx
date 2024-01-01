import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Home = () => {

  // Hooks: Set title and Description of new task
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

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
    setTitle("");
    setDescription("");
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

  // Hook: gets the existing task of the user
  useEffect(() => {
    axios.get(`${server}/tasks/getMyTasks`, {
      withCredentials: true,
    })
    .then((res) => {
      setTasks(res.data.tasks);
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: '10px',
          fontFamily: 'sans-serif',
        },
      })
    })
  }, []);

  return (
    // Parent container
    <div className='container'>

    {/* New task form */}
      <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <h2>New Task</h2>
          <input 
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)} 
            type='text' 
            placeholder='Title'
            size={50}/>

          <input 
            value={description} 
            required
            onChange={(e) => setDescription(e.target.value)} 
            type='text' 
            placeholder='Description'
            size={50}/>

          <button disabled={loading} type='submit'>Submit</button>
      
        </form>
      </section>
    </div>

      {/* List of existing tasks */}
      {
        tasks.map(task => {
          return(
            <div className='toDosContainer' key={task._id}>
              {/* Contains task title and description */}
              <div>
                <h4>{task.title}</h4>
                <h5>{task.description}</h5>
              </div>

              {/* Contains checkbox and delete button */}
              <form>
                {/* Update button */}
                <input type='checkbox'></input>
              </form>
                {/* Delete button */}
              <form>
                <button>Delete</button>
              </form>

            </div>
          )
        })
      }
        

      <div>
          {tasks.map(i => 
            <p key={i._id}>{i.title}</p>
          )}
        </div>
      
    </div>
  )
}

export default Home;