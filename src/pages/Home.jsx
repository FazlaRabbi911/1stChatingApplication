import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';

const Home = () => {
  let navigate = useNavigate()
  let data = useSelector((state)=>state?.storeuser?.value)

  useEffect(()=>{
    if(!data?.email){
      navigate("/login")
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