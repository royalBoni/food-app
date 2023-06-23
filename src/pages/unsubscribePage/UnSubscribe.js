import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import './unsubscribe.css'
import { useDispatch } from 'react-redux'
import { setIsPromptMessage,setPromptMessage } from '../../features/actions/actionStateSlice'
import { FaSpinner } from 'react-icons/fa'

const UnSubscribe =() => {
    const {subscriber_id}=useParams()
    const dispatch = useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    
    const handleConfirmUnsubscription = async()=>{
      if(window.navigator.onLine){
        setIsLoading(true)
        try{
          const result =await fetch(`http://localhost:5000/newsletter/${subscriber_id}`,{
            method:"DELETE"
          })
          const resultJson = await result.json(result)
          if(result.ok){
            dispatch(setPromptMessage(`${resultJson.data}`))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
          }
         
        }
        catch(err){
          if(err.message==='Failed to fetch'){
            dispatch(setIsPromptMessage(true))
            dispatch(setPromptMessage(`network or server might be down`))
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
          }
          else{
            dispatch(setIsPromptMessage(true))
            dispatch(setPromptMessage(`Error: ${err.message}`))
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
          }
        }
        finally{
          setIsLoading(false)
        }
        
      }
      else{
        dispatch(setIsPromptMessage(true))
        dispatch(setPromptMessage("check your internet connection"))
        setTimeout(() => {
            dispatch(setIsPromptMessage(false))
        }, 8000);
      }
    }
  return (
    <div className='unsubscribe'>
      <p>Confirm your unsubscripton by clicking on the confirm button</p>
      <button onClick={handleConfirmUnsubscription}>{isLoading?<FaSpinner className='loading-animation'/>:'Confirm'}</button>
    </div>
  )
}

export default UnSubscribe