import React from 'react'
import Breadcrum from '../Components/Breadcrum'
import Profile from '../Components/Profile'
import Cart from '../Components/Cart'

export default function CheckoutPage() {
  return (
    <>
        <Breadcrum title='Checkout - Place your Order'/>
        <div className="cotainer my-3">
            <div className="row">
                <div className="col-md-6"><Profile title='Billing Address'/></div>
                <div className="col-md-6"><Cart title='Products in cart'/></div>
            </div>
        </div>
    </>
  )
}
