import React from 'react'
import { useState } from 'react'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { useUpdateCustomerPasswordMutation } from '../../../features/customers/customersSlice'
import { FaSpinner } from 'react-icons/fa'

const ChangePasswordForm = ({clickOperation}) => {

    const dispatch=useDispatch()

    const myId = JSON.parse(localStorage.getItem('myUserId'))

    const [updateCustomerPassword, {isSuccess,isLoading,data,isError,error}]=useUpdateCustomerPasswordMutation()

    if(isSuccess){
        dispatch(setPromptMessage('password successfuly changed'))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        },[8000]);
        clickOperation('')
    }
    else if(isError){
        dispatch(setPromptMessage(JSON.stringify(error.data.data)))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        },[8000]);
    }

    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()


    const OnEnterCurrentPassword =(e)=>{setCurrentPassword(e.target.value)}
    const OnEnterNewPassword =(e)=>{setNewPassword(e.target.value)}
    const OnEnterConfirmPassword =(e)=>{setConfirmPassword(e.target.value)}

    const updatePassword=async()=>{
        const isPasswordMatch = [newPassword===confirmPassword].every(Boolean)
        if(isPasswordMatch){
            if(window.navigator.onLine){
                try{
                    await updateCustomerPassword({currentPassword,newPassword,customerId:myId.id})
                }
                catch(err){
                    console.log(err)
                }
            }
            else{
                dispatch(setPromptMessage('there is no internet connectivity'))
                dispatch(setIsPromptMessage(true)) 
                setTimeout(() => {
                  dispatch(setIsPromptMessage(false))
                },[8000]);
              }
        }
        else{
            dispatch(setPromptMessage('New Password doesnt Match'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            },[8000]);
        }
        
    }

  return (
    <form action="" onSubmit={(e)=>e.preventDefault()}>
        <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Current Password</label>
                    <input type="password" placeholder='Enter your Current Password'  value={currentPassword} onChange={OnEnterCurrentPassword}  required />
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">New Password</label>
                    <input type="password" placeholder='Enter your New Password'  value={newPassword} onChange={OnEnterNewPassword} required/>
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" placeholder='Confirm your New Password'  value={confirmPassword} onChange={OnEnterConfirmPassword} required/>
                </div>
            </div>

            <div className="address-info-form-row">
                <button onClick={updatePassword}>{isLoading?<FaSpinner className='loading-animation'/>:'Save'}</button>
            </div>

    </form>
  )
}

export default ChangePasswordForm