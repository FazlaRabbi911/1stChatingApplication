import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";



const Forgot = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let[email,setemail]=useState("")
    let[error,seterror] =useState("")

    let handlechange=(e)=>{
        setemail(e.target.value)
        seterror("")
    }
    let handleClick=()=>{
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!email){
            seterror("Email requard!")
        }if (!pattern.test(email)){
            seterror("valid email required!")
        }else{
            let input1 = document.getElementById("outlined-basic")
            input1.value=""
            sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                toast.success('Please check your email!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "dark",
                    });
                    navigate("/login")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                // ..
            });
        }
    }
  return (
    <div className='for_box'>
        <div className='for_heding'>
            <h1 >Forgot password</h1>
        <TextField id="outlined-basic" name='email'  onChange={handlechange} label="Outlined" variant="outlined" />

        {error && <Alert severity="error">{error}</Alert>}
            <Button variant="contained" onClick={handleClick}>Enter</Button>
        </div>
    </div>
  )
}


export default Forgot