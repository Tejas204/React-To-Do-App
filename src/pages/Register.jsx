import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='login'>
      <section>
        <form>
          <h2>Register</h2>
          <input type='text' placeholder='Name'/>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button type='submit'>Submit</button>
          <h4>Or</h4>
          <Link className='registerButton' to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register