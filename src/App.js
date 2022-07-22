import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Register from './Components/Register/Register';
import Movies from './Components/Movies/Movies';
import Tv from './Components/Tv/Tv';
import All from './Components/All/All';
import About from './Components/About/About';
import Login from './Components/Login/Login';


import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


export default function App() {

  
    let [token , setToken] = useState(null);
    const tokenStorage = sessionStorage.getItem('token');

    function ProtectedRoute(props){
        if(tokenStorage === null){
          return <Navigate to='/login' />;
        }else
        {
          return props.children;
        }
    }
    
  return (
    <>
      <Navbar  setToken={setToken}/>
     <Routes>
        <Route path="/" element={ <Home tokenStorage={tokenStorage} />} />
        <Route path="register" element={<Register />} />
        <Route path="movies" element={ <ProtectedRoute> <Movies /> </ProtectedRoute>  } />
        <Route path="tv" element={ <ProtectedRoute> <Tv /> </ProtectedRoute> } />
        <Route path="all" element={ <ProtectedRoute> <All /> </ProtectedRoute> } />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login setToken={setToken} />} />
     </Routes>
    
    </>
  )
}
