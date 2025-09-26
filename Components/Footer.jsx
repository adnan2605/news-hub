import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createNewsletter, getNewsletter } from '../Redux/ActionCreators/NewsletterActionCreators'
import { useDispatch, useSelector } from 'react-redux'



export default function Footer() {
  let [email, setEmail] = useState('')
  let [message, setMessge] = useState('')

  let NewsletterStateData = useSelector(state => state.NewsletterStateData)
  let dispatch = useDispatch()


  function postData(e) {
    e.preventDefault()
    if (email) {
      let item = NewsletterStateData.find(x => x.email === email)
      if (item) {
        setMessge("This Email Address is already registured with us")
      }
      else {
        dispatch(createNewsletter({
          email: email,
          active: true
        }))
        setMessge("Thanks to Subcribe Our Newsletter Service, Now we can send Emails regarding new products and Best offers")

      }
      setEmail('')
    }
    else {
      setMessge('Please Enter a Valid Email Address')
    }
  }

  return (
    <>
      <footer id="footer" className="footer text-light">

        <div className="footer-newsletter">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-7">
                <h2 className='text-light '>Join Our Newsletter</h2>
                <p>{message ? message : "Subscribe to our newsletter and receive the latest news about our products and services!"}</p>
                <form onSubmit={postData}>
                  <div className="newsletter-form">
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="submit" value="Subscribe" />
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container footer-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footer-about">
              <a href="index.html" className="d-flex align-items-center">
                <span className="sitename text-light">{process.env.REACT_APP_SITE_NAME}</span>
              </a>
              <div className="footer-contact pt-3">
                <p className='fs-5'>{process.env.REACT_APP_ADDRESS}</p>
                <p><strong>Email:</strong> <Link className='text-light fs-6 ' target='_blank' to={`mailto:${process.env.REACT_APP_EMAIL}`}>{process.env.REACT_APP_EMAIL}</Link></p>
                <p><strong>Phone:</strong> <Link className='text-light fs-6' target='_blank' to={`tel:${process.env.REACT_APP_PHONE}`}>{process.env.REACT_APP_PHONE}</Link></p>
                <p><strong>Whatsapp:</strong> <Link className='text-light fs-6' target='_blank' to={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`}>{process.env.REACT_APP_WHATSAPP}</Link></p>
              </div>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className='text-light'>Useful Links</h4>
              <ul>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/" className='text-light'>Home</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/about" className='text-light'>About us</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/shop" className='text-light'>Shop</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/contact" className='text-light'>Contact Us</Link></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-3 footer-links">
              <h4 className='text-light'>Our Services</h4>
              <ul>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/features" className='text-light'>Features</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="/testimonials" className='text-light'>Testimonials</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="#" className='text-light'>Privacy Policy</Link></li>
                <li><i className="text-light bi bi-chevron-right"></i> <Link to="#" className='text-light'>Terms & Conditions</Link></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-12">
              <h4 className='text-light'>Follow Us</h4>
              <p>Follow us for the latest updates and insights</p>
              <div className="social-links d-flex">
                <Link to={process.env.REACT_APP_FACEBOOK} target='_blank' rel='noreferrer'><i className="bi text-light bi-facebook"></i></Link>
                <Link to={process.env.REACT_APP_TWITTER} target='_blank' rel='noreferrer'><i className=" text-light bi bi-twitter-x"></i></Link>
                <Link to={process.env.REACT_APP_INSTAGRAM} target='_blank' rel='noreferrer'><i className="bi text-light bi-instagram"></i></Link>
                <Link to={process.env.REACT_APP_LINKEDIN} target='_blank' rel='noreferrer'><i className="bi text-light bi-linkedin"></i></Link>
                <Link to={process.env.REACT_APP_YOUTUBE} target='_blank' rel='noreferrer'><i className="bi text-light bi-youtube"></i></Link>
              </div>
            </div>

          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">{process.env.REACT_APP_SITE_NAME}</strong> <span>All Rights Reserved</span></p>
          <div className="credits">
          </div>
        </div>

      </footer>
    </>
  )

}