import React from 'react'
import './myAccountProfile.css'
import { FaArrowLeft,FaStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const MyAccountProfile = ({toggleActiveNav,myProfile}) => {
  console.log(myProfile)

  const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);
  return (
    <div className='my-profile'>
      <div className='my-profile-title'>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}
        My Account Profile
      </div>
        
      <div className="my-profile-content">
        <div className="my-profile-content-top">
          <div className="my-profile-content-top-division">
            <FaStar/>
          </div>
          <div className="my-profile-content-top-division">
            {`Hello ${myProfile?.data.firstName} ${myProfile?.data.lastName}`}
          </div>
        </div>
        <div className="my-profile-content-down">
          <div className="my-profile-content-divisions">
            <div className="my-profile-content-divisions-title">first</div>
            .<div className="my-profile-content-divisions-content">{/* {JSON.stringify(myProfile)} */}</div>
          </div>
          <div className="my-profile-content-divisions">
            <div className="my-profile-content-divisions-title">first</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccountProfile 