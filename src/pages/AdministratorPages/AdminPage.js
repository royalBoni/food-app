import React, { useState,useEffect } from 'react'
import './adminPage.css'
import { FaBell, FaCaretDown, FaCaretUp, FaChartBar, FaClock, FaFileInvoice, FaQuestionCircle, FaRegSun, FaShoppingBag, FaSnowflake, FaThLarge, FaUserAlt, FaUsers, FaSpinner } from 'react-icons/fa'
import Overview from './components/Overview'
import Customers from './components/Customers'
import Products from './components/Products'
import { extendedApiTransactionSlice } from '../../features/transactionSlice.js/transaction'
import { extendedApiCustomerSlice } from '../../features/customers/customersSlice'
import { extendedApiProfileSlice } from '../../features/profiles/profileSlice'
import { extendedApiAddressesSlice } from '../../features/addresses/addressSlice'
import ProfileAndMenu from './components/ProfileAndMenu'
import { setIsOverPage } from '../../features/actions/actionStateSlice'
import { useSelector } from 'react-redux'
import PromptMessage from '../../Components.js/PromptMessage'
import ViewProductModal from './components/ViewProductModal'
import EditProductModal from './components/EditProductModal'
import AddProductModal from './components/AddProductModal'
import ViewTransactionModal from './components/ViewTransactionModal'
import EditTransactionModal from './components/EditTransactionModal'
import Transaction from './components/Transaction'

import { store } from '../../app/store'

const AdminPage = () => {
  const isOverPage=useSelector((state)=>state.promptMessage.isOverPage);

  useEffect(()=>{
    store.dispatch(extendedApiTransactionSlice.endpoints.getTransactions.initiate());
    store.dispatch(extendedApiCustomerSlice.endpoints.getCustomers.initiate())
    store.dispatch(extendedApiProfileSlice.endpoints.getAllProfiles.initiate())
    store.dispatch(extendedApiAddressesSlice.endpoints.getAllAddress.initiate())
  },[])

  const adminData = JSON.parse(localStorage.getItem("myAdminData"))
  const [activeNavItem, setActiveNavItem] = useState(1)
  const [isProfileMenu,setIsProfileMenu] = useState(false)
  const [overPageOperation, setOverPageOperation] =useState(null)

  const handleSwitchProfileMenu = () =>{ setIsProfileMenu(!isProfileMenu)}


  const handleClickActiveNav =(id)=>{
    setActiveNavItem(id)
  }
  return (
    <div className='admin-page'>
      
      {
        isOverPage.isOverPage?
        <div className='over-page'>
          <PromptMessage/>

          {
            isOverPage.operation==="view"?
            <ViewProductModal/>:
            isOverPage.operation==="edit"?
            <EditProductModal/>:
            isOverPage.operation==="create"?
            <AddProductModal/>:
            isOverPage.operation==="view-transaction"?
            <ViewTransactionModal/>:
            isOverPage.operation==="edit-transaction"?
            <EditTransactionModal/>:
            isOverPage.operation==="loading"?
            <div className="animation-container">
                <FaSpinner className='loading-animation'/>
            </div>:
            null
          }
        </div>:
        null
      }
      <div className="container">
        <div className="brand"><span>Royal</span>Food</div>
        <div className="items">
          <div className="items-container">
            <div className="items-container-title">MENU</div>
            <ul>
              <li className={activeNavItem===1?'active-nav-item':null} onClick={()=>handleClickActiveNav(1)}><FaThLarge/> Overview</li>
              <li className={activeNavItem===2?'active-nav-item':null} onClick={()=>handleClickActiveNav(2)}><FaShoppingBag/> Products</li>
              <li className={activeNavItem===3?'active-nav-item':null} onClick={()=>handleClickActiveNav(3)}><FaUsers/> Customers</li>
              <li className={activeNavItem===4?'active-nav-item':null} onClick={()=>handleClickActiveNav(4)}><FaFileInvoice/> Transactions</li>
              <li className={activeNavItem===5?'active-nav-item':null} onClick={()=>handleClickActiveNav(5)}><FaSnowflake/> Tokens</li>
              <li className={activeNavItem===6?'active-nav-item':null} onClick={()=>handleClickActiveNav(6)}><FaChartBar/> Statistics</li>
              <li className={activeNavItem===7?'active-nav-item':null} onClick={()=>handleClickActiveNav(7)}><FaClock/> Log Activities</li>
            </ul>
          </div>
          <div className="items-container">
            <h5 className="items-container-title">SUPPORT</h5>
            <ul>
              <li className={activeNavItem===8?'active-nav-item':null} onClick={()=>handleClickActiveNav(8)}><FaUserAlt/> My Profile</li>
              <li className={activeNavItem===9?'active-nav-item':null} onClick={()=>handleClickActiveNav(9)}><FaRegSun/> Settings</li>
              <li className={activeNavItem===10?'active-nav-item':null} onClick={()=>handleClickActiveNav(10)}><FaQuestionCircle/> Help</li>
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
            activeNavItem===2? <Products setIsOverPage={setIsOverPage}/>:
            activeNavItem===3? <Customers/>:
            activeNavItem===4? <Transaction/>:
            <p>PAGE COMPONENT UNDER CONSTRUCTION</p>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminPage