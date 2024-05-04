import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  let currentUser = useSelector(state=>state.storeuser.value)
  console.log(currentUser.uid)
  const userRef = ref(db, "users");
  let [userList,setuserList] =useState([''])
  useEffect(()=>{
    onValue(userRef, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(currentUser.uid !== item.key ){
          arry.push({
            username:item.val().username,
            email:item.val().email
          });
          console.log(item.key)
        }
      });
      setuserList(arry)
    });
  },[])

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
          <Button variant="contained">+</Button>
        </div>
        ))}


    </div>
  )
}

export default UserList
