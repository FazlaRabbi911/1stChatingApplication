import React, { useState } from 'react'
import Images from '../Components/Images'
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
// modal 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// modal 
// firebase
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// firebase
// modal css
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// modal css

const Navbar = () => {

  const auth = getAuth();
  let navigation = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handlelogout=()=>{
    signOut(auth).then(() => {
      navigation("/flogin")
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className='Navbox'>
      <div className="Navpro">
        <Images  src="../src/assets/main_profile.png" alt="Main Profile Picture"/>
      </div>
          <div className="naviconmain">
          <div >  <FaHome  className='icon'/></div>
          <div ><AiOutlineMessage  className='icon'/></div>
          <div ><FaBell className='icon'/></div>
          <div ><IoSettingsOutline  className='icon'/></div>
          <div > <TbLogout onClick={handleOpen} className='loguticon'/>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm logout
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <Button  onClick={handlelogout} variant="contained" >Logout</Button>
                  <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                </Typography>
              </Box>
            </Modal>
          </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar