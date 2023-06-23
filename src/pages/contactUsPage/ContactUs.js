import React from 'react'
import './contactUs.css'

const ContactUs = () => {
  return (
    <div className='contact-us'>
       <section className="contact-us-division">
          <div className="up-divisions">
              <div className="up-divisions-row">
                <h3>Address</h3>
                <p>Brahabebome Ato Plans. Bh 86f. Obuasi</p>
              </div>

              <div className="up-divisions-row">
                <h3>Phone</h3>
                <p>+233 24 5555555</p>
              </div>

              <div className="up-divisions-row">
                <h3>Email</h3>
                <p>royaltech@gmail.com</p>
              </div>

              <div className="up-divisions-row">
                <h3>Working Time</h3>
                <p>Monday - Friday: 08 AM - 06 PM</p>
                <p>Saturdays & Sundays: 10 AM - 4PM</p>
              </div>
          </div>
          <div className="up-divisions">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253858.98592270457!2d-1.9843754651419845!3d6.191360926962405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdc432534f74ac7%3A0x54805e84a2ecefa0!2sObuasi%20Municipal!5e0!3m2!1sen!2sgh!4v1682954531970!5m2!1sen!2sgh" width="600" height="450" style={{border:0}} title='map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
       </section>

       <section className="contact-us-division">
          <div className="down-divisions">
            <h3>Get In Touch</h3>
            <p>Contact Us For The Best Offer And Services</p>
          </div>

          <div className="down-divisions">
            <form action="">
               <div className="form-row">
                  <input type="text" name="name" id="name" placeholder='Your Name'/>
                  <input type="email" name="email" id="email" placeholder='Your Email'/>
                  <input type="text" name="suject" id="subject" placeholder='Subject' />
               </div>

               <div className="form-row">
                  <textarea name="message" id="message" cols="30" rows="10" placeholder='Message'></textarea>
               </div>

               <div className="form-row">
                  <button>Submit</button>
               </div>
            </form>
          </div>
       </section>
    </div>
  )
}

export default ContactUs