import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
const Loginpage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth();
    const [loading, setLoading] = useState(false)
    const login = async() => {
        try {
            setLoading(true)
          const result =  await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('currentUser', JSON.stringify(result))
            setLoading(false)
            toast.success('Login successfull')
            window.location.href = '/'
        } catch (error) {
            toast.error('Login failed')
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='login-parent'>
         {loading && (<Loader/>) }
            <div className='row justify-content-center'>

            <div className='col-md-4 z1'>
                    <div className='login-form'>
                        <h2>Login</h2>
                        <hr />
                        <input type='text' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />


                        <input type='password' className='form-control' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />




                        <button className='my-3' onClick={login}>Login</button>

                            <hr/>

                        <Link to='/register'>Dont have an account? Sing Up here</Link>
                    </div>

                </div>

                <div className='col-md-5 z1'>
                    <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_jwvswiza.json" background="transparent" speed="1" loop autoplay></lottie-player>
                </div>


            </div>
            <div className='login-bottom'></div>
        </div>
    );
}

export default Loginpage;
