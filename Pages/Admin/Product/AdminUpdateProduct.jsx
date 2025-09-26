import React, { useEffect, useRef, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, updateProduct } from '../../../Redux/ActionCreators/ProductActionCreators'
import { getMaincategory } from '../../../Redux/ActionCreators/MaincategoryActionCreators'
import { getSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreators'
import { computeHeadingLevel } from '@testing-library/dom'



let rte;
export default function AdminUpdateProduct() {
    let refdiv = useRef(null);
    let { id } = useParams()
    let [flag,setFlag]=useState(false)

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
    let [errorMsg, setErrorMsg] = useState({
        name: '',
        color: '',
        size: '',
        basePrice: '',
        discount: '',
        stockQuantity: '',
        pic: ''
    })

    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let dispatch = useDispatch()


    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value

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

    async function postData(e) {
        e.preventDefault()
        let bp = parseInt(data.basePrice)
        let d = parseInt(data.discount)
        let fp = parseInt(bp - bp * d / 100)
        let stockQuantity = parseInt(data.stockQuantity)
        let error = Object.values(errorMsg).find((x) => x !== "")
        if (error)
            setShow(true)
        else {

            let item = ProductStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMsg((old) => {
                    return {
                        ...old,
                        'name': 'Product with same Name Already Exist'
                    }
                })
                return
            }
            dispatch(updateProduct({
                ...data,
                basePrice: bp,
                discount: d,
                finalPrice: fp,
                stockQuantity: stockQuantity,
                maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
                subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                brand: data.brand ? data.brand : BrandStateData[0].name,
                description: rte.getHTMLCode()
            }))
            navigate("/admin/product")
        }
    }



    useEffect(() => {
        (() => {
            dispatch(getMaincategory())
        })()
    }, [MaincategoryStateData.length]);
    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length]);
    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length]);


    useEffect(() => {
        dispatch(getProduct())
        if (ProductStateData.length) {
            let item = ProductStateData.find(x => x.id === id)
            setData({ ...item })
            rte = new window.RichTextEditor(refdiv.current);
            rte.setHTMLCode(item.description);
        }
    }, [ProductStateData.length]);



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
                                <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Product Name' className={`form-control border-3 ${show && errorMsg.name ? 'border-danger' : "border-primary"}`} />
                                {show && errorMsg.name ? <p className='text-danger'>{errorMsg.name}</p> : null}
                            </div>

                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label >Maincategory*</label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            MaincategoryStateData && MaincategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label >Subcategory*</label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            SubcategoryStateData && SubcategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div><div className="col-md-3 mb-3">
                                    <label >Brand*</label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-3 border-primary'>
                                        {
                                            BrandStateData && BrandStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div><div className="col-md-3 mb-3">
                                    <label>Stock*</label>
                                    <select name="stock" onChange={getInputData} value={data.stock} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label >Base Price*</label>
                                    <input type="number" name='basePrice' value={data.basePrice} onChange={getInputData} placeholder='Product Base' className={`form-control border-3 ${show && errorMsg.basePrice ? 'border-danger' : "border-primary"}`} />
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
                                    <input type="text" name='color' value={data.color} onChange={getInputData} placeholder='Product Color' className={`form-control border-3 ${show && errorMsg.color ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.color ? <p className='text-danger'>{errorMsg.color}</p> : null}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label >Size*</label>
                                    <input type="text" value={data.size} name='size' onChange={getInputData} placeholder='Product Size' className={`form-control border-3 ${show && errorMsg.size ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.size ? <p className='text-danger'>{errorMsg.size}</p> : null}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label for="">Description</label>
                                <textarea ref={refdiv} name="description" onChange={getInputData} className='form-control border-3 border-primary' rows={5}></textarea>
                            </div>

                            <div className='row'>

                                <div className="col-md-6 mb-3">
                                    <label >Stock Quantity*</label>
                                    <input type="number" name='stockQuantity' value={data.stockQuantity} onChange={getInputData} placeholder='Stock Quantity' className={`form-control border-3 ${show && errorMsg.stockQuantity ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.stockQuantity ? <p className='text-danger'>{errorMsg.stockQuantity}</p> : null}
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label for="active">Active</label>
                                    <select name="active" onChange={getInputData} value={data.active ? '1' : '0'} className='form-select border-3 border-primary' id="">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>


                            <div className="row">
                                <div className='col-md-6 mb-3'>
                                    <label for="pic">Image</label>
                                    <input type="file" name='pic' multiple onChange={getInputData} className={`form-control border-3 ${show && errorMsg.pic ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.pic ? <p className='text-danger'>{errorMsg.pic}</p> : null}
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label for="pic">Image(Click on Image to Delete)</label>
                                    <div>
                                        {
                                            data.pic?.map((item, index) => {
                                                return <img onClick={()=>{
                                                    data.pic.splice(index,1)
                                                    setFlag(!flag)
                                                    }}
                                                src={`${process.env.REACT_APP_BACKEND_SERVER}${item}`}  height={80} width={80} className='me-1 mb-1 ' alt="Product_Image" />
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type=" submit" className='btn btn-color text-light w-100' >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}