import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue, push ,set } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  let currentUser = useSelector(state=>state.storeuser.value)
  const userRef = ref(db, "users");
  let [userList,setuserList] =useState([ ])
  let [userFriendList,setuserFriendList] =useState([])
  let [Friends,setFriends] =useState([])

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

  useEffect(()=>{
    const starCountRef = ref(db, 'FriendRequest');
    onValue(starCountRef, (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
        array.push(item.val().whoreciveRequest + item.val().whoSendRequest)
      }) 
      // item.val().whoreciveRequest jake pathaisi tar id
      // item.val().whoSendRequest je pathaise 
        // item.userUid kase sob user jokhon    userList.map((item)=>console.log(userFriendList.includes(item.userUid + currentUser.uid)) ) 
        // lekha hoy tokhon item.userUid sathe sob id milay jodi ekta id mile tale true dey 
        // item.userUid er mathome sobgula idr mothe oi particular id ke(jake request pathano hoise take dhora hoise)
      setuserFriendList(array)
    });
  },[])

  useEffect(()=>{
    const starCountRef = ref(db, 'friend');
    onValue(starCountRef, (snapshot) => {
      let array = []
      snapshot.forEach((item)=>{
        array.push(item.val().whoreciveRequest + item.val().whoSendRequest)
      })
      setFriends(array)
    });
  },[]);


  let handleFrndRequest=(item)=>{
    set(push(ref(db, 'FriendRequest/')), {
      whoreciveRequest: item.userUid,
      whoreciveRequestName:item.username,
      whoSendRequest: currentUser.uid,
      whosendRequestName: currentUser.displayName
    });
  }
  // console.log(userFriendList)
  //  userList.map((item)=>console.log(userFriendList.includes(item.userUid + currentUser.uid)) )
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
          {userFriendList.includes(item.userUid + currentUser.uid) || userFriendList.includes(currentUser.uid +item.userUid ) 
            ?
            (<Button variant="contained" disabled >pendding</Button>)
            :
            Friends.includes(item.userUid + currentUser.uid) || Friends.includes(currentUser.uid + item.userUid )
            ?
            ( <Button variant="contained" style={{backgroundColor:"lightgreen", color:"white"}} >friend</Button>) 
            :
           ( <Button variant="contained" onClick={()=>handleFrndRequest(item)}>+</Button>)
          }
        </div>
        ))}
    </div>
  )
}

export default UserList
