import React from 'react'
import './confirmAndSave.css'
import { FaArrowLeft } from 'react-icons/fa'
import { useAddNewAddressMutation } from '../../../features/addresses/addressSlice' 
import { useAddNewProfileMutation } from '../../../features/profiles/profileSlice'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ConfirmAndSave = ({setProgressPercentage}) => {
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const [addNewAddress]=useAddNewAddressMutation()
    const [addNewProfile,{isLoading,isSuccess,isError,error}]=useAddNewProfileMutation()
    
    if(isLoading){
        console.log("loading")
    }
    else if(isSuccess){
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userAddress')
        navigate('/')
    }

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userAddress = JSON.parse(localStorage.getItem("userAddress"))

    const handleProceedToSave = async(operation) =>{
        if(window.navigator.onLine){
            try {
             /*  const addressObject ={firstName, lastName, phoneNumber, additionalPhoneNumber,address,additionalInfo,region,city}
              localStorage.setItem("userAddress", JSON.stringify(addressObject));
              console.log(addressObject) */
              if(operation==="save"){
                if(userInfo&&userAddress){
                    await addNewAddress({...userAddress,customerId:myId.id }).unwrap() 
                    await addNewProfile({...userInfo,customerId:myId.id}).unwrap()
                }
                else{
                    if(!userInfo){
                        setProgressPercentage(0)
                        dispatch(setPromptMessage('fill profile form'))
                        dispatch(setIsPromptMessage(true)) 
                        setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                        },[8000]);
                    }
                    else if(!userAddress){
                        setProgressPercentage(50)
                        dispatch(setPromptMessage('fill address form'))
                        dispatch(setIsPromptMessage(true)) 
                        setTimeout(() => {
                        dispatch(setIsPromptMessage(false))
                        },[8000]);
                    }
                    
                }
                
              }
              else{
                await addNewProfile({...userInfo,customerId:myId.id}).unwrap()
              }
              
            } catch (err) {
                console.error(err)
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
  return (
    <div className='confirm-and-save'>
        <h3><FaArrowLeft className='address-back' onClick={()=>setProgressPercentage(50)}/> Add Address Info</h3>
        <div className="confirm-and-save-container">
            <div className="confirm-and-save-container-item">
                <h3>Persoal Information</h3>
                <div className="confirm-and-save-container-item-container">
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>First Name:</div>
                        {userInfo?.firstName}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Last Name:</div>
                        {userInfo?.lastName}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Gender:</div>
                        {userInfo?.genderInput}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Country:</div>
                        {userInfo?.countryInput}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Phone Number:</div>
                        {userInfo?.phoneNumber}
                    </div>
                    
                </div>
            </div>

            <div className="confirm-and-save-container-item">
                <h3>Delivery Address</h3>
                <div className="confirm-and-save-container-item-container">
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>First Name:</div>
                        {userAddress?.firstName}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Last Name:</div>
                        {userAddress?.lastName}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Phone Number:</div>
                        {userAddress?.phoneNumber}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Additional Phone Number:</div>
                        {userAddress?.additionalPhoneNumber}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Address:</div>
                        {userAddress?.address}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Additional Info:</div>
                        {userAddress?.additionalInfo}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>Region:</div>
                        {userAddress?.region}
                    </div>
                    <div className="confirm-and-save-container-item-row">
                        <div className='label'>City:</div>
                        {userAddress?.city}
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="address-info-form-row">
            <button onClick={()=>handleProceedToSave('skip')}>Skip</button>
            <button onClick={()=>handleProceedToSave('save')}>Save and Proceed</button>
        </div>
        
    </div>
  )
}

export default ConfirmAndSave