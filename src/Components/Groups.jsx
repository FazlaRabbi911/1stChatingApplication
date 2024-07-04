import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import { getDatabase, ref, set,push, onValue } from "firebase/database";
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

  let [MygroupRequest,setMygroupMygroupRequest] = useState([''])
  let currentUser = useSelector(state=>state.storeuser.value)
  let [Mygroup,setMygroup] = useState([''])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [groupname,setgroupname] = useState('')


  const db = getDatabase();
  useEffect(()=>{
    const Groupdata = ref(db, "group");

    onValue(Groupdata, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(currentUser.uid !== item.val().adminUid){
          arry.push({...item.val(),grpID:item.key})
        }
      })
      setMygroup(arry)
    });

  },[])
  

  let handleCreat=()=>{
    set(push(ref(db, 'group')), {
      Groupname:groupname,
      adminName: currentUser.displayName,
      adminUid : currentUser.uid,
    });
    handleClose()
  }
  let handleJoin=(item)=>{
    console.log(item)
    set(push(ref(db, 'groupJoinRequest/')), {
      groupID: item.grpID,
      groupName:item.Groupname,
      adminUid: item.adminUid,
      whoWantTojoinUid : currentUser.uid,
      whoWantTojoinName : currentUser.displayName
    });
  }
  useEffect(()=>{
    const GroupRequestdata = ref(db, "groupJoinRequest");
    onValue(GroupRequestdata, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
          arry.push(item.val())
      })
      setMygroupMygroupRequest(arry)
    });
  },[])


  let pendingRequestForAdminGroup = MygroupRequest.some(
    (request) => request.whoWantTojoinUid === currentUser.uid
  );
  console.log(currentUser.uid )
  console.log(pendingRequestForAdminGroup)
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 >Groups List</h2>
          <Button variant="contained"  onClick={handleOpen}>Creat Group</Button>
       </div>
       { Mygroup.map((item)=>(
        
        <div className="grpBox">
        <div><Images src={"../src/assets/group-profile.png"}/></div>
        <div>
          <h2>{item.Groupname}</h2>
          <p>Admin : {item.adminName}</p>
        </div>
          
        {MygroupRequest.some(
    (request) => request.whoWantTojoinUid === currentUser.uid
  ) ? (
          <Button variant="contained">Pending (Admin)</Button>
          ) : (
          <Button variant="contained" onClick={() => handleJoin(item)}>
            Join
          </Button>
        )}

        </div>
       ))}
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
