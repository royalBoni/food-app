import React, { useEffect } from 'react'
import { useState } from 'react'
import "./myAccount.css"
import { FaEnvelope, FaShoppingBag, FaUser,FaSnowflake, FaPencilRuler, FaRegEye, FaEnvelopeOpenText, FaGlobe, FaUserCog } from 'react-icons/fa'
import MyRoyalFood from './components/MyRoyalFood'
const MyAccount = () => {

    const [navActiveItem,setNavActiveItem] = useState(1)

    const toggleActiveNav =(id)=>{
        setNavActiveItem(id)
    }

  return (
    <div className='my-account'>
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
        <div className="my-account-division">
            {
                navActiveItem===1?
                <MyRoyalFood toggleActiveNav={toggleActiveNav}/>:
                <div>Page Under Construction</div>
            }
        </div>
    </div>
  )
}

export default MyAccount;