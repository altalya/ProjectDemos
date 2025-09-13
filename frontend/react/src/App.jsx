// import {useState} from 'react'
// import './App.css'
import AuthForm from './components/AuthForm';
import { useState } from 'react';
import Dashboard from './components/Dashboard';

function App() {
  const [auth, setAuth] = useState(false);
  return(
    <>
      {auth ? <Dashboard /> : <AuthForm auth={(getAuth) => setAuth(getAuth)} />}
    </>
  );
}

export default App
