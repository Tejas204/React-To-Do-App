import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
        <div>
          <h2>To Do App</h2>
        </div>
        <article>
            <Link className='pageURI' to={'/'}>Home</Link>
            <Link className='pageURI' to={'/profile'}>Profile</Link>
            <Link className='pageURI' to={'/login'}>Login</Link>
        </article>
    </nav>
  )
}

export default Header