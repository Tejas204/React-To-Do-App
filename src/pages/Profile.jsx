import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader';

const Profile = () => {

  const {setIsAuthenticated, user, loading} = useContext(Context);
  console.log(user);
  return (

    loading ? <Loader/> : ( 
      <div className='profileInformation'>
        <div>
          <h1 className='userName'>{user?.name}</h1>
          <h3 className='userEmail'>{user?.email}</h3>
        </div>
      </div>
    )
    
  );
};

export default Profile