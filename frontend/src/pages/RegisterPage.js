import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import {toast}from 'react-toastify';
import fireDB from '../fireConfig';

import { getFirestore,doc,setDoc } from 'firebase/firestore';
const auth = getAuth();

const Registerpage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [cpassword, setCpassword] = useState('')
    
    const registration= async(email, password, rol)=>{
        const result =  await createUserWithEmailAndPassword(auth, email, password).then((usuariosFirestore)=>{return usuariosFirestore})
        console.log(result)

        const docuRef= await doc(fireDB,`users/${result.user.uid}`)
            setDoc(docuRef, {correo: email, rol: rol})
    
    }       

    const register = async() => {
        try {
            const rol = "admin";      
            setLoading(true)
            registration(email,password ,rol)
           setLoading(false)
            toast.success('Registration successfull')
            setEmail('')
            setPassword('')
            setCpassword('')
        } catch (error) {
            toast.error('Registration failed')
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div className='register-parent'>
            {loading && (<Loader/>) }
            <div className='register-top'></div>
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_jwvswiza.json" background="transparent" speed="1" loop autoplay></lottie-player>
                </div>


                <div className='col-md-4 z1'>
                    <div className='register-form'>
                        <h2>Register</h2>
                        <hr />
                        <input type='text' className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />


                        <input type='password' className='form-control' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />


                        <input type='password' className='form-control' value={cpassword} onChange={(e) => { setCpassword(e.target.value) }} placeholder='Confirm password' />


                        <button className='my-4' onClick={register}>Register</button>
                        <hr />

                        <Link to='/login'>Do you have an account? Sing In here</Link>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Registerpage;
