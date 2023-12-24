import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss'
import {createContext} from "react"

// Server URI
export const server = "https://nodejs-todo-app-8f77.onrender.com/api/v1"

// Create context: isAuthenticated
export const Context = createContext({isAuthenticated: false});

/* 
* Component: AppWrapper
* Functionality: Wraps the App component and uses hooks to set isAuthenticated
*/
const AppWrapper = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return(
    <Context.Provider
      value={{
        isAuthenticated, 
        setIsAuthenticated,
        loading, 
        setLoading,
        user, 
        setUser
      }}>
      <App />
    </Context.Provider>
  );
}

/*
 * Component: Root component
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
