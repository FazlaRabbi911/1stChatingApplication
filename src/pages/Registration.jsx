import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Images from '../Components/Images';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { FaRegEye } from "react-icons/fa";
import { TbEyeClosed } from "react-icons/tb";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile
} from "firebase/auth";
import { Watch } from 'react-loader-spinner'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Registration = () => {
    let activedata = useSelector((state)=>state?.storeuser?.value)
    useEffect(()=>{
      if(activedata?.email){
        navigate("/home/feed")
      }
    },[])
    const auth = getAuth();
    let navigate =useNavigate()
    let [loading,setloading]=useState(false)
    let[openeye,setopeneye]=useState(false)
    let [Regdata,setRegdata]=useState({
        email:"",
        name:"",
        password:"",
    });
    let [Errordata,setError]=useState({
        email:"",
        name:"",
        password:"",
    });
    let handleChange=(e)=>{
        setRegdata({...Regdata,[e.target.name]:e.target.value})
        setError({...Errordata,[e.target.name]:""})
    }
    let handlesubmit = () => {
        let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!Regdata.email){
            setError({...Errordata, email: "email is required"});
        } else if (!pattern.test(Regdata.email)){
            setError({...Errordata, email: "valid email is required"});
        } else if (!Regdata.name) {
            setError({...Errordata, name: "Name is required"});
        } else if (!Regdata.password) {
            setError({...Errordata, password: "password is required"});
        }else if(Regdata.password.length < 6){
            setError({...Errordata, password: "password must be greater than 6"});
            console.log("smal")
        }else {
            setloading(true)
            let input1 = document.getElementById("outlined1")
            let input2 = document.getElementById("outlined2")
            let input3 = document.getElementById("outlined3")
             input1.value = "";
             input2.value = "";
             input3.value = "";
            createUserWithEmailAndPassword(auth, Regdata.email, Regdata.password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: Regdata.name , photoURL: "https://firebasestorage.googleapis.com/v0/b/newro-1abfe.appspot.com/o/1st%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpg?alt=media&token=42a83050-12f6-4e90-86ec-5c82d5386c15"
                      }).then(() => {
                        setloading(false)
                        sendEmailVerification(auth.currentUser)
                        .then(() => {
                            toast.success('Ragistration successful, please check your email!', {
                                position: "bottom-center",
                                autoClose: 5000,
                                theme: "dark",
                            });   
                            navigate("./login")   
                        });  
                      }).catch((error) => {
                        console.log(error)
                      });      
                }) 
                .catch((error) => {
                    setloading(false)
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if(error.message.includes("auth/email-already-in-use")){
                        setError({...Errordata, email: "Email already in use"});
                    }    
                });
        }
    }
    let handleGLog =()=>{
        // console.log("yesss")
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            toast.success('Ragistration successful,', {
                position: "bottom-center",
                autoClose: 5000,
                theme: "dark",
            });   
            navigate("./home/feed") 
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
  return (
    <Grid container spacing={2}>
    <Grid  xs={8} >
      <h2 >
        <div className='reg_box'>
            <div className='dddd' onClick={handleGLog}>
            <Images  className="Glogimg" src={"./src/assets/Google.png"}/>
            </div>
            <h1 className='reg_hdng'>Get started with easily register</h1>
            <div className='reg_input'>
                <TextField id="outlined1"  name='email' onChange={handleChange} label="email " variant="outlined" />
                {Errordata.email &&
                    <Alert className='reg_error' severity="error">{Errordata.email}</Alert>
                }
                <TextField id="outlined2"  name='name' onChange={handleChange} label="name " variant="outlined" />
                {Errordata.name &&
                    <Alert className='reg_error' severity="error">{Errordata.name}</Alert>
                }
                <div className='password'>
                    <TextField id="outlined3"  name='password' onChange={handleChange} type={openeye ? "text" : "password"} label="Password" variant="outlined" />
                    {openeye &&   <FaRegEye className='eye' onClick={()=>{setopeneye(!openeye)}}/>}
                    {!openeye &&    <TbEyeClosed className='eye'onClick={()=>{setopeneye(!openeye)}}/>}

                </div>
                {Errordata.password &&
                    <Alert className='reg_error' severity="error">{Errordata.password}</Alert>
                }
                {!loading &&
                    <Button onClick={handlesubmit} className='reg_btn' variant="contained">Sign up</Button>                
                }
                {loading &&
                    <Watch className="loading"
                    visible={true}
                    height="30"
                    width="30"
                    radius="48"
                    color="#000000"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                }
                <p className='reg_p'>Already  have an account ? Sign In</p>
            </div>
        </div>
      </h2>
    </Grid>
    <Grid  xs={4}>
      <Images className="hhh" src="./src/assets/reg_bnr.png"/>
    </Grid>

  </Grid>
  )
}

export default Registration