import React from 'react'
import { countryCode } from '../../../assets/info/countryAndCode'
import { FaArrowLeft } from 'react-icons/fa'
import { useState } from 'react'

const AddressForm = ({myProfile,customerAddress,setAddressOperation,addressOperation}) => {
    console.log(customerAddress)
    console.log(myProfile)

    const [firstName, setFirstName]= useState(myProfile?.data.firstName)
    const [lastName, setLastName] = useState(myProfile?.data.lastName)
    const [phoneNumber, setPhoneNumber] = useState(myProfile?.data.phoneNumber)

    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState(customerAddress?customerAddress.additionalPhoneNumber:'')
    const [address, setAddress] = useState(customerAddress?customerAddress.address:'')
    const [additionalInfo, setAdditionalInfo] = useState(customerAddress?customerAddress.additionalInfo:'')
    const [region, setRegion] = useState(customerAddress?customerAddress.region:'')
    const [city, setCity] = useState(customerAddress?customerAddress.city:'')


    const OnEnterFirstName =(e)=>{setFirstName(e.target.value)}
    const OnEnterLastName =(e)=>{setLastName(e.target.value)}
    const OnEnterPhoneNumber =(e)=>{setPhoneNumber(e.target.value)}

    const OnEnterAdditionalPhoneNumber =(e)=>{setAdditionalPhoneNumber(e.target.value)}
    const OnEnterAddress =(e)=>{setAddress(e.target.value)}
    const OnEnterAdditionalInfo =(e)=>{setAdditionalInfo(e.target.value)}
    const OnEnterRegion =(e)=>{setRegion(e.target.value)}
    const OnEnterCity =(e)=>{setCity(e.target.value)}

    const prefix=countryCode.find((item)=>item.country===myProfile?.data.country)
    
    const cities = (region)=>{
        const regionCities= prefix?.regions?.find((item)=>item.name===region)
        return regionCities?.city
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
                            <option>{ customerAddress?customerAddress.region: 'Please Select a Region'}</option>
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
                            <option>{ customerAddress?customerAddress.city: 'Please Select a City'}</option>
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

            {/* <div className="address-info-form-row">
                <button onClick={()=>setProgressPercentage(100)}>Skip</button>
                <button onClick={handleProccedToConfirmAndSave}>Cofirm and Save</button>
            </div> */}
        </form>
    </div>
  )
}

export default AddressForm