import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

  // Hooks: Set Name, Email, Password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Submit Action
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Name: "+name+"\n"+"Email: "+email+"\n"+"Password: "+password);
  }

  return (
    <div className='login'>
      <section>
        <form onSubmit={submitHandler}>
          <h2>Register</h2>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            type='text' 
            placeholder='Name'/>

          <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            type='email' 
            placeholder='Email'/>

          <input 
            value={password} 
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