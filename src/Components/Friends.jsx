import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';


const Friends = () => {
  const db = getDatabase();
  let [FriendsData,setFriendsdata] = useState([])
  let activeData =useSelector((state)=>state.storeuser)

  useEffect(()=>{
    const friendData = ref(db, 'friend');
    onValue(friendData, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(activeData.value.uid == item.val().whoreciveRequest  || activeData.value.uid == item.val().whoSendRequest){
          arry.push(item.val())
        }
      });
      setFriendsdata(arry)
    })
  },[])

  return (
    <div className='Boxcontainer' >
       <div className="GrpTitle">
          <h2>Friends</h2>
       </div>
       {
        FriendsData.map((item)=>
          <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            {
              item.whoreciveRequest == activeData.value.uid 
              ?
              <h2>{item.whosendRequestName}</h2>
              :
              <h2>{item.whoreciveRequestName}</h2>
            }
            <p>Dinner?</p>
          </div>
          </div>    
        )
       }
    </div>
  )
}

export default Friends
