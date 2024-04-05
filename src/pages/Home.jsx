import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import { activeuser } from '../userslice';

const Home = () => {
  let navigate = useNavigate()
  let data = useSelector((state)=>state?.storeuser?.value)
  console.log(data)
  useEffect(()=>{
    if(!data?.email){
      navigate("/login")
      console.log("problem")
    }
  },[])
  return (
    <Grid container spacing={2}>
    <Grid item xs={4}>
      <Navbar/>
    </Grid>
    <Grid item xs={8}>
      <h2><Outlet/></h2>
    </Grid>
  </Grid>
  )
}

export default Home