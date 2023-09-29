import React from 'react'
import {Link} from 'react-router-dom'
import '../AppBar/AppBar.css'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../Services/AuthServices'
import useAuth from '../../util/AuthUser'
import Button from '../Button/Button'

const AppBar = () => {
  // return (
  //   <div className='appbar'>
  //    <div className="appbar__inner">
  //     <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />
  //      <div className="appbar__menus">
  //       <h3 className='active'>Dashboard</h3>
  //        <h3 >Logout</h3>
  //      </div> 
  //     </div>
  //   </div>
  // )


  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  return (
    <div className="appbar">
      <div className="appbar__inner">
        <img src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} alt="" />

        <div className="appbar__menus">
          <h3 className="active">Dashboard</h3>
          {/* >Logout</h3> */}
          {isLoggedIn ? (
            <h3  onClick={() => logout(navigate)} >Logout</h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );



}

export default AppBar
