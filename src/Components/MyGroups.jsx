import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroups = () => {
  let [Mygroup,setMygroup] = useState([''])
  let currentUser = useSelector(state=>state.storeuser.value)

  const db = getDatabase();

  useEffect(()=>{
    const Groupdata = ref(db, "group");
    let arry = []
    onValue(Groupdata, (snapshot) => {
      snapshot.forEach((item)=>{
        if(currentUser.uid == item.val().adminUid){
          arry.push(item.val())
        }
      })
    });
    setMygroup(arry)
  },[])

  return (
    <div className='Boxcontainer'>

       <div className="GrpTitle">
          <h2 >Groups List</h2>
          <Button variant="contained" >Creat Group</Button>
       </div>

      { Mygroup.map((item)=>(
        <div className="grpBox">
        <div><Images src={"../src/assets/group-profile.png"}/></div>
        <div>
          <h2>{item.Groupname}</h2>
          <p>Hi Guys, Wassup!</p>
        </div>
        <Button variant="contained">Join</Button>
        </div>
       ))}
    </div>
  )
}

export default MyGroups
