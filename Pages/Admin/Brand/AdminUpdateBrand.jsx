import { useEffect, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import { useDispatch, useSelector } from 'react-redux'
import { getBrand, updateBrand } from '../../../Redux/ActionCreators/BrandActionCreators'


export default function AdminUpdateBrand() {
    let { id } = useParams()
    let BrandStateData = useSelector(state => state.BrandStateData)
    console.log(BrandStateData)
    let dispatch = useDispatch()
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })
    let [errorMsg, setErrorMsg] = useState({
        name: '',
        pic: ''
    })

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "brand/" + e.target.files[0].name : e.target.value

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
        let error = Object.values(errorMsg).find((x) => x !== "")
        if (error)
            setShow(true)
        else {
            let item = BrandStateData.find(x => x.id !== id && x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMsg((old) => {
                    return {
                        ...old,
                        'name': 'Brand with same Name Already Exist'
                    }
                })
                return
            }
            dispatch(updateBrand({ ...data }))
            navigate("/admin/brand")
        }
    }

    useEffect(() => {
        dispatch(getBrand())
        if (BrandStateData.length) {
            setData(BrandStateData.find(x => x.id === id))
        }
    }, []);




    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='btn-color w-100 p-2 text-light text-center'>Brand<Link to="/admin/brand"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className='mb-3'>
                                <label for="name">Name*</label>
                                <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Brand Name' className={`form-control border-3 ${show && errorMsg.name ? 'border-danger' : "border-primary"}`} />
                                {show && errorMsg.name ? <p className='text-capitalize text-danger'>{errorMsg.name}</p> : null}
                            </div>

                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label for="pic">Image</label>
                                    <input type="file" name='pic' onChange={getInputData} className={`form-control border-3 ${show && errorMsg.pic ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.pic ? <p className=' text-danger'>{errorMsg.pic}</p> : null}

                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label for="active">Active</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary' id="">
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <button type=" submit" className='btn btn-color text-light w-100' >Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}