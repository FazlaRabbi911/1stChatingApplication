import React from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';
const MyGroups = () => {
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 >Groups List</h2>
          <Button variant="contained">Creat Group</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">Join</Button>
       </div>
    </div>
  )
}

export default MyGroups
