import React from 'react'
import './newsletter.css'
import { useState } from 'react'
import { setPromptMessage,setIsPromptMessage } from '../features/actions/actionStateSlice'
import { useDispatch } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'

const NewsLetter = () => {
  const [subscriberEmail,setSubscriberEmail]=useState('')
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const testEmail= /\w+@\w+.com/.test(subscriberEmail);

  const handleSubscription = async()=>{
    if(testEmail){
      if(window.navigator.onLine){
        try{
          setIsLoading(true)
          const result =await fetch(`http://localhost:5000/newsletter`,{
            method:"POST",
            body:JSON.stringify({"email":subscriberEmail}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          const resultJson = await result.json(result)
          if(result.ok){
            setSubscriberEmail('')
            dispatch(setPromptMessage(`${resultJson.data}`))
            dispatch(setIsPromptMessage(true)) 
            setTimeout(() => {
                dispatch(setIsPromptMessage(false))
            }, 8000);
          }
          else{
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
            console.log(err)
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
    else{
      dispatch(setPromptMessage(`email should be in the right format`))
      dispatch(setIsPromptMessage(true)) 
      setTimeout(() => {
        dispatch(setIsPromptMessage(false))
      }, 8000);
    }
  }
  return (
    <section className='news-letter'>
        <h3>Newsletter</h3>
        <div className="newsletter-division">
            <div className="newsletter-division-item">
                <p>Subscribe and get the latest news and useful tips, advice and best offer and services</p>
            </div>
            <div className="newsletter-division-item">
                <input id='newletter-email' type="email" placeholder='Enter your email' value={subscriberEmail}
                onChange={(e)=>setSubscriberEmail(e.target.value)} />
                <button onClick={handleSubscription}>{isLoading?<FaSpinner className='loading-animation'/>:'Subscribe'}</button>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter