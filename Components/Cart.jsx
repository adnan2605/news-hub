import React, { useEffect, useState } from 'react'
import { deleteCart, getCart, updateCart } from '../Redux/ActionCreators/CartActionCreators'
import { createCheckout } from '../Redux/ActionCreators/CheckoutActionCreators'
import { getProduct, updateProduct } from '../Redux/ActionCreators/ProductActionCreators'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart({ title, data }) {

    let [cart, setCart] = useState(data ? data : [])
    let [total, setTotal] = useState(0)
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [mode, setMode] = useState("COD")


    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function placeorder() {
        let item = {
            user: localStorage.getItem("userid"),
            orderStatus: 'Order is Placed',
            paymentMode: mode,
            paymentStatus: 'Pending',
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: [...cart]
        }
        dispatch(createCheckout(item))
        cart.forEach(cartItem => {
            let product = ProductStateData.find(x => x.id === cartItem.product)
            product.stockQuantity = product.stockQuantity - cartItem.qty
            product.stock = product.stockQuantity === 0 ? false : true
            dispatch(updateProduct({ ...product }))
            dispatch(deleteCart({ id: cartItem.id }))
        })
        navigate('/order-confirmation')
    }

    function updateRecord(id, option) {
        let item = cart.find(x => x.id === id)
        let index = cart.findIndex(x => x.id === id)


        if ((option === 'DEC' && item.qty === 1) || (option === "INC" && item.qty === item.stockQuantity))
            return
        else if (option === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.price
        }
        else {
            item.qty = item.qty + 1
            item.total = item.total + item.price
        }
        dispatch(updateCart({ ...item }))
        cart[index].qty = item.qty
        cart[index].total = item.total
        calculation(cart)

    }

    function calculation(data) {
        let subtotal = 0
        data.forEach(x => subtotal = subtotal + x.total)
        if (subtotal > 0 && subtotal < 1000) {
            setTotal(subtotal + 150)
            setShipping(150)
        }
        else {
            setTotal(subtotal)
            setShipping(0)
        }
        setSubtotal(subtotal)
    }

    function getAPIData() {
        dispatch(getCart())
        if (data)
            calculation(data)
        else if (CartStateData.length) {
            let data = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
            setCart(data)
            calculation(data)
        }
        else {
            setCart([])
            calculation([])
        }
    }

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteCart({ id: id }))
            getAPIData();
        }
    }

    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])
    return (

        <>
            <h5 className='btn-color text-light text-center p-2 '>{title}</h5>
            {
                cart.length ? <>
                    <div className="table-responsive ">
                        <table className='table table-bordered table-striped table-hover'>
                            <thead>
                                <tr>

                                    <th></th>
                                    <th>Name </th>
                                    <th className={title !== 'Cart' ? 'd-none' : ''}>Brand</th>
                                    <th>Color</th>
                                    <th>Size</th>
                                    <th className={title !== 'Cart' ? 'd-none' : ''}>Stock</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>

                                    <th className={title !== 'Cart' ? 'd-none' : ''}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map(item => {
                                        return <tr key={item.id}>
                                            <td>
                                                <Link to={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} target='_blank' rel='noreferrer'>
                                                    <img src={`${process.env.REACT_APP_BACKEND_SERVER}${item.pic}`} width={70} height={60} alt="" />
                                                </Link>
                                            </td>
                                            <td>{item.name}</td>
                                            <td className={title !== 'Cart' ? 'd-none' : ''}>{item.brand}</td>
                                            <td>{item.color}</td>
                                            <td>{item.size}</td>
                                            <td className={title !== 'Cart' ? 'd-none' : ''}>{item.stockQuantity ? `${item.stockQuantity} Left in the stock` : `Out of Stock`}</td>
                                            <td>&#8377;{item.price}</td>
                                            <td><div className="btn-group w-100">
                                                <button className={`btn btn-primary ${title !== 'Cart' ? 'd-none' : ''}`} onClick={() => updateRecord(item.id, "DEC")} ><i className='fa fa-minus'></i></button>
                                                <h5 className='w-50 text-center pt-2'>{item.qty}</h5>
                                                <button className={`btn btn-primary ${title !== 'Cart' ? 'd-none' : ''}`} onClick={() => updateRecord(item.id, "INC")} ><i className='fa fa-plus'></i></button>
                                            </div></td>
                                            <td>{item.total}</td>

                                            <td className={title !== 'Cart' ? 'd-none' : ''}><button className='btn btn-danger' onClick={() => deleteRecord(item.id)}><i className='fa fa-trash'></i></button></td>
                                        </tr>

                                    })
                                }
                            </tbody>
                        </table>
                    </div>


                    <div className={`row ${title === 'Products in Order'?"d-none":''}`}>
                        <div className="col-md-6">

                        </div>
                        <div className={title !== 'Cart' ? 'col-md-12' : 'col-md-6'}>
                            <table className='table table-bordered table-striped table-hover'>
                                <tbody>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{total}</td>
                                    </tr>
                                    <tr className={title !== 'Products in Cart Section' ? 'd-none' : ''}>
                                        <th>Payment Mode</th>
                                        <td>
                                            <select name="mode" id="" className='form-select border-3 border-primary' onChange={e => setMode(e.target.value)}>
                                                <option value="COD" >COD</option>
                                                <option value="Net Banking" disabled>Net Banking/Card/UPI</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2} className={title !== 'Cart' ? 'd-none' : ''}>
                                            <Link to="/checkout" className='btn btn-primary w-100'>Proceed to Checkout</Link>
                                        </td>

                                        <td colSpan={2} className={title === 'Cart' ? 'd-none' : ''}>
                                            <button to="/checkout" className='btn btn-primary w-100' onClick={placeorder}>Place Order</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
                    : <div className='text-center py-3'>
                        <h3>No Items Found in Cart </h3>
                        <Link to="/shop" className='btn btn-primary'>Shop</Link>
                    </div>
            }
        </>
    )
}
