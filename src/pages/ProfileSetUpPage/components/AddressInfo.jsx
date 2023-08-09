import React from 'react'
import './addressInfo.css'
import { useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { countryCode } from '../../../assets/info/countryAndCode'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'

const AddressInfo = ({setProgressPercentage}) => {

    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const dispatch = useDispatch()
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const userAddress = JSON.parse(localStorage.getItem("userAddress"))


    const [firstName, setFirstName]= useState(userInfo?.firstName)
    const [lastName, setLastName] = useState(userInfo?.lastName)
    const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber)

    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState(userAddress?userAddress.additionalPhoneNumber:'')
    const [address, setAddress] = useState(userAddress?userAddress.address:'')
    const [additionalInfo, setAdditionalInfo] = useState(userAddress?userAddress.additionalInfo:'')
    const [region, setRegion] = useState(userAddress?userAddress.region:'')
    const [city, setCity] = useState(userAddress?userAddress.city:'')


    const OnEnterFirstName =(e)=>{setFirstName(e.target.value)}
    const OnEnterLastName =(e)=>{setLastName(e.target.value)}
    const OnEnterPhoneNumber =(e)=>{setPhoneNumber(e.target.value)}

    const OnEnterAdditionalPhoneNumber =(e)=>{setAdditionalPhoneNumber(e.target.value)}
    const OnEnterAddress =(e)=>{setAddress(e.target.value)}
    const OnEnterAdditionalInfo =(e)=>{setAdditionalInfo(e.target.value)}
    const OnEnterRegion =(e)=>{setRegion(e.target.value)}
    const OnEnterCity =(e)=>{setCity(e.target.value)}

    const prefix=countryCode.find((item)=>item.country===userInfo?.countryInput)

    const cities = (region)=>{
        const regionCities= prefix?.regions?.find((item)=>item.name===region)
        return regionCities?.city
    }

    const isAllInPutFilled =[firstName, lastName, phoneNumber, additionalPhoneNumber,address,additionalInfo,region,city].every(Boolean)

    const handleProccedToConfirmAndSave =async()=>{
        if (isAllInPutFilled) {
            try {
                const addressObject ={firstName, lastName, phoneNumber, additionalPhoneNumber,address,additionalInfo,region,city}
                localStorage.setItem("userAddress", JSON.stringify(addressObject));
                setProgressPercentage(100)
              } 
            catch (err) {
                  console.error(err)
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
        <h3><FaArrowLeft className='address-back' onClick={()=>setProgressPercentage(0)}/> Add Address Info</h3>
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
                        <input type="number" placeholder='Enter your Phone Number' value={phoneNumber} onChange={OnEnterPhoneNumber} readOnly/>
                    </div>   
                </div>

                <div className="prefix-and-num">
                    <div className="address-info-form-row-item">
                        <label htmlFor="">Prefix</label>
                        <input type="text" value={prefix?.prefix}/>
                    </div>

                    <div className="address-info-form-row-item">
                        <label htmlFor="">Additional Phone Number</label>
                        <input type="number" placeholder='Enter your Additional Phone Number' value={additionalPhoneNumber} onChange={OnEnterAdditionalPhoneNumber}/>
                    </div>   
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Enter your Address' value={address} onChange={OnEnterAddress} required/>
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Additional Information</label>
                    <input type="text" placeholder='Enter your Additional Information' value={additionalInfo} onChange={OnEnterAdditionalInfo}/>
                </div>
            </div>

            <div className="address-info-form-row">
                <div className="address-info-form-row-item">
                    <label htmlFor="">Region</label>
                    <div className="input">
                        <select id='country' onChange={OnEnterRegion}>
                            <option>{userAddress?userAddress?.region:'Please Select a Region'}</option>
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
                        <select id='city'onChange={OnEnterCity} disabled={region==='Please Select a Region'||!region?true:false}>
                            <option>{userAddress?userAddress.city:'Please Select a City'}</option>
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
                <button onClick={()=>setProgressPercentage(100)}>Skip</button>
                <button onClick={handleProccedToConfirmAndSave}>Cofirm and Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddressInfo