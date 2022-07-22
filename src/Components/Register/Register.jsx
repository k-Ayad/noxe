import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Register(props) {

    let navigate = useNavigate();
    let [loadingFlag, setLoadingFlag] = useState(false);
    const [errorMessage, setError] = useState(''); // to save and show errors from DB
    const [validationErrors , setValidationErrors] = useState({
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        password: ''
    })



    const [user, setUser] = useState({
        first_name: '',
        last_name: '',
        age: 0,
        email: '',
        password: ''
    });



    // on submit we check the validation if all requirements are filled, will let user login 
    let submit = async (e) => {
        setLoadingFlag(true);   // this flag means the proccess just begin to make the button change to alert the user there is loading now
        e.preventDefault();     // to prevent refresh

        let { error } = checkUser(); // making a schema for validation using joi library 

        let myErrorList = {         // new obj for clearing the previous validation 
            first_name: '',
            last_name: '',
            age: '',
            email: '',
            password: ''
        }


        if (error) {     // if there is errors set every error in its title 
            
            error.details.forEach(element => {
                if(element.path[0] == 'first_name')     // if there is error in frist name set this error message in the error-list
                {
                    myErrorList['first_name'] = element.message;
                }

                if(element.path[0] == 'last_name')
                {
                    myErrorList['last_name'] = element.message;
                }

                if(element.path[0] == 'age')
                {
                    myErrorList['age'] = element.message;
                }

                if(element.path[0] == 'email')
                {
                    myErrorList['email'] = element.message;
                }

                if(element.path[0] == 'password')
                {
                    myErrorList['password'] = element.message;
                }
            });

            
           
        } else {        // if there is no errors send the data to DB and check DB response
            let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signup', user);
            if (data.message == "success") {
                setError('');
                navigate('/login' ,{state:{message:'registration succeeded'}});
            } else {
                setError(data.message);
            }
        }

        setLoadingFlag(false);
        setValidationErrors(myErrorList);
    }

    let getUserData = (e) => {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }

    function checkUser() {
        const schema = Joi.object({
            first_name: Joi.string().alphanum().min(3).regex(/^[a-zA-Z]/).required(),
            last_name: Joi.string().alphanum().min(3).regex(/^[a-zA-Z]/).required(),
            age: Joi.number().min(7).required(),
            email: Joi.string().regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).required(),
            password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        })

        return schema.validate(user, { abortEarly: false });
    }



    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className=" offset-md-2 col-md-8">
                        <div >
                            <h2 className=' text-center'>Registeration Form</h2>
                            {errorMessage.length > 0 ? <div className=' alert alert-danger'>{errorMessage}</div> : ''}
                            <form onSubmit={submit}>
                                <label htmlFor="first_name">First Name :</label>
                                <input onChange={getUserData} type="text" name='first_name' id='first_name' className=' form-control ' />
                                <span className=' text-danger d-block mb-3'> {validationErrors.first_name? validationErrors.first_name : ''} </span>

                                <label htmlFor="last_name">Last Name :</label>
                                <input onChange={getUserData} type="text" name='last_name' id='last_name' className=' form-control ' />
                                <span className=' text-danger d-block mb-3'> {validationErrors.last_name? validationErrors.last_name : ''} </span>

                                <label htmlFor="Age">Age :</label>
                                <input onChange={getUserData} type="age" name='age' id='age' className=' form-control ' />
                                <span className=' text-danger d-block mb-3'> {validationErrors.age? validationErrors.age : ''} </span>

                                <label htmlFor="email">Email :</label>
                                <input onChange={getUserData} type="email" name='email' id='email' className=' form-control ' />
                                <span className=' text-danger d-block mb-3'> {validationErrors.email? 'email should be like somthing@someserver.com' : ''} </span>

                                <label htmlFor="password">password :</label>
                                <input onChange={getUserData} type="password" name='password' id='password' autoComplete="on" className=' form-control ' />
                                <span className=' text-danger d-block mb-3'> {validationErrors.password? 'Minimum eight characters, at least one letter and one number' : ''} </span>

                                <button type='submit' className=' btn btn-outline-info float-end'>{loadingFlag ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Register'}</button>
                                <div className=' clearfix'></div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
