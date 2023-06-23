import React from 'react'
import './about.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF,FaPinterest,FaTwitter } from 'react-icons/fa'
import main from '../../assets/images/about-us-main3-compressed.jpg'
import prof1 from '../../assets/images/pic-1.png'
import prof2 from '../../assets/images/pic-2.png'
import prof3 from '../../assets/images/pic-3.png'
import prof4 from '../../assets/images/me-compressed.jpeg'

const About = () => {
  const [socialsDecision,setSocialDecision]=useState(0)
  const [iconsStyle,setIconsStyles]=useState('icon')

  const handleMouseOverEmloyee=(id)=>{
    setSocialDecision(id)
    setIconsStyles('icon-appear')
  }

  const handleMouseOut=(id)=>{
    setSocialDecision(0)
    setIconsStyles('icon')
  }

  return (
    <div className='about-us'>
        <section className="about-divisions">
          <h1>Welcome to <span>Royal</span> Food</h1>
          <p>We Serve You With Only The Best, Tasty And Unique Meals</p>
        </section>
        <section className="about-divisions">
          <div className="block">
            <img src={`${main}`} alt="" />
          </div>
          <p>
            Welcome to RoyalFood - where great food and convenience come together! Our app is designed to provide you with a seamless online ordering experience, whether you're craving comfort food or something more adventurous.
            At RoyalFood, we're passionate about food and dedicated to providing our customers with a memorable dining experience. Our menu features a range of delicious options, from classic comfort dishes to creative fusion cuisine.
            Our mission is to provide our customers with exceptional food and service, whether they're dining in or ordering online. We're committed to using high-quality ingredients and preparing each dish with care and attention to detail.
            Our head chef,Loreto, has 15 years of experience in the culinary industry and is committed to creating unique and delicious dishes that showcase the best of global cuisine. From our signature dish to our weekly specials, there's always something new and exciting to try at RoyalFood.
            We believe in giving back to our community and are committed to sustainability. That's why we use locally sourced and organic ingredients whenever possible, and work with local organizations to reduce food waste and support community initiatives.
            Thank you for choosing RoyalFood for your dining needs. We're committed to providing you with a fantastic experience, whether you're dining in or ordering online. If you have any questions or feedback, please don't hesitate to reach out to us <Link to={`/contact`}>here</Link>."
          </p>
        </section>


        <section className="about-divisions">
          <h1>Mission Statement</h1>
          <p>
            At RoyalFood, our mission is to provide our customers with a fantastic dining experience that combines convenience, quality, and innovation. We're committed to using only the highest-quality ingredients and preparing each dish with care and attention to detail.
            We believe that good food should be accessible to everyone, regardless of their busy schedules or dietary preferences. That's why we've created an online ordering platform that makes it easy and convenient for customers to order delicious food from our menu, no matter where they are.
            We're also dedicated to innovation and constantly exploring new ways to improve the customer experience. Whether it's through our online ordering platform, our creative and innovative menu items, or our commitment to sustainability and community involvement, we're always looking for ways to push the boundaries and set ourselves apart from the competition.
            At RoyalFood, we believe that food is not just fuel, but a vital part of life that brings people together and enriches our daily experiences. That's why we're committed to providing our customers with a dining experience that's not just satisfying, but memorable and enjoyable. Thank you for choosing RoyalFood, and we look forward to serving you soon!
          </p>
        </section>

        <section className="about-divisions">
            <div className="about-divisions-sub">
              <h1>Our Team</h1>
              <p>The professional standards and expectations</p>
            </div>
            <div className="about-divisions-sub">
              <div className="employee-card" onMouseOver={()=>handleMouseOverEmloyee(1)} onMouseOut={handleMouseOut}>
                <div className="employee-card-image" style={{backgroundImage:`url(${prof4})`}}>
                  {/* <img src={`${main}`} alt="" /> */}
                  <div className={socialsDecision===1?'employee-card-socials':'no-socials'}>
                    <div className="socials-container">
                      <FaFacebookF className={`${iconsStyle}`}/>
                      <FaTwitter className={`${iconsStyle}`}/>
                      <FaPinterest className={`${iconsStyle}`}/>
                    </div>
                  </div>
                </div>
                <h3>Mikel Blankson</h3>
                <p>CEO</p>
              </div>
              <div className="employee-card" onMouseOver={()=>handleMouseOverEmloyee(2)} onMouseOut={()=>handleMouseOut(2)}>
                <div className="employee-card-image" style={{backgroundImage:`url(${prof1})`}}>
                  {/* <img src={`${main}`} alt="" /> */}
                  <div className={socialsDecision===2?'employee-card-socials':'no-socials'}>
                    <div className="socials-container">
                      <FaFacebookF className={`${iconsStyle}`}/>
                      <FaTwitter className={`${iconsStyle}`}/>
                      <FaPinterest className={`${iconsStyle}`}/>
                    </div>
                  </div>
                </div>
                <h3>Mikel Blankson</h3>
                <p>Operations Manager</p>
              </div>
              <div className="employee-card" onMouseOver={()=>handleMouseOverEmloyee(3)} onMouseOut={()=>handleMouseOut(3)}>
                <div className="employee-card-image" style={{backgroundImage:`url(${prof2})`}}>
                  <div className={socialsDecision===3?'employee-card-socials':'no-socials'}>
                    <div className="socials-container">
                      <FaFacebookF className={`${iconsStyle}`}/>
                      <FaTwitter className={`${iconsStyle}`}/>
                      <FaPinterest className={`${iconsStyle}`}/>
                    </div>
                  </div>
                  {/* <img src={`${main}`} alt="" /> */}
                </div>
                <h3>Mikel Blankson</h3>
                <p>Secretary</p>
              </div>
              <div className="employee-card" onMouseOver={()=>handleMouseOverEmloyee(4)} onMouseOut={()=>handleMouseOut(4)}>
                <div className="employee-card-image" style={{backgroundImage:`url(${prof3})`}}>
                  <div className={socialsDecision===4?'employee-card-socials':'no-socials'}>
                    <div className="socials-container">
                      <FaFacebookF className={`${iconsStyle}`}/>
                      <FaTwitter className={`${iconsStyle}`}/>
                      <FaPinterest className={`${iconsStyle}`}/>
                    </div>
                  </div>
                </div>
                <h3>Mikel Blankson</h3>
                <p>Chef</p>
              </div>
            </div>
        </section>
    </div>
  )
}

export default About