import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import NewsLetter from './NewsLetter'
import PromptMessage from './PromptMessage'
import CartMini from './CartMini'
import { MobileNav } from './MobileNav'
import CartSymbol from './CartSymbol'
import './layout.css'


const Layout = () => {
  
  
  return (
    <div className='page-container'>
    <Header/>
    <MobileNav />
    <CartMini/>
    <PromptMessage/>
        <Outlet />
    <div className="mobile-cart-symbol">
      <CartSymbol/>
    </div>
    <NewsLetter/>
    <Footer/>
    </div>

  )
}

export default Layout