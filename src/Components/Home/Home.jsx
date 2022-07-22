import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';


export default function Home(props) {

  const [islogin, setIsLogin] = useState(false);
  const [userName,setUserName] = useState('');
  

  function checkUserLogin() {
    
    if (props.tokenStorage) {
      setIsLogin(true);
      let {first_name} = jwt(props.tokenStorage);
      setUserName(first_name);
    }
  }

  useEffect(() => {
    
    checkUserLogin();
  
   
  }, [])
  

  return (
    <>
      <div className=' container'>
        <div className="row">
          <div className=' offset-md-2 col-md-8'>
            <div className=' d-flex flex-wrap justify-content-center align-items-center py-5'>
              <div className=' text-center '>
                <h1 className=' py-5'>Welcome {islogin? userName : 'in NOXE project'} </h1>
                <p>you can track the most trending movies and tv shows on our website</p>
                {islogin == false ? <div>
                  <p>But first you should <Link to={'login'}>Login</Link> </p>
                  <p>If you are visiting this website for the first time, you should <Link to={'register'}>Register</Link></p>
                </div> : '' }

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
