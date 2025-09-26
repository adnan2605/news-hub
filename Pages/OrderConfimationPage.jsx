import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import { Link } from 'react-router-dom'

export default function OrderConfimationPage() {
  return (
    <>
        <Breadcrum title='Order Placed'/>
        <div className="container my-3 text-center">
            <div className="card p-5 ">
                <h1>Thank You</h1>
                <h2>Your Order has been placed</h2>
                <h4>You can Track your order in Profile</h4>
                <div className="btn-group w-50 m-auto">
                    <Link to="/shop" className='btn btn-primary' >Shop</Link>
                    <Link to="/profile" className='btn btn-secondary ' >Profile</Link>
                </div>
            </div>
        </div>
    </>
  )
}
