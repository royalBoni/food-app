import React, { useEffect } from 'react'
import { useState } from 'react'
import "./myAccount.css"
import { FaEnvelope, FaShoppingBag, FaUser,FaSnowflake, FaPencilRuler, FaRegEye, FaEnvelopeOpenText, FaGlobe, FaUserCog, FaArrowLeft } from 'react-icons/fa'
import MyRoyalFood from './components/MyRoyalFood'
import { extendedApiAddressesSlice } from '../../features/addresses/addressSlice'
import { extendedApiProfileSlice, selectAllProfile } from '../../features/profiles/profileSlice'
import { extendedApiTransactionSlice } from '../../features/transactionSlice.js/transaction'
import { useSelector } from 'react-redux'
import { store } from '../../app/store'
import { selectAllAdresss } from '../../features/addresses/addressSlice'
import MyOrders from './components/MyOrders'
import RecentlyViewed from './components/RecentlyViewed'
import MyAddress from './components/MyAddress'
import MyAccountProfile from './components/MyAccountProfile'
import MyReviewsOnProducts from './components/MyReviewsOnProducts'
import { useNavigate } from 'react-router-dom'

const MyAccount = () => {

    //FETCHING THE PAGE WIDTH FROM THE REDUX STORE
    const pageWidth=useSelector((state)=>state.promptMessage.pageWidth);

    //ASSIGNMENT AND DECLARATIONS
    const customerAddress= useSelector(selectAllAdresss)
    const customerProfile = useSelector(selectAllProfile)
    const navigate = useNavigate()


    //FUNCTION AND STATES TO TOGGLE BETWEEN ACCOUNT COMPONENTS
    const [navActiveItem,setNavActiveItem] = useState(1)
    const [mobileSwitchActiveItem, setMobileSwitchActiveItem] = useState(false) //A STATE TO DETERMINE WHETHER ACCOUNT PAGE  SIDE NAV MENU WILL BE DISPLAYED

    const toggleActiveNav =(id)=>{
        setNavActiveItem(id)

        //A CONDITION THAT SWITCHES ON AND OFF THE ACCOUNT PAGE NAV MENU DURING MOBILE MODE
        if(id!==1){
            setMobileSwitchActiveItem(true)
        }
        else{
            setMobileSwitchActiveItem(false)
        }
    }

    //A FUNCTION TO LOGOUT
    const logout=()=>{
        localStorage.removeItem("myUserId")
        navigate('/login')
    }

    //STORE ENDPOINTS INITIATED ON PAGELOAD
    useEffect(()=>{
        store.dispatch(extendedApiAddressesSlice.endpoints.getUserAddress.initiate())
        store.dispatch(extendedApiProfileSlice.endpoints.getUserProfiles.initiate())
        store.dispatch(extendedApiTransactionSlice.endpoints.getTransactionsByUser.initiate())
      },[])

  return (
    <div className='my-account'>
        {
            mobileSwitchActiveItem && pageWidth<1000?null: //NAV MENU ITEMS WILL BE OFF IF BREAKPOINT IS MOBILE LESS 100PX AND 'mobileSwitchActiveItem' IS TRUE
            <div className="my-account-division"> {/*//THIS SECTION WILL BE ON IF BREAKPOINT IS MOBILE GREATER THAN 100PX AND 'mobileSwitchActiveItem' IS FALSE */}
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
                <div onClick={logout} className='log-out'>Logout</div>
            </div>
        }
        <div className="my-account-division">
            {
                //CONDITIONS WHICH SPECIFIES WHICH COMPONENT TO DISPLAY
                //'toggleActiveNav' STATE IS PROP DRILLED INTO EACH COMPONENT, WHICH IS USED TO NAVIGATE BACK TO NAV MENU IN MOBILE MODE
                navActiveItem===1?//  'MyRoyalFood' component is invoked when 'setNavActiveItem' is set to 1 by clicking on 'My Royal Food' of the Account Page Nav Menu
                pageWidth>1000?
                <MyRoyalFood  
                toggleActiveNav={toggleActiveNav}
                customerProfile={customerProfile[0]}
                customerAddress={customerAddress}
                />:
                null:

                navActiveItem===2?//  'MyOrders' component is invoked when 'setNavActiveItem' is set to 2 by clicking on 'My Orders' of the Account Page Nav Menu
                <MyOrders
                toggleActiveNav={toggleActiveNav}
                customerAddress={customerAddress[0]}
                />:

                navActiveItem===3?//  'Inbox' component is invoked when 'setNavActiveItem' is set to 3 by clicking on 'Inbox' of the Account Page Nav Menu
                <div>
                    <h3>{pageWidth<1000?<FaArrowLeft onClick={()=>toggleActiveNav(1)}/>:null}</h3>
                    0 inbox messages
                </div>:

                navActiveItem===5?//  'MyReviewsOnProducts' component is invoked when 'setNavActiveItem' is set to 5 by clicking on 'Pending Reviews' of the Account Page Nav Menu
                <MyReviewsOnProducts
                toggleActiveNav={toggleActiveNav}
                customerProfile={customerProfile[0]}
                />:

                navActiveItem===6?//  'MyAddress' component is invoked when 'setNavActiveItem' is set to 6 by clicking on 'My Address' of the Account Page Nav Menu
                <MyAddress 
                toggleActiveNav={toggleActiveNav}
                customerAddress={customerAddress}
                customerProfile={customerProfile[0]}
                />:

                navActiveItem===7?//  'MyAccountProfile' component is invoked when 'setNavActiveItem' is set to 7 by clicking on 'Account Management' of the Account Page Nav Menu
                <MyAccountProfile
                toggleActiveNav={toggleActiveNav}
                customerProfile={customerProfile[0]}
                />:

                navActiveItem===8?//  'RecentlyViewed' component is invoked when 'setNavActiveItem' is set to 8 by clicking on 'Recently Viewed' of the Account Page Nav Menu
                <RecentlyViewed 
                toggleActiveNav={toggleActiveNav}
                />:

                //Default component when an unspecified navActiveItem is setted
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