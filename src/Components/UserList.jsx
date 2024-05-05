import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue, push ,set } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  let currentUser = useSelector(state=>state.storeuser.value)
  const userRef = ref(db, "users");
  let [userList,setuserList] =useState([''])
  useEffect(()=>{
    // all user data ana hoise
    onValue(userRef, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(currentUser.uid !== item.key ){
          arry.push({
            userUid:item.key,
            username:item.val().username,
            email:item.val().email
          });
        }
      });
      setuserList(arry)
    });
  },[])
  let handleFrndRequest=(item)=>{
    set(push(ref(db, 'FriendRequest/')), {
      whoreciveRequest: item.userUid,
      whoreciveRequestName:item.username,
      whoSendRequest: currentUser.uid,
      whosendRequestName: currentUser.displayName
    });
    // console.log(item.userUid,item.username,currentUser.uid,currentUser.displayName)
  }
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2>User List</h2>
          
       </div>
       {userList.map(item =>(
          <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>{item.username}</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained" onClick={()=>handleFrndRequest(item)}>+</Button>
        </div>
        ))}


    </div>
  )
}

export default UserList
