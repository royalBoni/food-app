import React, { useState,useEffect } from 'react'
import { FaCaretRight,FaSpinner } from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { useLoginCustomerMutation } from '../../features/customers/customersSlice'
import { useDispatch } from 'react-redux'
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice'
import './login.css'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loginCustomer, {data,isError,error,isSuccess,isLoading}]=useLoginCustomerMutation()

    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    if(isSuccess){
        setEmail('')
        setPassword('')
        localStorage.setItem("myUserId", JSON.stringify({id:data.data}));
        /* navigate(`/profile-setup`)  */
        navigate(`/loading`)
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
                    await loginCustomer({ email, password }).unwrap()
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

        else{
            dispatch(setPromptMessage('Please enter both your email and password'))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
              dispatch(setIsPromptMessage(false))
            },[8000]);
        }

    }

  return (
    <div className='login'>
        <div className="login-divisions">
            <div className="box">
                <div className='bullet'><FaCaretRight/> Digital <br/> platform  for distance <br/> <span className='span-color'>dinning.</span></div>
                <div className="box-word">
                    <h4>You will never eat all.</h4>
                    <h4>But you will eat quality</h4>
                </div>
            </div>
        </div>
        <div className="login-divisions">
            <div className="box">
                <h2>Welcome Back</h2>
                <div className='as-paragraph'>Please enter your details</div>

                <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <div className="login-form-row">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={onEmailChanged} />
                    </div>

                    <div className="login-form-row">
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password"
                        value={password}
                        onChange={onPasswordChanged}/>
                    </div>
                    
                    <div className="login-form-row">
                        <div className='as-paragraph'>Forgot password?</div>
                    </div>

                    <div className="login-form-row">
                        <button onClick={onLoginClicked}>{isLoading?<FaSpinner className='loading-animation'/>:'Log in'}</button>
                    </div>

                    <div className="login-form-row">
                        <p>Don't have an account? <Link to={'/register'} className='link'><span>Sign up</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login