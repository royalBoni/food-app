import React from 'react'
import { useDispatch } from 'react-redux'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import { FaTimes } from 'react-icons/fa'

const EditTransactionModal = () => {
    const dispatch = useDispatch()
  return (
    <div>
        EditTransactionModal
        <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
    </div>
  )
}

export default EditTransactionModal