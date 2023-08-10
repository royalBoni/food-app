import React from 'react'
import { useState } from 'react'
import { setIsOverPage } from '../../../features/actions/actionStateSlice'
import { FaTimes,FaSpinner } from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { selectTransactionById } from '../../../features/transactionSlice.js/adminTransactionSlice'
import { useUpdateTransactionMutation } from '../../../features/transactionSlice.js/transaction'
import { setIsPromptMessage, setPromptMessage } from '../../../features/actions/actionStateSlice'
import './editTransactionModal.css'

const EditTransactionModal = () => {
    const dispatch = useDispatch()
    const myId= JSON.parse(localStorage.getItem("myAdminData")); //USER ID IS RETRIEVED FROM LOCAL STORAGE


    const [updateTransaction, {isLoading,isSuccess}]=useUpdateTransactionMutation()

    if(isSuccess){
        dispatch(setPromptMessage(`transaction updated successfully`))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
      }

    const [currentStatus,setCurrentStatus]=useState('')
    const productId=useSelector((state)=>state.promptMessage.productId);
    const transaction = useSelector((state)=>selectTransactionById(state,productId))
    
    const transactionStatus=['All','Paid','Confirmed','Dispatched','Delivered']

    const OnEnterStatus =(e)=>{setCurrentStatus(e.target.value)}

    const handleUpdateTransaction = async()=>{
        if(window.navigator.onLine){//BLOCK WILL PROCEED TO EXECUTE IF THERE IS AN INTERNET CONNECTION
            try{
                await updateTransaction({adminId:myId.id, status:currentStatus,recordId:transaction._id, date: new Date() })
            }
            catch(err){
                console.log(err)
            } 
        }
        else{//THIS BLOCK WILL EXECUTE WHEN THERE IS NO INTERNET CONNECTION
            dispatch(setPromptMessage('there is no internet connectivity'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
              dispatch(setIsPromptMessage(false))
            },[8000]);
          }
    }

  return (
    <div className='edit-transaction-modal'>
        <div className='modal-close-btn' onClick={()=>dispatch(setIsOverPage(false))}><FaTimes/></div>
        <div className="modal-title">Edit Transaction Status</div>
        <div className="edit-transaction-modal-content">
            <div className="edit-transaction-modal-content-row">
                <div className="label">Staus:</div>
                <select id='status'  onChange={OnEnterStatus} >
                    <option>{ transaction.purchaseStatus?transaction.purchaseStatus: 'Please Select a Status'}</option>
                    {
                        transactionStatus.slice(1,).map((status)=>{
                            return(
                                <option key={status} value={status}>{status}</option>
                            )
                        })
                    } 
                </select>    
            </div>

            <button onClick={handleUpdateTransaction}>{isLoading?<FaSpinner className='loading-animation'/>:'Update'}</button>
        </div>
    </div>
  )
}

export default EditTransactionModal