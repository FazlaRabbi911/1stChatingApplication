import React, { useState,createRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { activeuser } from '../userslice';
// firebase
// croper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
// croper
// croper default img
const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
// croper default img
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
  let userinfo = useSelector((state)=>state.storeuser.value)
  let dispatch = useDispatch()
  let location = useLocation()
  const auth = getAuth();
  let navigation = useNavigate()
  // modal 1
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // modal 1
  // modal 2
  const [openmodaltwo, setOpenmodaltwo] = React.useState(false);
  const handleOpenmodaltwo = () => setOpenmodaltwo(true);
  const handleClosemodaltwo = () => setOpenmodaltwo(false);
  // modal 2
  // croper
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  // croper
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
  // croper
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  // croper
  return (
    <div className='Navbox'>
      <div className="Navpro" onClick={handleOpenmodaltwo}>
        <Images  className="Navpro_img"  src={userinfo.photoURL} alt="Main Profile Picture"/>
        <h2>{userinfo.displayName}</h2>
      </div>
          <div className="naviconmain">
            <div> <Link className={location.pathname =="/home/feed" && "active"} to='/home/feed'><FaHome className='icon'/></Link> </div>
            <div ><Link className={location.pathname =="/home/massage" && "active"}  to='/home/massage'><AiOutlineMessage className='icon ' /></Link> </div>
            <div><Link  className={location.pathname =="/home/notification" && "active"}  to='/home/notification'><FaBell className='icon'/></Link></div>
            <div><Link  className={location.pathname =="/home/setting" && "active"}  to='/home/setting'><IoSettingsOutline className='icon'/></Link></div>
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
              <Modal
                open={openmodaltwo}
                onClose={handleClosemodaltwo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <input type="file" />
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    {/* coper code  */}
                    <Cropper
                      ref={cropperRef}
                      style={{ height: 400, width: "100%" }}
                      zoomTo={0.5}
                      initialAspectRatio={1}
                      preview=".img-preview"
                      src={image}
                      viewMode={1}
                      minCropBoxHeight={10}
                      minCropBoxWidth={10}
                      background={false}
                      responsive={true}
                      autoCropArea={1}
                      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                      guides={true}
                    />
                    {/* coper code  */}
                    <h1>Preview</h1>
                    <div
                      className="img-preview"
                      style={{ width: "100%", float: "left", height: "300px" }}
                    />
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