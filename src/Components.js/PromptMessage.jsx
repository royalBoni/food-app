import React from 'react'
import './prompt.css'
import { useSelector,useDispatch } from 'react-redux'
import { setIsPromptMessage } from '../features/actions/actionStateSlice'
import { FaTimes } from 'react-icons/fa'


const PromptMessage = () => {
    const dispatch=useDispatch()
    const promptMessage=useSelector((state)=>state.promptMessage.promptMessage);
    const decision =useSelector((state)=>state.promptMessage.isPromptMessage)

    const handleCloseErrorButton=()=>{
        dispatch(setIsPromptMessage(false))
    }

  return (
    <div className={decision?'error':'no-error'}>
        <FaTimes className='close-icon' onClick={handleCloseErrorButton}/>
        <p>{promptMessage }</p>
        {/* {
          promptMessage?.includes('successfully')?
          <p>{promptMessage } <span className='cart-span'>CART</span></p> :
          promptMessage
        } */}
    </div>
  )
}

export default PromptMessage