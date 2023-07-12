import React from 'react'
import './myRoyalFood.css'
import { useState } from 'react';
import { FaEnvelopeOpenText, FaPen } from 'react-icons/fa';
/* import { selectAllAdresss } from '../../../features/addresses/addressSlice';
import { useSelector } from 'react-redux'
 */
const MyRoyalFood = ({toggleActiveNav, myProfile, customerAddress,}) => {
    console.log(customerAddress)
    console.log(myProfile?.data)

    const myId= JSON.parse(localStorage.getItem("myUserId"));
    const userId =myId?.id 
    const [isNewsletterSubscribed, setIsNewsletterSubscribed]=useState('')
    console.log(isNewsletterSubscribed)

    const checkNewletterSubscription =async()=>{
        try{
            const result =await fetch(`http://localhost:5000/newsletter/${userId}`)
            const resultJson = await result.json(result)
            if(result.ok){
             setIsNewsletterSubscribed(resultJson.data)
            }
            else{
                setIsNewsletterSubscribed(resultJson.data)
            }
           
          }
          catch(err){
            if(err.message==='Failed to fetch'){
             console.log(`network or server might be down`)
            }
            else{
             console.log((`Error: ${err.message}`))
            }
          }
    }

    checkNewletterSubscription()
  return (
    <div className='my-royal-food'>
        <div className='my-royal-food-title'>Account Overview</div>
        <div className="my-royal-container">
            <div className="my-royal-container-item">
                <div className="my-royal-container-item-title">ACCOUNT DETAILS </div>
                <div className="my-royal-container-item-content">
                    <h3>Your account info.</h3>
                    
                    {
                        myProfile?.data?
                        <div className="my-royal-container-item-content-address">
                            <p>{`${myProfile?.data.firstName} ${myProfile?.data.lastName}`}</p>
                            <p>{myProfile?.data.phoneNumber}</p>
                            <p>{myProfile?.data.gender}</p>
                            <p>{myProfile?.data.country}</p>
                        </div>
                        :
                        <p>
                            There is no account details . <span onClick={()=>toggleActiveNav(7)}>Click to Add an Account details</span>
                        </p>
                    }
                </div>
            </div>

            <div className="my-royal-container-item">
                <div className="my-royal-container-item-title">ADDRESS BOOK {customerAddress.length>0?<FaPen className='title-icon'/>:null}</div>
                <div className="my-royal-container-item-content">
                    <h3>Your default delivery address</h3>
                   
                        {
                            customerAddress.length>0?
                            customerAddress?.slice(0,1).map((address)=>{
                                return(
                                    <div className="my-royal-container-item-content-address">
                                        <p>{`${address.firstName} ${address.lastName}`}</p>
                                        <p>{address.address}</p>
                                        <p>{`${address.city}, ${address.region}`}</p>
                                        <p>{`${address.phoneNumber}, ${address.additionalPhoneNumber}`}</p>
                                    </div>
                                )
                            }):
                            <p>
                                There is no delivery address . <span onClick={()=>toggleActiveNav(6)}>Click to Add an Address</span>
                            </p>
                        }
                </div>
            </div>

            <div className="my-royal-container-item">
                <div className="my-royal-container-item-title">ROYAL FOOD CREDIT</div>
                <div className="my-royal-container-item-content">GHC 00.00</div>
            </div>

            <div className="my-royal-container-item">
                <div className="my-royal-container-item-title">NEWSLETTER PREFERENCE</div>
                {
                    isNewsletterSubscribed==="not subscribed"?
                    <div className="my-royal-container-item-content">
                        You are not subscribed to any of our newsletter
                        <span>SUBSCRIBE TO NEWSLETTER</span>
                    </div>:
                    <div className="my-royal-container-item-content">
                        Your subscribed to our newsletters.
                        <button onClick={()=>toggleActiveNav(9)}><FaEnvelopeOpenText/>Newsletters</button>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default MyRoyalFood