import React from 'react'
import Grid from '@mui/material/Grid';
import Groups from '../Components/Groups';
import FriendReaquest from '../Components/FriendReaquest';
import Friends from '../Components/Friends';
import MyGroups from '../Components/MyGroups';
import UserList from '../Components/UserList';
import BlockedUser from '../Components/BlockedUser';



const Feed = () => {
  return (
  <Grid container spacing={0}>
      <Grid  xs={4} >
        <Groups />
        <FriendReaquest/>
      </Grid>
      <Grid xs={4}>
        <Friends/>
        <MyGroups/>
      </Grid>
      <Grid  xs={4}>
        <UserList/>
        <BlockedUser/>
      </Grid>
 
  </Grid>
  )
}

export default Feed