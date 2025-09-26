import React, { useEffect, useRef, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'

import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'



let rte;
export default function AdminCreateProduct() {
    let refdiv = useRef(null);
    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: "",
        size: "",
        basePrice: "",
        discount: 0,
        finalPrice: "",
        stock: true,
        stockQuantity: "",
        description: "",
        pic: [],
        active: true
    })

    let [errorMsg, setErrorMsg] = useState(
        {
            name: 'Name Feild is Mendatory ',
            color: 'Color Feild is Mendatory ',
            size: 'Size Feild is Mendatory ',
            basePrice: 'Base Price Feild is Mendatory ',
            discount: '',
            stockQuantity: 'Stock Quantity Feild is Mendatory ',
            pic: 'Image Feild is Mendatory '
        }
    )
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value

        setErrorMsg((old) => {
            return {
                ...old,
                [name]: e.target.files ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })
    }

    function postData(e) {
        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let stockQuantity = parseInt(data.stockQuantity)
        e.preventDefault()
        let error = Object.values(errorMsg).find((x) => x !== "")
        if (error)
            setShow(true)

        else {

            dispatch(createProduct({
                ...data,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                brand: data.brand ? data.brand : BrandStateData[0].name

            }))
            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (async () => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length]);
    useEffect(() => {
        (async () => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length]);
    useEffect(() => {
        (async () => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length]);
    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");

    },[])

    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='btn-color w-100 p-2 text-light text-center'>Product<Link to="/admin/product"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className='mb-3'>
                                <label for="name">Name*</label>
                                <input type="text" name='name' onChange={getInputData} placeholder='Product Name' className={`form-control border-3 ${show && errorMsg.name ? 'border-danger' : "border-primary"}`} />
                                {show && errorMsg.name ? <p className='text-danger'>{errorMsg.name}</p> : null}
                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label >Maincategory*</label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            MaincategoryStateData && MaincategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label >Subcategory*</label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            SubcategoryStateData && SubcategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div><div className="col-md-3 mb-3">
                                    <label >Brand*</label>
                                    <select name="brand" onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            BrandStateData && BrandStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div><div className="col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Base Price*</label>
                                    <input type="number" name='basePrice' onChange={getInputData} placeholder='Product Base' className={`form-control border-3 ${show && errorMsg.basePrice ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.basePrice ? <p className='text-danger'>{errorMsg.basePrice}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Discount*</label>
                                    <input type="number" name='discount' value={data.discount} onChange={getInputData} placeholder='Discount on Product' className={`form-control border-3 ${show && errorMsg.discount ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.discount ? <p className='text-danger'>{errorMsg.discount}</p> : null}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Color*</label>
                                    <input type="text" name='color' onChange={getInputData} placeholder='Product Color' className={`form-control border-3 ${show && errorMsg.color ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.color ? <p className='text-danger'>{errorMsg.color}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Size*</label>
                                    <input type="text" name='size' onChange={getInputData} placeholder='Product Size' className={`form-control border-3 ${show && errorMsg.size ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.size ? <p className='text-danger'>{errorMsg.size}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="">Description</label>
                                <textarea  ref={refdiv} name="description" onChange={getInputData} className='form-control border-3 border-primary ' rows={5}></textarea>
                            </div>

                            <div className='row'>
                                <div className='col-md-4 mb-3'>
                                    <label for="pic">Image*</label>
                                    <input type="file" name='pic' multiple onChange={getInputData} className={`form-control border-3 ${show && errorMsg.pic ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.pic ? <p className='text-danger'>{errorMsg.pic}</p> : null}

                                </div>
                                <div className="col-md-4 mb-3">
                                    <label >Stock Quantity*</label>
                                    <input type="number" name='stockQuantity' onChange={getInputData} placeholder='Stock Quantity' className={`form-control border-3 ${show && errorMsg.stockQuantity ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.stockQuantity ? <p className='text-danger'>{errorMsg.stockQuantity}</p> : null}
                                </div>
                                <div className='col-md-4 mb-3'>
                                    <label for="active">Active</label>
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-primary' id="">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button type=" submit" className='btn btn-color text-light w-100' >Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}