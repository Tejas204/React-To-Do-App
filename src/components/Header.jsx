import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'

const Header = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);

  return (
    <nav>
        <div>
          <h2>To Do App</h2>
        </div>
        <article>
            <Link className='pageURI' to={'/'}>Home</Link>
            <Link className='pageURI' to={'/profile'}>Profile</Link>
            {
              isAuthenticated ? <Link className='pageURI' to={'/logout'}>Logout</Link> : 
              <Link className='pageURI' to={'/login'}>Login</Link>
            }
        </article>
    </nav>
  )
}

export default Header