import React from 'react'
import { useSelector } from 'react-redux'
import './accountNav.css'
import { useNavigate } from 'react-router-dom'
import { setIsAccountNav } from '../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'

const AccountNav = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch()

    const isAccountNav=useSelector((state)=>state.promptMessage.isAccountNav)
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth)
    
    const logout = (id)=>{
        dispatch(setIsAccountNav(false))
        if(id===1){
            localStorage.removeItem("myUserId")
            navigate('/login')
        }
        else if(id===2){
            navigate('/account')
        }
    } 
  return (
    <div>
        {
            isAccountNav&&pageWidth>600?
            <div className='account-nav'>
                <ul>
                    <li onClick={()=>logout(2)}>My Account</li>
                </ul>
                <span onClick={()=>logout(1)}>Logout</span>
            </div>:
            null
        }
    </div>
    
  )
}

export default AccountNav