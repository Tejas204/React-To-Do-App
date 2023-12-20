import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main';
import toast from 'react-hot-toast';

const Login = () => {

  // Hook: Set and access isAuthenticated
  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Function: Handle Submit Action
  const submitHandler = async (e) => {
    e.preventDefault();

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
      
    } catch (error) {
      toast.error("Error");
      console.log(error);

      // Registration is failure
      setIsAuthenticated(false);
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

          <button type='submit'>Login</button>
          <h4>Or</h4>
          <Link className='registerLoginButton' to={'/register'}>Register</Link>
        </form>
      </section>
    </div>
  )
}

export default Login