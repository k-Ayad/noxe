import React, { useState ,useEffect } from 'react';
import { Link, useNavigate , useLocation  } from "react-router-dom";


export default function Navbar(props) {



    const [activeItem, setActiveItem] = useState('home');
   
       
        let navigate = useNavigate();
        let location = useLocation();

        useEffect(() => {       // change active element in navbar 
            
            setActiveItem(location.pathname);

          }, [location]);

    
    

    function clearStorage() {
        sessionStorage.removeItem('token');
        props.setToken(null);
        navigate('/login');
    }

    function checkLog() {
        if (sessionStorage.getItem('token') == null) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/noxe">Noxe</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fa-solid fa-bars text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item mr-auto" >
                                <Link className={"nav-link " + (activeItem == '/noxe' ? 'active' : '')} aria-current="page" to="/noxe">Home</Link>
                            </li>


                            {checkLog() ? <>
                                <li className="nav-item" >
                                    <Link className={"nav-link " + (activeItem == '/all' ? 'active' : '')} to="all">All</Link>
                                </li>

                                <li className="nav-item" >
                                    <Link className={"nav-link " + (activeItem == '/movies' ? 'active' : '')} to="movies">Movies</Link>
                                </li>

                                <li className="nav-item" >
                                    <Link className={"nav-link " + (activeItem == '/tv' ? 'active' : '')} to="tv">Tv</Link>
                                </li>

                            </> : ''
                            }


                            <li className="nav-item" >
                                <Link className={"nav-link " + (activeItem == '/about' ? 'active' : '')} to="about">About</Link>
                            </li>

                        </ul>

                        <ul className="navbar-nav me-end px-lg-3 mb-2 mb-lg-0 d-flex">

                            {checkLog() ? <>
                                <li className="nav-item" onClick={clearStorage}>
                                    <Link className={"nav-link "} to="/">Logout</Link>
                                </li>
                            </> : <>
                                <li className="nav-item" >
                                    <Link className={"nav-link " + (activeItem == '/login' ? 'active' : '')} aria-current="page" to="login">Login</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={"nav-link " + (activeItem == '/register' ? 'active' : '')} to="register">Register</Link>
                                </li>

                            </>}





                            <li className="nav-item d-flex align-items-center order-lg-first py-2">
                                <i className='fab mx-2 fa-facebook'></i>
                                <i className='fab mx-2 fa-twitter'></i>
                                <i className='fab mx-2 fa-instagram'></i>
                                <i className='fab mx-2 fa-spotify'></i>
                                <i className='fab mx-2 fa-soundcloud'></i>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
