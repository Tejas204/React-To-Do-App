import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Context, server } from './main';

function App() {

  // Context
  const {setUser, setIsAuthenticated, setLoading} = useContext(Context);

  // Hook: Keeps user logged after page refresh
  useEffect(() => {
    // Set loading animation to true.
    setLoading(true);

    axios.get(`${server}/users/me`, {
      withCredentials: true,
    }).then(res => {
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error) => {
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    })
  }, [])

  return (
  <Router>
    <Header></Header>
    <Toaster/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
</Router>
  )
}

export default App;
