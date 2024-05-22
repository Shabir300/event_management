import React, {createContext, useEffect, useState} from 'react';
import { makeRequest } from '../axios.js';

// authcontext 
export const AuthContext = createContext();


// context provider to be wrapped around app in index.js
export const AuthContextProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (inputs) => {
    try {
      const res = await makeRequest.post('/login', inputs);
      console.log('logged user', res);
      setCurrentUser(res.data[0]);
      return res;
    } catch(err) {
      return err;
    }
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    // provide currentUser and login as value to AuthContext.Provider so that they can be accessed elsewhere
    <AuthContext.Provider value={{currentUser, login}}>
      {children}
    </AuthContext.Provider>
  )
};