import React, { useState } from 'react'
import Images from '../Components/Images'
import { FaHome } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
// modal 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// modal 
// firebase
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { activeuser } from '../userslice';

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
  let dispatch = useDispatch()
  let location =useLocation()
  const auth = getAuth();
  let navigation = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handlelogout=()=>{
    signOut(auth).then(() => {
      localStorage.removeItem("userAppdata")
      dispatch(activeuser(null))
      navigation("/login")
      console.log("yess")
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
            <div> <Link className={location.pathname =="/home/feed" && "active" } to='/home/feed'><FaHome className='icon'/></Link> </div>
            <div ><Link className={location.pathname =="/home/massage" && "active" }  to='/home/massage'><AiOutlineMessage className='icon ' /></Link> </div>
            <div><Link  className={location.pathname =="/home/notification" && "active" }  to='/home/notification'><FaBell className='icon'/></Link></div>
            <div><Link  className={location.pathname =="/home/setting" && "active" }  to='/home/setting'><IoSettingsOutline className='icon'/></Link></div>
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