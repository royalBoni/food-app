import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import './footer.css'

const Footer = () => {
    const year=new Date().getFullYear()
  return (
    <footer>
        <div className="footer-division-container">
            <div className="footer-division">
                <h3 className="brand"><span>Royal</span>Food</h3>
                <p>
                    It is an honour to serve you with the best of foods which makes you feel special and also makes every a special day.
                </p>
                <div className="footer-icons-container">
                    <div className="icon-wrapper">
                        <FaFacebookF className='icon-icon'/>
                    </div>
                    <div className="icon-wrapper">
                        <FaInstagram className='icon-icon'/>
                    </div>
                    <div className="icon-wrapper">
                        <FaTwitter className='icon-icon'/>
                    </div>
                </div>
            </div>
            <div className="footer-division">
                <h4>Product</h4>
                <p>
                    <li>Employee database</li>
                    <li>Payroll</li>
                    <li>Absences</li>
                    <li>Time tracking</li>
                </p>
            </div>
            <div className="footer-division">
                <h4>Information</h4>
                <p>
                    <li>FAQ</li>
                    <li>Blog</li>
                    <li>Support</li>
                    <li>Payroll</li>
                </p>
            </div>
            <div className="footer-division">
                <h4>Category</h4>
                <p>
                    <li>About us</li>
                    <li>Careers</li>
                    <li>Contact us</li>
                </p>
            </div>
        </div>
        <p className='alright-reserved'>
            {`${year} Royal Technologies All Right Reserved`}
        </p>
        
    </footer>
  )
}

export default Footer