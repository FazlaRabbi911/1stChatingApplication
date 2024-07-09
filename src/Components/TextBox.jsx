import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const TextBox = () => {
  const db = getDatabase();
  let whonReciveMsg =useSelector(state=>state.msgactive.value)
  let activeData = useSelector((state)=>state.storeuser.value)
  let [inputValue, setInputValue] = useState();

  let [storeText,setstoreText] =useState('')
  let [ShowMsg,setShowMsg]=useState([])
  let handlemsgText=(e)=>{
    setstoreText(e.target.value)
  }
  let handleClick = ()=>{
    set(push(ref(db, 'TextMsg/')), {
      whoSendingMsgName:activeData.displayName,
      whoSendingMsg_UID:activeData.uid,
      whoWillReceiveName: whonReciveMsg.name,
      whoWillReceive_UID: whonReciveMsg.activeChatId,
      Massage:storeText
    })
  }

  useEffect(()=>{
    const starCountRef = ref(db, 'TextMsg');
    
    onValue(starCountRef, (snapshot) => {
      let arry =[];
      snapshot.forEach((item)=>{
        if((item.val().whoSendingMsg_UID == activeData.uid && item.val().whoWillReceive_UID == whonReciveMsg.activeChatId)
          || (item.val().whoWillReceive_UID == activeData.uid && item.val().whoSendingMsg_UID == whonReciveMsg.activeChatId)){
            arry.push(item.val())
        }
      })
      setShowMsg(arry)
    });
  },[whonReciveMsg.activeChatId])
  console.log(ShowMsg.map((item)=>item))
  return (
    <div className='TextBox'>
        <h2>{whonReciveMsg?.name}</h2>
      <div  className='TextBoxInside'>
        {ShowMsg.map((item)=>
                  item.whoSendingMsg_UID == activeData.uid && item.whoWillReceive_UID == whonReciveMsg.activeChatId
                  ?
                  (<p className='rightmsg'><span>{item.Massage}</span></p>)
                  :
                  item.whoWillReceive_UID == activeData.uid && item.whoSendingMsg_UID == whonReciveMsg.activeChatId &&
                 ( <p className='leftmsg'><span>{item.Massage}</span></p>)
        )}
        <div className='writingbox'>
          <input onChange={(e)=>handlemsgText(e)} type="text" />
          <button className='sendbtn' onClick={()=>handleClick()}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default TextBox
