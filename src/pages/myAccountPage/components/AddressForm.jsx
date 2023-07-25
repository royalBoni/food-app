import React from 'react'
import { countryCode } from '../../../assets/info/countryAndCode'
import { FaArrowLeft,FaSpinner } from 'react-icons/fa'
import { useState } from 'react'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { useAddNewAddressMutation,useUpdateAddressMutation } from '../../../features/addresses/addressSlice'

const AddressForm = ({customerProfile,customerAddress,setAddressOperation,addressOperation}) => {
    
    const dispatch = useDispatch()
    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const [addNewAddress,{isLoading:isLoadingAddingNewAddress, isSuccess:isSuccessAddingNewAddress}]=useAddNewAddressMutation()
    const [updateAddress,{isLoading:isLoadingUpdatingAddress, isSuccess:isSuccessUpdatingAddress}] = useUpdateAddressMutation()

    console.log(isLoadingAddingNewAddress)
    console.log(isSuccessAddingNewAddress)

    if(isSuccessAddingNewAddress){
        dispatch(setPromptMessage('Delivery Address Successfuly Added'))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        },[8000]);
        setAddressOperation(0)
    }

    else if(isSuccessUpdatingAddress){
        dispatch(setPromptMessage('Delivery Address Successfuly Updated'))
        dispatch(setIsPromptMessage(true)) 
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        },[8000]);
        setAddressOperation(0)
    }

    const [firstName, setFirstName]= useState(customerProfile?.firstName)
    const [lastName, setLastName] = useState(customerProfile?.lastName)
    const [phoneNumber, setPhoneNumber] = useState(customerProfile?.phoneNumber)

    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState(customerAddress&&addressOperation===2?customerAddress.additionalPhoneNumber:'')
    const [address, setAddress] = useState(customerAddress&&addressOperation===2?customerAddress.address:'')
    const [additionalInfo, setAdditionalInfo] = useState(customerAddress&&addressOperation===2?customerAddress.additionalInfo:'')
    const [region, setRegion] = useState(customerAddress&&addressOperation===2?customerAddress.region:'')
    const [city, setCity] = useState(customerAddress&&addressOperation===2?customerAddress.city:'')


    const OnEnterFirstName =(e)=>{setFirstName(e.target.value)}
    const OnEnterLastName =(e)=>{setLastName(e.target.value)}
    const OnEnterPhoneNumber =(e)=>{setPhoneNumber(e.target.value)}

    const OnEnterAdditionalPhoneNumber =(e)=>{setAdditionalPhoneNumber(e.target.value)}
    const OnEnterAddress =(e)=>{setAddress(e.target.value)}
    const OnEnterAdditionalInfo =(e)=>{setAdditionalInfo(e.target.value)}
    const OnEnterRegion =(e)=>{setRegion(e.target.value)}
    const OnEnterCity =(e)=>{setCity(e.target.value)}

    const prefix=countryCode.find((item)=>item.country===customerProfile?.country)
    
    const cities = (region)=>{
        const regionCities= prefix?.regions?.find((item)=>item.name===region)
        return regionCities?.city
    }

    const isAllInPutFilled =[firstName, lastName, phoneNumber, additionalPhoneNumber,address,additionalInfo,region,city].every(Boolean)

    const saveAddress =async()=>{
        const addressObject ={firstName, lastName, phoneNumber, additionalPhoneNumber,address,additionalInfo,region,city}
        if (isAllInPutFilled) {
            if(addressOperation===2){
                console.log(`we are editing this ${addressObject}`)
                try{
                    await updateAddress({...addressObject,customerId:myId.id, addressId:customerAddress._id })
                }
                catch(err){
                    console.log(err)
                }
        
            }
            else{
                try {
                    console.log(`we are adding this ${addressObject}`)  
                    await addNewAddress({...addressObject,customerId:myId.id }).unwrap() 
                } 
                catch (err) {
                    console.error(err)
                }       
            }
            

        } 

        else{
            dispatch(setPromptMessage('enter all mandatory input fields'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            },[8000]);
        }
    }
  return (
    <div className='address-info'>
        <h3>
            <FaArrowLeft className='address-back' onClick={()=>setAddressOperation(0)}/>
             {addressOperation===2?'Edit Address':'Add Address'}
        </h3>
        <form action="" onSubmit={(e)=>e.preventDefault()}>
            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">First Name</label>
                    <input type="text" placeholder='Enter your First Name' value={firstName} onChange={OnEnterFirstName} readOnly/>
                </div>

                <div className="address-info-form-row-item">
                    <label htmlFor="">Last Name</label>
                    <input type="text" placeholder='Enter your Last Name' value={lastName} onChange={OnEnterLastName} readOnly/>
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="prefix-and-num">
                    <div className="address-info-form-row-item">
                        <label htmlFor="">Prefix</label>
                        <input type="text" value={prefix?.prefix}/>
                    </div>

                    <div className="address-info-form-row-item">
                        <label htmlFor="">Phone Number</label>
                        <input type="number" placeholder='Enter your Phone Number' value={phoneNumber}  onChange={OnEnterPhoneNumber} readOnly/>
                    </div>   
                </div>

                <div className="prefix-and-num">
                    <div className="address-info-form-row-item">
                        <label htmlFor="">Prefix</label>
                        <input type="text" value={prefix?.prefix}/>
                    </div>

                    <div className="address-info-form-row-item">
                        <label htmlFor="">Additional Phone Number</label>
                        <input type="number" placeholder='Enter your Additional Phone Number'  value={additionalPhoneNumber} onChange={OnEnterAdditionalPhoneNumber} />
                    </div>   
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Enter your Address'  value={address} onChange={OnEnterAddress} required />
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Additional Information</label>
                    <input type="text" placeholder='Enter your Additional Information'  value={additionalInfo} onChange={OnEnterAdditionalInfo} />
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Region</label>
                    <div className="input">
                        <select id='country'  onChange={OnEnterRegion} >
                            <option>{ customerAddress&&addressOperation===2?customerAddress.region: 'Please Select a Region'}</option>
                            {
                                prefix?.regions.map((region)=>{
                                    return(
                                        <option key={region.name} value={region.name}>{region.name}</option>
                                    )
                                })
                            } 
                        </select>       
                    </div>
                </div>

                <div className="address-info-form-row-item">
                    <label htmlFor="">City</label>
                    <div className="input">
                        <select id='country'  onChange={OnEnterCity} disabled={region==='Please Select a Region'||!region?true:false} >
                            <option>{ customerAddress&&addressOperation===2?customerAddress.city: 'Please Select a City'}</option>
                            {
                                cities(region)?.map((item)=>{
                                    return(
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })
                            }  
                            
                        </select>
                            
                    </div>
                </div>
            </div>

            <div className="address-info-form-row">
                <button onClick={saveAddress}>{isLoadingAddingNewAddress||isLoadingUpdatingAddress?<FaSpinner className='loading-animation'/>:'Save'}</button>
            </div>
        </form>
    </div>
  )
}

export default AddressForm