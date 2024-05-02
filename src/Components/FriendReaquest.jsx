import React from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';

const FriendReaquest = () => {
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2>Friend Request</h2>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Himel</h2>
            <p>Wassup!</p>
          </div>
          <Button variant="contained">Accept</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Himel</h2>
            <p>Wassup!</p>
          </div>
          <Button variant="contained">Accept</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Himel</h2>
            <p>Wassup!</p>
          </div>
          <Button variant="contained">Accept</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Himel</h2>
            <p>Wassup!</p>
          </div>
          <Button variant="contained">Accept</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Himel</h2>
            <p>Wassup!</p>
          </div>
          <Button variant="contained">Accept</Button>
       </div>
    </div>
  )
}

export default FriendReaquest
