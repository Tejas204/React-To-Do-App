import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';

function App() {

  return (
  <Router>
    <Header></Header>
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
</Router>
  )
}

export default App;
