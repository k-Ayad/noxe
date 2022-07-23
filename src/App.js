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
  Navigate,
  Link
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
        <Route path="/noxe" element={ <Home tokenStorage={tokenStorage} />} />
        <Route path="register" element={<Register />} />
        <Route path="movies" element={ <ProtectedRoute> <Movies /> </ProtectedRoute>  } />
        <Route path="tv" element={ <ProtectedRoute> <Tv /> </ProtectedRoute> } />
        <Route path="all" element={ <ProtectedRoute> <All /> </ProtectedRoute> } />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path='*' element={ <>
      <div className=' container'>
        <div className="row">
          <div className=' offset-md-2 col-md-8'>
            <div className=' d-flex flex-wrap justify-content-center align-items-center py-5'>
              <div className=' text-center '>
                <h1 className=' py-5'>404 page not found </h1>
                <p>click <Link to={'/noxe'}>HERE</Link> to navigate you to the home page</p>
                
              </div>

            </div>
          </div>
        </div>
      </div>
    </> } />
     </Routes>
    
    </>
  )
}
