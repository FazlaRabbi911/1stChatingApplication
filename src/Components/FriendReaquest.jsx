import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue } from "firebase/database";
import {  useSelector } from 'react-redux';


const FriendReaquest = () => {
  const db = getDatabase();

  let [rqdata,setrqdata]=useState([])

  let activeData = useSelector(state=>state.storeuser)
  const starCountRef = ref(db, 'FriendRequest');
  useEffect(()=>{
    onValue(starCountRef, (snapshot) => {
      let arry =[]
      snapshot.forEach((item)=>{
        if(activeData.value.uid == item.val().whoreciveRequest ){
          arry.push(item.val())
        }
      })
      setrqdata(arry)
    });
  },[])

  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2>Friend Request</h2>
       </div>
       {rqdata.map((item)=>(
        <div className="grpBox">
            <div><Images src={"../src/assets/group-profile.png"}/></div>
            <div>
              <h2>{item.whosendRequestName}</h2>
              <p>Wassup!</p>
            </div>
            <Button variant="contained">Accept</Button>
        </div>
       ))}
    </div>
  )
}

export default FriendReaquest
