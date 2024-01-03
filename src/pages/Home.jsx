import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import ToDoItem from '../components/ToDoItem';

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

  // Function: handles update to task
  const updateHandler = async (id) => {
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`, {},{
        withCredentials: true,
      });
      toast.success(data.message, {
        style: {
          borderRadius: '10px',
          fontFamily: 'sans-serif',
        },
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        style: {
          borderRadius: '10px',
          fontFamily: 'sans-serif',
        },
      });
    }
  }

  // Function: handles deletion of task
  const deleteHandler = (id) => {
    toast.error(id);
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
      <div className='toDosContainer'>
      {
        tasks.map(task => {
          return(
              <ToDoItem 
                title = {task.title} 
                description = {task.description} 
                isCompleted = {task.isCompleted}
                updateHandler = {updateHandler}
                deleteHandler = {deleteHandler}
                id = {task._id}
                key={task._id}
                />
          )
        })
      }
      </div>
      
    </div>
  )
}

export default Home;