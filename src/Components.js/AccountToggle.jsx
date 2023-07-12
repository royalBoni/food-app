import React from 'react'
import { FaUser,FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useState } from 'react';
import { setIsAccountNav } from '../features/actions/actionStateSlice';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./accountToggle.css"

const AccountToggle = () => {
    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isAccountNav=useSelector((state)=>state.promptMessage.isAccountNav)

    const toggle = () =>{
        if(userId){
            dispatch(setIsAccountNav(!isAccountNav))
        }
        else{
            navigate('/login')
        }
        
    }
  return (
    <div className="account-toggle" onClick={toggle}>
        <FaUser/>
        {
            userId?"Username":"Login"
        }
        {
            userId?
            !isAccountNav?<FaAngleDown/>:<FaAngleUp/>:
            null     
        }
    </div>
  )
}

export default AccountToggle