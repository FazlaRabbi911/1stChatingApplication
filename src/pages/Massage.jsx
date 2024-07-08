import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Friends from '../Components/Friends';
import MassageList from '../Components/MassageList';
import TextBox from '../Components/TextBox';

const Massage = () => {
  return (
<Grid container spacing={2}>
  <Grid item xs={4}>
    <div >
      <Friends/>
      <MassageList/>
    </div>
  </Grid>
  <Grid item xs={6}>
    <TextBox/>
  </Grid>
</Grid>
  )
}

export default Massage