import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import { getDatabase, ref, set,push } from "firebase/database";
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Groups = () => {
  let currentUser = useSelector(state=>state.storeuser.value)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [groupname,setgroupname] = useState('')
  const db = getDatabase();

  let handleCreat=()=>{
    set(push(ref(db, 'group')), {
      Groupname:groupname,
      adminName: currentUser.displayName,
      adminUid : currentUser.uid,
    });
  }
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 >Groups List</h2>
          <Button variant="contained"  onClick={handleOpen}>Creat Group</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField id="outlined-basic" label="Outlined" variant="outlined"  onChange={(e)=>setgroupname(e.target.value)}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleCreat} >Creat</Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Groups
