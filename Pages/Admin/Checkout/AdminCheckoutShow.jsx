import React, { useEffect, useState } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';



import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Cart from '../../../Components/Cart';


export default function AdminCheckoutShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [user, setUser] = useState({})

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")


    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()


    function updateRecord() {
        if (window.confirm("Are you sure to update Record?")) {
            let item = CheckoutStateData.find(x => x.id === id)
            dispatch(updateCheckout({
                ...item,
                orderStatus: orderStatus,
                paymentStatus: paymentStatus
            }))
            getAPIData();
        }
    }

    async function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find(x => x.id === id)
            setOrderStatus(item.orderStatus)
            setPaymentStatus(item.paymentStatus)
            if (item) {
                setData(item)
                let response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}user/${item.user}`, {
                    method: "GET",
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                response = await response.json()
                setUser(response)
            }
            else
                navigate('/admin/checkout')
        }
    }

    useEffect(() => {
        getAPIData();

    }, [CheckoutStateData.length]);

    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='btn-color w-100 p-2 text-light text-center'>
                            Checkout Query
                        </h5>
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>

                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>User</th>
                                        <td>{user.name}<br />
                                            {user.phone},  {user.email}<br />
                                            {user.address}<br />
                                            {user.pin}, {user.city}, {user.state}<br />

                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderStatus}
                                            {data.orderStatus !== "Delivered" ?
                                                <select name="orderStatus" onChange={e => setOrderStatus(e.target.value)} value={orderStatus} className='form-select border-3 border-primary mt-3'>
                                                    <option>Order is Placed </option>
                                                    <option>Order is Packed</option>
                                                    <option>Order is ready to Ship</option>
                                                    <option>Order is Shipped</option>
                                                    <option>Order is in Transit</option>
                                                    <option>Order is reached at the Final Delivery Station</option>
                                                    <option>Order is out for Delivery </option>
                                                    <option>Order is Delivered </option>
                                                </select> : null

                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentStatus}
                                            {
                                                data.paymentStatus !== "Done" ?
                                                    <select name='paymentStatus' onChange={e => setPaymentStatus(e.target.value)} value={paymentStatus} className='form-select border-3 border-primary mt-3'>
                                                        <option>Pending </option>
                                                        <option>Done</option>
                                                    </select> : null

                                            }</td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>

                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.orderStatus !== 'Delivered' || data.paymentStatus === "Done" ?
                                                    <button className='btn btn-primary w-100' onClick={updateRecord}>Update</button> : null

                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        {data.products && data.products.length ? <Cart title='Products in Order' data={data.products} /> : null}
                    </div>
                </div>
            </div>
        </>
    );
}
