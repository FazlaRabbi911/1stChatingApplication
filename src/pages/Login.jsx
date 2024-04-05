import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material';
import Images from '../Components/Images';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaExclamationCircle } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { activeuser } from '../userslice';

const Login = () => {

  let dispatch = useDispatch()
  let[openeye,setopeneye]=useState(false)
  let navigate = useNavigate()
  const auth = getAuth();

  let activedata = useSelector((state)=>state?.storeuser?.value)
  useEffect(()=>{
    if(activedata?.email){
      navigate("/home/feed")
    }
    
  },[])
  let [data,setdata]=useState({
    email:"",
    password:""
  })
  let [errordata,seterrordata]=useState({
    email:"",
    password:""
  })
  
  let addinfo=(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
    seterrordata({...errordata,[e.target.name]:""})
  }

  let handleclick =()=>{
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!data.email){
      seterrordata({...errordata,email:"Email required"})
    }else if(!pattern.test(data.email)){
      seterrordata({...errordata,email:"Valid email requard"})
    }else if(!data.password){
      seterrordata({...errordata,password:"Password requard"})
    }else if(data.password.length<6){
      seterrordata({...errordata,password:"password must be greater than 6"})
    }else{
      // let input1 = document.getElementById("outlined3")
      // let input2 = document.getElementById("outlined1")
      // input1.value=""
      // input2.value=""
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
           toast.success('Logging successful', {
              position: "bottom-center",
              theme: "dark",
              autoClose: 3000
              });
            localStorage.setItem("userAppdata",JSON.stringify(userCredential.user))
            // userAppdata is the key name of application data in web 
            // JSON.stringify making (userCredential.user) object to string 
            dispatch(activeuser(userCredential.user))
            navigate("/home/feed")
        }) 
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.message )
        if(error.message.includes("auth/invalid-credential")){
          seterrordata({...errordata, email: "invalid credential"});
          toast.error('verify your email first', {
            position: "bottom-center",
            theme: "dark",
            autoClose: 3000
            });
        }
        else if(error.message.includes("auth/invalid-credential")){
          seterrordata({...errordata, email: "Email already in use"});
        }
      });
    }
  }

  return (
    <Grid container spacing={2}>
  <Grid  xs={6}>
    <div className="reg_box">
      <h1 className='reg_hdng'>Login to your account!</h1>
      <div className="reg_input">
        <TextField id="outlined1"  onChange={addinfo} name='email'  label="email " variant="outlined" />
        {errordata.email && <div className='alart'  ><h2><FaExclamationCircle className='alart_icn_lgin' />{errordata.email}</h2></div>}
        <div className='password'>
                    <TextField id="outlined3"  name='password' onChange={addinfo}type={openeye ? "text" : "password"} label="Password" variant="outlined" />
                    {openeye &&   <FaRegEye className='eye' onClick={()=>{setopeneye(!openeye)}}/>}
                    {!openeye &&    <TbEyeClosed className='eye'onClick={()=>{setopeneye(!openeye)}}/>}

                </div>
        {errordata.password && <div className='alart'  ><h2><FaExclamationCircle className='alart_icn_lgin' />{errordata.password}</h2></div>}
        <Button onClick={handleclick} className='reg_btn' variant="contained">Login to Continue</Button>   
        <p className='forlink'><Link to={"/Forgot"}>forgot password?</Link></p>

      </div>    
    </div>

  </Grid>
  <Grid  xs={6}>
    <Images  className="hhh" src={"./src/assets/reg_bnr.png"}/>
  </Grid>
  </Grid>
  )
}

export default Login