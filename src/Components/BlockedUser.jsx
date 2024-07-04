import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue, remove} from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => {
  const db = getDatabase();
  let [blockdata,setblockdata] = useState([''])
  let activeData = useSelector((state)=>state.storeuser.value)

  useEffect(()=>{
      const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let blockarray = []
      snapshot.forEach((item)=>{
        if(activeData.uid == item.val().block_By_Id || activeData.uid == item.val().blocked_Id){
          blockarray.push({...item.val(),blockID:item.key})          
        }
      })
      setblockdata(blockarray)
     });
  },[]);

  let handleUnblock =(blockID)=>{
    remove(ref(db, "block/" + blockID ))
  }

  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 >Block List</h2>
       </div>

       {blockdata.map((item)=>

        <div className="grpBox">
        <div><Images src={"../src/assets/group-profile.png"}/></div>
        <div>
          {item.block_By_Id == activeData.uid
          ?(
          <h2>{item.blocked_id_Name}</h2>
          )
          : (
             <h2>{item.block_By_Name}</h2>
            )
          }
          <p>Hi Guys, Wassup!</p>
        </div>
        {item.block_By_Id == activeData.uid  ?
        <Button variant="contained" color="success" onClick={()=>handleUnblock(item.blockID)} >Unblock</Button>
        :
        <Button variant="contained" color="error">Blocked</Button>
        }
        </div>
       )} 
    </div>
  )
}
export default BlockedUser
