import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate , useLocation } from "react-router-dom";


export default function Login(props) {
  

  // check if there's ani messages sent in location
  const [message , setMsg] = useState('');
  const location = useLocation();
  if (location.state != null){
    message = location.state.message ;
  }

  //......
 
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  let navigate = useNavigate();
  const [error, setError] = useState('');
  let [loadingFlag , setLoadingFlag] = useState(false);

  let loginSubmit = async (e)=>{
    setLoadingFlag(true);
    e.preventDefault(); 
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin',user);
    
      if (data.message == 'success'){
          
          navigate("/all", { replace: true });
          sessionStorage.setItem('token',data.token);
          props.setToken(data.token);
      }else
      {
          setError('email or password not valid');
      }
      setLoadingFlag(false);
  }
  
  let getUserData = (e)=>{
    let myUser = {...user} ;
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
    setError('');
  }

  return <>

    <div className ="container py-5">

      <div className ="row">
        <div className =" offset-md-2 col-md-8">
            <div>
                <h2 className=' text-center'>Login Form</h2>
                {message? <div className =' alert alert-info'>{message}</div> : ''}
                {error.length >0? <div className =' alert alert-danger'>{error}</div> : '' } 

                <form onSubmit={loginSubmit}>
                    <label htmlFor ="email">Email :</label>
                    <input onChange={getUserData} type="email" name='email' id='email' className=' form-control mb-3' />

                    <label htmlFor="password">Password :</label>
                    <input onChange={getUserData} type="password" name='password' id='password' autoComplete="on" className=' form-control mb-3' />

                    <button type='submit' className =' btn btn-outline-info' > {loadingFlag? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Login'} </button>
                            
                </form> 

            </div>
        </div>
            
      </div>
    </div>

  </>

}
