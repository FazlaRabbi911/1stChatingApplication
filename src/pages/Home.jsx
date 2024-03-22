import React from 'react'
import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const Home = () => {
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