import React, { useEffect } from 'react'
import './loginLoading.css'
import { useGetProfileByUserIdMutation } from '../../../features/profiles/profileSlice'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'

const LoginLoading = () => {
    const navigate = useNavigate()
    const [getProfileByUserId, {error}] =  useGetProfileByUserIdMutation()

    setTimeout(() => {
        if((error?.data.data)?.includes('no customer matches')){
            navigate('/profile-setup')
        }
        else{
            navigate('/')
        }
       
    }, 5000);
    

    const myId= JSON.parse(localStorage.getItem("myUserId"));

    const fetchCustomerProfile = async()=>{
        await getProfileByUserId({customerId:myId.id }).unwrap() 
    }

    useEffect(()=>{
        fetchCustomerProfile()
    },[])

    
  return (
    <div className='login-loading'>
        <FaSpinner className='loading-animation'/>
    </div>
  )
}

export default LoginLoading