import React, { useEffect, useState } from 'react'
import { FaCaretRight,FaSpinner} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { setPromptMessage,setIsPromptMessage } from '../../features/actions/actionStateSlice'
import { useAddNewCustomerMutation } from '../../features/customers/customersSlice'
import './register.css'


const Register = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const online=window.navigator.onLine
  
  const [addNewCustomer, {isLoading,isError,error,isSuccess}]=useAddNewCustomerMutation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onConfirmPasswordChanged = e => setConfirmPassword(e.target.value)

    if(isSuccess){
      navigate('/login')
      dispatch(setPromptMessage('Account created successfully'))
      dispatch(setIsPromptMessage(true)) 
      setTimeout(() => {
        dispatch(setIsPromptMessage(false))
      },[8000]);
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

    const testEmail= /\w+@\w+.com/.test(email);

    const errorMessage = !testEmail ? 'enter a proper email':
    !password ? 'enter a password':
    !confirmPassword ? 'confirm password':
    password!==confirmPassword ? 'the passwords doesnt match':
    null


    const canSave = [testEmail, password, confirmPassword, password===confirmPassword].every(Boolean) && !isLoading;

    const onRegisterClicked = async() => {
      dispatch(setIsPromptMessage(false)) 
       if (canSave) {
            if(online){
              try {
                await addNewCustomer({ email, password }).unwrap()
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
          dispatch(setPromptMessage(errorMessage))
          dispatch(setIsPromptMessage(true)) 
          setTimeout(() => {
            dispatch(setIsPromptMessage(false))
          },[8000]);
        }

    }

  return (
    <div className='register'>
      
        <div className="register-divisions">
            <div className="box">
                <div className='bullet'><FaCaretRight/> Digital <br/> platform  for distance <br/> <span className='span-color'>dinning.</span></div>
                <div className="box-word">
                    <h4>You will never eat all.</h4>
                    <h4>But you will eat quality</h4>
                </div>
            </div>
        </div>
        <div className="register-divisions">
            <div className="box">
                <h2>Let's Create an Account</h2>
                <div className='as-paragraph'>Please enter your details</div>

                <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <div className="register-form-row">
                        <label htmlFor="email">Email</label>
                        <input 
                        type="email" 
                        value={email}
                        onChange={onEmailChanged}
                        />
                    </div>

                    <div className="register-form-row">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        value={password}
                        onChange={onPasswordChanged}
                        />
                    </div>

                    <div className="register-form-row">
                        <label htmlFor="confirmpassword">Confirm password</label>
                        <input type="password"
                        value={confirmPassword}
                        onChange={onConfirmPasswordChanged}
                        />
                    </div>

                    <div className="register-form-row">
                        <button onClick={onRegisterClicked}>{isLoading?<FaSpinner className='loading-animation'/>:'Sign up'}</button>
                    </div>

                    <div className="register-form-row">
                        <p>Do you have an account? <Link to={'/login'} className='link'><span>Sign in</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register