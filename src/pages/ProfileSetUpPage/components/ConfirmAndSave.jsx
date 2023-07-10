import React from 'react'
import './confirmAndSave.css'
import { FaArrowLeft } from 'react-icons/fa'

const ConfirmAndSave = ({setProgressPercentage}) => {
  return (
    <div className='confirm-and-save'>
        <h3><FaArrowLeft className='address-back' onClick={()=>setProgressPercentage(50)}/> Add Address Info</h3>
        ConfirmAndSave
    </div>
  )
}

export default ConfirmAndSave