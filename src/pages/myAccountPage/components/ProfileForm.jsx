import React from 'react'
import { useState,useEffect } from 'react'
import { gender,countryCode } from '../../../assets/info/countryAndCode'
import { setIsPromptMessage,setPromptMessage } from '../../../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'

const ProfileForm = ({clickOperation,myProfile}) => {

    const dispatch =useDispatch()

    const myId= JSON.parse(localStorage.getItem('myUserId'))

    const [firstName, setFirstName]= useState(myProfile?myProfile.data.firstName:'')
    const [lastName, setLastName] = useState(myProfile?myProfile.data.lastName:'')
    const [phoneNumber, setPhoneNumber] = useState(myProfile?myProfile.data.phoneNumber:'')
    const [genderInput,setGenderInput]=useState(myProfile?myProfile.data.gender:'')
    const [countryInput,setCountryInput]=useState(myProfile?myProfile.data.country:'')
    const [mobileNumberPrefix, setMobileNumberPrefix]=useState()

    const OnEnterFirstName =(e)=>{setFirstName(e.target.value)}
    const OnEnterLastName =(e)=>{setLastName(e.target.value)}
    const OnEnterPhoneNumber =(e)=>{setPhoneNumber(e.target.value)}
    const OnSelectGender =(e)=>{setGenderInput(e.target.value)}
    const OnSelectCountry =(e)=>{setCountryInput(e.target.value)}

    const profileObject ={firstName, lastName, genderInput, countryInput, phoneNumber, customerId:myId.id, profileId:myProfile?.data._id}

    useEffect(()=>{
        const prefix=countryCode.find((item)=>item.country===countryInput)
        setMobileNumberPrefix(prefix?.prefix)
    },[countryInput])

    const isAllInPutFilled = [firstName, lastName, genderInput, countryInput, phoneNumber].every(Boolean)

    const handleUpdateUserProfile=async()=>{
        if (isAllInPutFilled) {
              try {
                console.log(profileObject)
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
                            <option value="">{myProfile?myProfile.data.gender:'Select your gender'}</option>
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
                            <option value="">{myProfile?myProfile.data.country:'Select your country'}</option>
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
                <button onClick={handleUpdateUserProfile}>Save</button>
            </div>
        </form>
    </div>
  )
}

export default ProfileForm