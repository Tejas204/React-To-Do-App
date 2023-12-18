import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { server } from '../main';
import toast from 'react-hot-toast';

const Register = () => {

  // Hooks: Set Name, Email, Password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Submit Action
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
      toast.success(data.message);
    } catch (error) {
      toast.error("Error");
      console.log(error);
    }
  }

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