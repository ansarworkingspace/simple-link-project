import React from 'react'
import {Link} from 'react-router-dom'
import '../AppBar/AppBar.css'

const AppBar = () => {
  return (
    <div className='appbar'>
     <div className="appbar__inner">
      <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
       <div className="appbar__menus">
        <h3 className='active'>Dashboard</h3>
         <h3 >Logout</h3>
       </div> 
      </div>
    </div>
  )
}

export default AppBar
