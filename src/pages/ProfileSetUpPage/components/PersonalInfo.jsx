import React from 'react'
import { useState, useEffect } from 'react'
import { gender, countryCode } from '../../../assets/info/countryAndCode'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import './personalInfo.css'

const PersonalInfo = ({setProgressPercentage}) => {

    const dispatch = useDispatch()

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [firstName, setFirstName]= useState(userInfo?userInfo.firstName:'')
    const [lastName, setLastName] = useState(userInfo?userInfo.lastName:'')
    const [phoneNumber, setPhoneNumber] = useState(userInfo?userInfo.phoneNumber:'')
    const [genderInput,setGenderInput]=useState(userInfo?userInfo.genderInput:'')
    const [countryInput,setCountryInput]=useState(userInfo?userInfo.countryInput:'')
    const [mobileNumberPrefix, setMobileNumberPrefix]=useState()

    const OnEnterFirstName =(e)=>{setFirstName(e.target.value)}
    const OnEnterLastName =(e)=>{setLastName(e.target.value)}
    const OnEnterPhoneNumber =(e)=>{setPhoneNumber(e.target.value)}
    const OnSelectGender =(e)=>{setGenderInput(e.target.value)}
    const OnSelectCountry =(e)=>{setCountryInput(e.target.value)}

    const infoObject ={firstName, lastName, genderInput, countryInput, phoneNumber}
    

    useEffect(()=>{
        const prefix=countryCode.find((item)=>item.country===countryInput)
        setMobileNumberPrefix(prefix?.prefix)
    },[countryInput])

    const isAllInPutFilled = [firstName, lastName, genderInput, countryInput, phoneNumber].every(Boolean)

    const handleProceedToAddress=async()=>{

        if (isAllInPutFilled) {
              try {
                localStorage.setItem("userInfo", JSON.stringify(infoObject));
                setProgressPercentage(50)
              } catch (err) {
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
    <div className='personal-info'>
        <h3>Add Personal Info</h3>
        <form action="" onSubmit={(e)=>e.preventDefault()}>
            <div className="personal-info-form-row">
                <div className="personal-info-form-row-item">
                    <label htmlFor="">First Name</label>
                    <input type="text" placeholder='Enter your First Name' value={firstName} onChange={OnEnterFirstName}/>
                </div>

                <div className="personal-info-form-row-item">
                    <label htmlFor="">Last Name</label>
                    <input type="text" placeholder='Enter your Last Name' value={lastName} onChange={OnEnterLastName}/>
                </div>
            </div>

            <div className="personal-info-form-row">
                <div className="personal-info-form-row-item">
                    <label htmlFor="">Gender</label>
                    <div className="input">
                        <select id='country' value={genderInput} onChange={OnSelectGender}>
                            <option value="">{userInfo?userInfo.genderInput:'Select your gender'}</option>
                            {
                                gender.map((gender)=>{
                                    return(
                                        <option key={gender.code} value={gender.name}>{gender.name}</option>
                                    )
                                })
                            }
                        </select>       
                    </div>
                </div>

                <div className="personal-info-form-row-item">
                    <label htmlFor="">Country</label>
                    <div className="input">
                        <select id='country' value={countryInput} onChange={OnSelectCountry}>
                            <option value="">{userInfo?userInfo.countryInput:'Select your country'}</option>
                            {
                                countryCode.map((country)=>{
                                    return(
                                        <option key={country.code} value={country.country}>{country.country}</option>
                                    )
                                })
                            }
                        </select>
                            
                    </div>
                </div>
            </div>

            <div className="personal-info-form-row">
                <div className="prefix-and-num">
                    <div className="personal-info-form-row-item">
                        <label htmlFor="">Prefix</label>
                        <input type="text" value={mobileNumberPrefix}/>
                    </div>

                    <div className="personal-info-form-row-item">
                        <label htmlFor="">Phone Number</label>
                        <input type="number" placeholder='Enter your Phone Number' value={phoneNumber} onChange={OnEnterPhoneNumber}/>
                    </div>   
                </div>
            </div>

            <div className="personal-info-form-row">
                <button onClick={()=>setProgressPercentage(100)}>Skip</button>
                <button onClick={handleProceedToAddress}>Proceed to Address</button>
            </div>
        </form>
    </div>
  )
}

export default PersonalInfo