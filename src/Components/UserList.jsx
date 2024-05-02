import React from 'react'
import Button from '@mui/material/Button';
import Images from '../Components/Images';

const UserList = () => {
  return (
    <div className='Boxcontainer'>
       <div className="GrpTitle">
          <h2 >User List</h2>

       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">+</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">+</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">+</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">+</Button>
       </div>
       <div className="grpBox">
          <div><Images src={"../src/assets/group-profile.png"}/></div>
          <div>
            <h2>Friends Reunion</h2>
            <p>Hi Guys, Wassup!</p>
          </div>
          <Button variant="contained">+</Button>
       </div>
    </div>
  )
}

export default UserList
