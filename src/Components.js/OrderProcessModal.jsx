import React from 'react'
import { howToUseInfo } from '../assets/info/infoData'
import { useSelector,useDispatch } from 'react-redux'
import { setProcessModal } from '../features/actions/actionStateSlice'
import { FaTimesCircle } from 'react-icons/fa'
import { useState } from 'react'
import './orderProcessModal.css'

const OrderProcessModal = ({modalTitle}) => {
  const dispatch =useDispatch()
  const [animateModalItem,setAnimateModalItem] = useState(false)
  const processModalValue = useSelector((state)=>state.promptMessage.processModal)
  
  const handleCloseModal = () =>{
    dispatch(setProcessModal(null))
    setAnimateModalItem(false)
  }

  const modalMessage = processModalValue===1?howToUseInfo.order:
  processModalValue===2?howToUseInfo.pick:
  processModalValue===3?howToUseInfo.enjoy:
  null;

  if(processModalValue){
    setTimeout(() => {
      setAnimateModalItem(true)
    },50);
  }
  
  return (
    <div className={processModalValue?'modal':'no-modal'}>
      

      <div className={animateModalItem?'modal-item':'no-modal-item'}>
        <div onClick={handleCloseModal} className='mobile-back'><FaTimesCircle/></div>
        <h3>{modalTitle}</h3>
        <p>
        {
          modalMessage
        }
        </p>
        
      </div>
    </div>
  )
}

export default OrderProcessModal