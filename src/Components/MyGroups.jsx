import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';
// modal
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
// modal
// modal 2

// list 2

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

// list
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

const MyGroups = () => {
  let [Mygroup,setMygroup] = useState([''])
  let [MygroupRequest,setMygroupMygroupRequest] = useState([''])
  let currentUser = useSelector(state=>state.storeuser.value)
  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (info) =>  {
    setOpen(true)
    const GroupRequestdata = ref(db, "groupJoinRequest");
    onValue(GroupRequestdata, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(item.val().groupID == info.mygrpKey){
          arry.push({...item.val(),grpRQId:item.key})
        }
      })
      setMygroupMygroupRequest(arry)
    });
  };

  const handleClose = () => setOpen(false);
  const db = getDatabase();
  // modal
  useEffect(()=>{
    const Groupdata = ref(db, "group");
    onValue(Groupdata, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(currentUser.uid == item.val().adminUid){
          arry.push({...item.val(),mygrpKey:item.key})
        }
      })
      setMygroup(arry)
    });
  },[])
  let handleaccept =(item)=>{
    set(push(ref(db, "GroupMembers")), {
      ...item
    }).then(()=>{
      remove(ref(db, "groupJoinRequest/" + item.grpRQId))
    })
  }
  let handleRemove=(item)=>{
    remove(ref(db, "groupJoinRequest/" + item.grpRQId))
  }
//  modal 2
  
//  modal 2

  let handlemember =()=>{

  }

  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 > My Groups  </h2>
       </div>
      { Mygroup.map((item)=>(
        <div className="grpBox">
        <div><Images src={"../src/assets/group-profile.png"}/></div>
        <div>
          <h2>{item.Groupname}</h2>
          <p>admin : {item.adminName}</p>
        </div>
        <Button variant="contained" onClick={()=>handleOpen(item)}>Request</Button>
        <Button variant="contained" onClick={()=>handlemember(item)}>
dd
        </Button>
        </div>
       ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              member request
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {/*  */}
              {MygroupRequest.map((item)=>(
                <>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.whoWantTojoinName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Wants to join thre group
                      </Typography>
                      <br />
                      <Button variant="contained" onClick={()=>handleaccept(item)}>add</Button>
                      <Button variant="contained" color="error" onClick={()=>handleRemove(item)}>remove</Button>
                    </React.Fragment>
                  }
                />
                </ListItem>
                <Divider variant="inset" component="li" />
                </>
              ))}
                {/*  */}
              </List>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default MyGroups
