import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
import { getDatabase, ref, onValue, remove,push ,set} from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { msgActive } from '../massageActiveslice';


const Friends = () => {
  const db = getDatabase();
  let [FriendsData,setFriendsdata] = useState([])
  let activeData = useSelector((state)=>state.storeuser)
  let dispatch = useDispatch()
  useEffect(()=>{
    const friendData = ref(db, 'friend');
    onValue(friendData, (snapshot) => {
      let arry = []
      snapshot.forEach((item)=>{
        if(activeData.value.uid == item.val().whoreciveRequest  || activeData.value.uid == item.val().whoSendRequest){
          arry.push({...item.val(), Fid:item.key})
        }
      });
      setFriendsdata(arry)
    })
  },[])

  let handleblock = (item)=>{
    if(activeData.value.uid == item.whoSendRequest){
      set(push(ref(db, 'block')),{
        block_By_Name: activeData.value.displayName,
        block_By_Id: activeData.value.uid,
        blocked_id_Name: item.whoreciveRequestName,
        blocked_Id: item.whoreciveRequest,
      }).then(()=>{
        remove(ref(db,"friend/" + item.Fid))
      });
    }else{
      set(push(ref(db, 'block')),{
        block_By_Name: activeData.value.displayName,
        block_By_Id: activeData.value.uid,
        blocked_id_Name: item.whosendRequestName,
        blocked_Id: item.whoSendRequest,
      }).then(()=>{
        remove(ref(db,"friend/" + item.Fid))
      });
    }
  }
  let handleActiveMsg = (item)=>{
    if(activeData.value.uid === item.whoSendRequest){
      localStorage.setItem("ActiveuserForTextBox",JSON.stringify(
        {activeChatId:item.whoreciveRequest,
          name:item.whoreciveRequestName
        }))
      dispatch(msgActive({activeChatId:item.whoreciveRequest,
        name:item.whoreciveRequestName
      }))
    }else{
      localStorage.setItem("ActiveuserForTextBox",JSON.stringify(
        {activeChatId:item.whoSendRequest,
          name:item.whosendRequestName
        }))
      dispatch(msgActive({activeChatId:item.whoSendRequest,
        name:item.whosendRequestName
      }))
    }
  }
  return (
    <div className='Boxcontainer' >
       <div className="GrpTitle">
          <h2>Friends</h2>
       </div>
       { FriendsData.map((item)=>
          <div className="grpBox " onClick={()=>handleActiveMsg(item)}>
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            {
              item.whoreciveRequest == activeData.value.uid 
              ?
              <h2 >{item.whosendRequestName}</h2>
              :
              <h2>{item.whoreciveRequestName}</h2>
            }
            <p>Dinner?</p>
          </div>
          <Button variant="outlined" color="error" onClick={()=>handleblock(item)}>Block</Button>
          </div>    
        )
       }
    </div>
  )
}

export default Friends
