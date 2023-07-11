import React, { useEffect, useState } from 'react'
import './indexProfileSetupPage.css'
import PersonalInfo from './components/PersonalInfo'
import AddressInfo from './components/AddressInfo'
import ConfirmAndSave from './components/ConfirmAndSave'

const IndexProfileSetupPage = () => {
  
  const [progressPercentage, setProgressPercentage]= useState(0)
  const [progressBarDataComponents, setProgressBarDataCompponents]= useState([])

  useEffect(()=>{
    if(progressPercentage===0){
      setProgressBarDataCompponents([
        {name:'Profile', status:'inturn',index:1}, 
        {name:'Address', status:'set',index:2},
        {name:'Save', status:'set',index:3}
      ])
    }
    else if(progressPercentage===50){
      setProgressBarDataCompponents([
        {name:'Profile', status:'ready',index:1}, 
        {name:'Address', status:'inturn',index:2},
        {name:'Save', status:'set',index:3}
      ])
    }
    else{
      setProgressBarDataCompponents([
        {name:'Profile', status:'ready',index:1}, 
        {name:'Address', status:'ready',index:2},
        {name:'Save', status:'inturn',index:3}
      ])
    }
    
  },[progressPercentage])

  
  console.log(progressPercentage)
  return (
    <div className='index-profile-setup-page'>
      <h2>PROFILE SETUP</h2>
      <div className="index-profile-setup-page-container">
        <div className="progress-bar">
          <div className="progress-bar-container">
            <div style={{height:1,backgroundColor: 'rgb(255, 81, 0)',width:`${progressPercentage}%`}}></div>
            {
              progressBarDataComponents.map((item)=>{
                return(
                <div key={item.index} className='progress-bar-item'>
                  <div className="circle-item"
                   style={{border:`1px solid ${item.status==='inturn'?'rgb(241, 110, 23)':'rgba(114, 48, 17, 0.219)'}`,
                   backgroundColor:`${item.status==='inturn'?'rgb(255, 239, 226)': item.status==='ready'?'rgb(255, 81, 0)':'grey'}`}}>
                    {item.index}
                  </div>
                  <div className="name-item" style={{color:`${item.status==='inturn'?'rgb(255, 81, 0)': item.status==='ready'?'rgb(54, 3, 43)':'rgba(61, 46, 40, 0.399)'}`}}>{item.name}</div>
                </div>
                )
              })
            }
          </div>
        </div>
      </div>

      <div className="profile-form-container">
        {
          progressPercentage===0?
          <PersonalInfo setProgressPercentage={setProgressPercentage}/>:
          progressPercentage===50?
          <AddressInfo setProgressPercentage={setProgressPercentage}/>:
          <ConfirmAndSave setProgressPercentage={setProgressPercentage}/>
        }
       
      </div>
    </div>
  )
}

export default IndexProfileSetupPage