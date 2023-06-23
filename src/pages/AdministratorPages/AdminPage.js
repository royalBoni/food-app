import React, { useState,useEffect } from 'react'
import './adminPage.css'
import { FaBell, FaCaretDown, FaCaretUp, FaChartBar, FaClock, FaFileInvoice, FaQuestionCircle, FaRegSun, FaShoppingBag, FaSistrix, FaThLarge, FaUserAlt, FaUsers } from 'react-icons/fa'
import Overview from './components/Overview'
import Customers from './components/Customers'
import Products from './components/Products'
import { extendedApiTransactionSlice } from '../../features/transactionSlice.js/transaction'
import { extendedApiCustomerSlice } from '../../features/customers/customersSlice'
import ProfileAndMenu from './components/ProfileAndMenu'

import { store } from '../../app/store'

const AdminPage = () => {
  useEffect(()=>{
    store.dispatch(extendedApiTransactionSlice.endpoints.getTransactions.initiate());
    store.dispatch(extendedApiCustomerSlice.endpoints.getCustomers.initiate())
  },[])

  const adminData = JSON.parse(localStorage.getItem("myAdminData"))
  const [activeNavItem, setActiveNavItem] = useState(1)
  const [isProfileMenu,setIsProfileMenu] = useState(false)

  const handleSwitchProfileMenu = () =>{ setIsProfileMenu(!isProfileMenu)}


  const handleClickActiveNav =(id)=>{
    setActiveNavItem(id)
  }
  return (
    <div className='admin-page'>
      <div className="container">
        <div className="brand"><span>Royal</span>Food</div>
        <div className="items">
          <div className="items-container">
            <h5 className="items-container-title">MENU</h5>
            <ul>
              <li className={activeNavItem===1?'active-nav-item':null} onClick={()=>handleClickActiveNav(1)}><FaThLarge/> Overview</li>
              <li className={activeNavItem===2?'active-nav-item':null} onClick={()=>handleClickActiveNav(2)}><FaShoppingBag/> Products</li>
              <li className={activeNavItem===3?'active-nav-item':null} onClick={()=>handleClickActiveNav(3)}><FaUsers/> Customers</li>
              <li className={activeNavItem===4?'active-nav-item':null} onClick={()=>handleClickActiveNav(4)}><FaFileInvoice/> Transactions</li>
              <li className={activeNavItem===5?'active-nav-item':null} onClick={()=>handleClickActiveNav(5)}><FaChartBar/> Statistics</li>
              <li className={activeNavItem===6?'active-nav-item':null} onClick={()=>handleClickActiveNav(6)}><FaClock/> Log Activities</li>
            </ul>
          </div>
          <div className="items-container">
            <h5 className="items-container-title">SUPPORT</h5>
            <ul>
              <li className={activeNavItem===7?'active-nav-item':null} onClick={()=>handleClickActiveNav(7)}><FaUserAlt/> My Profile</li>
              <li className={activeNavItem===8?'active-nav-item':null} onClick={()=>handleClickActiveNav(8)}><FaRegSun/> Settings</li>
              <li className={activeNavItem===9?'active-nav-item':null} onClick={()=>handleClickActiveNav(9)}><FaQuestionCircle/> Help</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="top-bar">
          <h5 className="items-container-title">{`ADMINISTRATOR ${(adminData?.firstName)?.toUpperCase()}'s DASHBOARD`}</h5>
          <div className="top-bar-interactions">
            <input type="text" placeholder='search everything'/>
            <div className="notifications">
              <FaBell/>
              <div className="notification-number">3</div>
            </div>
            <div className="profile-and-menu" onClick={handleSwitchProfileMenu}>
              <div className="profile">
                <FaUserAlt className='top-bar-profile-icon'/>
              </div>
              {
                isProfileMenu?<FaCaretUp />:<FaCaretDown />
              }
            </div>
            
          </div>
        </div>
        
        <div className="content-container">
          
          {
            isProfileMenu?<ProfileAndMenu />:null
          }
          {
            activeNavItem===1? <Overview/>:
            activeNavItem===2? <Products/>:
            activeNavItem===3? <Customers/>:
            <p>PAGE COMPONENT UNDER CONSTRUCTION</p>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminPage