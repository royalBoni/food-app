import React from 'react'
import './adminLogin.css'
import { FaHome,FaSpinner } from 'react-icons/fa'
import { useState,useEffect } from 'react'
import { useLoginAdministratorMutation } from '../../features/administrator/administratorSlice'
import { useDispatch } from 'react-redux'
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice'
import PromptMessage from '../../Components.js/PromptMessage'
import { useNavigate,Link } from 'react-router-dom'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')

    const onChangeEmail = (e) => setEmail(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)

    const [loginAdministrator,{data,isLoading,isSuccess,isError,error}]=useLoginAdministratorMutation()

      if(isSuccess){
        /* navigate(`/admin/${data.data}`) */
        /* localStorage.setItem("myAdminData", JSON.stringify({id:data.data})); */ 
        localStorage.setItem("myAdminData", JSON.stringify(data.data));
        navigate(`/admin/dashboard`)
      }
  
      
      useEffect(()=>{
        if(isError){
          dispatch(setPromptMessage(error?.data?.data))
          dispatch(setIsPromptMessage(true)) 
          setTimeout(() => {
            dispatch(setIsPromptMessage(false))
          },[8000]);
        }
      })
    const canLogin = [ email, password].every(Boolean) && !isLoading;

    const onLoginClicked = async() => {
       if (canLogin) {
            const isOnline=window.navigator.onLine
            if(isOnline){
                try {
                    await loginAdministrator({ email, password }).unwrap()
                } catch (err) {
                    console.error(err.error)
                    dispatch(setPromptMessage(err.error))
                    dispatch(setIsPromptMessage(true)) 
                    setTimeout(() => {
                      dispatch(setIsPromptMessage(false))
                    },[8000]);
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
            dispatch(setPromptMessage('Please enter both your email and password'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
              dispatch(setIsPromptMessage(false))
            },[8000]);
        }

    }
   
    return (
    <div className='admin-login'>
        <header>
          <div className="brand"><span>Royal</span>Food</div>
          <FaHome/>
        </header>
        <PromptMessage/>
        <div className="admin-login-divisions">
            <div className="box">
                <h2>Welcome Back</h2>
                <div className='as-paragraph'>Please enter your details</div>

                <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <div className="admin-login-form-row">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={onChangeEmail} />
                    </div>

                    <div className="admin-login-form-row">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password"
                        value={password}
                        onChange={onChangePassword}/>
                    </div>
                    

                    <div className="admin-login-form-row">
                        <button onClick={onLoginClicked}>{isLoading?<FaSpinner className='loading-animation'/>:'Log in'}</button>
                    </div>
                </form>
            </div>
            <Link to='/login' className='login-as-admin'>LOG IN as a customer</Link>
        </div>
    </div>
  )
}

export default AdminLogin