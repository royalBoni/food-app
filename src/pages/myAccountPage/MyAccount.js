import React, { useEffect } from 'react'
import { useState } from 'react'
import "./myAccount.css"
import { FaEnvelope, FaShoppingBag, FaUser,FaSnowflake, FaPencilRuler, FaRegEye, FaEnvelopeOpenText, FaGlobe, FaUserCog, FaArrowLeft } from 'react-icons/fa'
import MyRoyalFood from './components/MyRoyalFood'
import { extendedApiAddressesSlice } from '../../features/addresses/addressSlice'
import { extendedApiProfileSlice, selectAllProfile } from '../../features/profiles/profileSlice'
import { useSelector } from 'react-redux'
import { store } from '../../app/store'
import { selectAllAdresss } from '../../features/addresses/addressSlice'
import MyOrders from './components/MyOrders'
import RecentlyViewed from './components/RecentlyViewed'
import MyAddress from './components/MyAddress'
import MyAccountProfile from './components/MyAccountProfile'

const MyAccount = () => {

    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

    const customerAddress= useSelector(selectAllAdresss)
    const customerProfile = useSelector(selectAllProfile)


    const [navActiveItem,setNavActiveItem] = useState(1)
    const [mobileSwitchActiveItem, setMobileSwitchActiveItem] = useState(false)

    const toggleActiveNav =(id)=>{
        setNavActiveItem(id)
        if(id!==1){
            setMobileSwitchActiveItem(true)
        }
        else{
            setMobileSwitchActiveItem(false)
        }
    }

    useEffect(()=>{
        store.dispatch(extendedApiAddressesSlice.endpoints.getAddress.initiate())
        store.dispatch(extendedApiProfileSlice.endpoints.getAllProfiles.initiate())
      },[])

  return (
    <div className='my-account'>
        {
            mobileSwitchActiveItem && pageWidth<1000?null:
            <div className="my-account-division">
                <div className={`my-account-division-title ${navActiveItem===1?"nav-active":null}`} onClick={()=>toggleActiveNav(1)}>
                    <FaUser/>My RoyalFood Account
                </div>
                <ul>
                    <li className={navActiveItem===2?"nav-active":null} onClick={()=>toggleActiveNav(2)}><FaShoppingBag/>Orders</li>
                    <li className={navActiveItem===3?"nav-active":null} onClick={()=>toggleActiveNav(3)}><FaEnvelope/> Inbox</li>
                    <li className={navActiveItem===4?"nav-active":null} onClick={()=>toggleActiveNav(4)}><FaSnowflake/>Coupons</li>
                    <li className={navActiveItem===5?"nav-active":null} onClick={()=>toggleActiveNav(5)}><FaPencilRuler/>Pending Reviews</li>
                    <li className={navActiveItem===6?"nav-active":null} onClick={()=>toggleActiveNav(6)}><FaGlobe/>My Address</li>
                    <li className={navActiveItem===7?"nav-active":null} onClick={()=>toggleActiveNav(7)}><FaUserCog/>Account Management</li>
                    <li className={navActiveItem===8?"nav-active":null} onClick={()=>toggleActiveNav(8)}><FaRegEye/>Recently Viewed</li>
                    <li className={navActiveItem===9?"nav-active":null} onClick={()=>toggleActiveNav(9)}><FaEnvelopeOpenText/>Newsletters</li>
                </ul>
                <div className='log-out'>Logout</div>
            </div>
        }
        <div className="my-account-division">
            {
                navActiveItem===1?
                pageWidth>1000?
                <MyRoyalFood  
                toggleActiveNav={toggleActiveNav}
                customerProfile={customerProfile[0]}
                customerAddress={customerAddress}
                />:
                null:

                navActiveItem===2?
                <MyOrders
                toggleActiveNav={toggleActiveNav}
                customerAddress={customerAddress[0]}
                />:

                navActiveItem===3?
                <div>
                    <h3>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}</h3>
                    0 inbox messages
                </div>:

                navActiveItem===6?
                <MyAddress 
                toggleActiveNav={toggleActiveNav}
                customerAddress={customerAddress}
                customerProfile={customerProfile[0]}
                />:

                navActiveItem===7?
                <MyAccountProfile
                toggleActiveNav={toggleActiveNav}
                customerProfile={customerProfile[0]}
                />:

                navActiveItem===8?
                <RecentlyViewed 
                toggleActiveNav={toggleActiveNav}
                />:

                <div>
                    {pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}
                    Page Under Construction
                </div>
            }
        </div>
    </div>
  )
}

export default MyAccount;