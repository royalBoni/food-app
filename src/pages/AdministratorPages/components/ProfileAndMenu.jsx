import React from 'react'
import './profileandmenu.css'
import { useNavigate } from 'react-router-dom'

const ProfileAndMenu = () => {

  const navigate = useNavigate()
  const OnclickMenuCompItem =(id) =>{
    if(id==="logout"){
      localStorage.removeItem("myAdminData")
      navigate('/admin-login')
    }
  }
  return (
    <div className='profile-menu-comp'>
        <ul>
            <li>Profile</li>
            <li>Change password</li>
            <li onClick={()=>OnclickMenuCompItem('logout')}>Log out</li>
        </ul>
    </div>
  )
}

export default ProfileAndMenu