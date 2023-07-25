import React from 'react'
import './myAccountProfile.css'
import { FaArrowLeft,FaUser,FaStar, FaLock, FaPen } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import ProfileForm from './ProfileForm'
import ChangePasswordForm from './ChangePasswordForm'

const MyAccountProfile = ({toggleActiveNav,customerProfile}) => {
  const [operation,setOperation]=useState('')

  const clickOperation=(operationId)=>{
    console.log(operationId)
    setOperation(operationId)
  }

  const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-profile'>
      
      <div className='my-profile-title'>
        {
        
          operation==='edit profile'?
          <>
           <FaArrowLeft onClick={()=>clickOperation('')}/> 
            Edit Profile
          </>:
           operation==='change password'?
          <>
            <FaArrowLeft onClick={()=>clickOperation('')}/> 
             Change Password
          </>:

          <>
              {
                pageWidth<1000?
                <FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null
              }
              My Account Profile
          </>

        }
      </div>

      {
        operation==='edit profile'?
        <div className="profile-form">
          <ProfileForm
          clickOperation={clickOperation}
          customerProfile={customerProfile}
          />
        </div>:

        operation==='change password'?
        <div className="profile-form">
          <ChangePasswordForm
          clickOperation={clickOperation}
          />
        </div>
        :
        <>
      
          <div className="my-profile-content">
            <div className="my-profile-content-top">
              <div className="my-profile-content-top-division">
                <FaStar className='user-profile-icon'/>
              </div>
              <div className="my-profile-content-top-division">
                {`Hello ${customerProfile?.firstName} ${customerProfile?.lastName}`}
              </div>
            </div>

            <div className="my-profile-content-down">
              <div className="my-profile-content-divisions">
                <div className="my-profile-content-divisions-title"><FaUser className='division-title-icon'/> Profile Details</div>
                <div className="my-profile-content-divisions-content">
                  <p>{`${customerProfile?.firstName} ${customerProfile?.lastName}`}</p>
                  <p>{customerProfile?.gender}</p>
                  <p>{customerProfile?.country}</p>
                  <p>{customerProfile?.phoneNumber}</p>
                  <p onClick={()=>clickOperation('edit profile')}>Edit Profile <FaPen className='division-title-icon'/></p>
                </div>
              </div>
              <div className="my-profile-content-divisions">
                <div className="my-profile-content-divisions-title"><FaLock className='division-title-icon'/> Security Settings</div>
                <div className="my-profile-content-divisions-content">
                  <button onClick={()=>clickOperation('change password')}>Change Password</button>
                  <button onClick={()=>clickOperation('delete account')}>Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      
    </div>
  )
}

export default MyAccountProfile 