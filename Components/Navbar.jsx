import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  let navigate= useNavigate()

  function logout(){
    localStorage.removeItem('name')
    localStorage.removeItem('login')
    localStorage.removeItem('role')
    localStorage.removeItem('userid')
    navigate('/login')
  }
  return (
    <>
      <div className='top-bar p-2'>
        <div className='row'>
          <div className="col-md-9 col-6">
            <div className="ms-5">

              <Link className='me-4' target='_blank' rel="noreferrer" to={`mailto:${process.env.REACT_APP_EMAIL}`} ><i className='bi bi-envelope text-light '><span className='ms-1 d-none d-md-inline'>{process.env.REACT_APP_EMAIL}</span></i></Link>
              <Link className='me-4' target='_blank' rel="noreferrer" to={`tel:${process.env.REACT_APP_PHONE}`} ><i className='bi bi-phone text-light '><span className='ms-2 d-none d-md-inline'>{process.env.REACT_APP_PHONE}</span></i></Link>
              <Link className='me-4' target='_blank' rel="noreferrer" to={`https://wa.me/${process.env.REACT_APP_WHATSAPP}`} ><i className='bi bi-whatsapp text-light '><span className='ms-2 d-none d-md-inline'>{process.env.REACT_APP_WHATSAPP}</span></i></Link>
            </div>
          </div>
          <div className="col-md-3 col-6">
            <div className="float-end">
              <Link className='me-3' to={`${process.env.REACT_APP_FACEBOOK}`} target='_blank' rel='noreferrer'><i className='text-light bi bi-facebook fs-5'></i></Link>
              <Link className='me-3' to={`${process.env.REACT_APP_INSTAGRAM}`} target='_blank' rel='noreferrer'><i className='text-light bi bi-instagram fs-5'></i></Link>
              <Link className='me-3' to={`${process.env.REACT_APP_LINKEDIN}`} target='_blank' rel='noreferrer'><i className='text-light bi bi-linkedin fs-5'></i></Link>
              <Link className='me-3' to={`${process.env.REACT_APP_TWITTER}`} target='_blank' rel='noreferrer'><i className='text-light bi bi-twitter-x fs-5'></i></Link>
              <Link className='me-3' to={`${process.env.REACT_APP_YOUTUBE}`} target='_blank' rel='noreferrer'><i className='text-light bi bi-youtube fs-5'></i></Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary d-flex align-items-center sticky-top header">
        <div className="container">
          <Link to="" className="logo d-flex align-items-center me-auto">
            <h1 className="sitename">{process.env.REACT_APP_SITE_NAME}</h1>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="navbarSupportedContent">

            <ul className="navbar-nav navmenu  mx-auto mb-2 mb-lg-0 ">
              <li className='nav-item'><NavLink to="/" className="nav-link"  >Home<br /></NavLink></li>
              <li className='nav-item'><NavLink to="/about" className="nav-link"  >About</NavLink></li>
              <li className='nav-item'><NavLink to="/shop" className="nav-link"  >Shop</NavLink></li>
              <li className='nav-item'><NavLink to="/features" className="nav-link"  >Features</NavLink></li>
              <li className='nav-item'><NavLink to="/testimonials" className="nav-link"  >Testimonial</NavLink></li>
              <li className='nav-item'><NavLink to="/contact" className="nav-link"  >Contact Us</NavLink></li>

            </ul>




            <ul className="navbar-nav mx-1 mb-2 mb-lg-0">
             {
              localStorage.getItem('login')? <li className="nav-item dropdown ">
                <Link className="nav-link dropdown-toggle  " to="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {localStorage.getItem('name')}
                </Link>
                <ul className="dropdown-menu">
                  {
                    localStorage.getItem('role')==='Buyer'?
                    <>
                    <li><Link to="/profile" className="dropdown-item"  >Profile<br /></Link></li>
                  <li><Link to="/cart" className="dropdown-item"  >Cart</Link></li>
                  <li><Link to="/Checkout" className="dropdown-item"  >Checkout</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                    </>
                   : <li><Link to="/profile" className="dropdown-item"  >Profile<br /></Link></li>
                    
                  }
                  
                  <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                </ul>
              </li>:
              <li className='nav-item '><NavLink to="/login" className="nav-link btn btn-primary text-light btn-color"  >Login</NavLink></li>
             }

            </ul>

          </div>
        </div>
      </nav>
    </>
  )
}
