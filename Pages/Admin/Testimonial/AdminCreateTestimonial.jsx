import React, { useEffect, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'
import { useDispatch, useSelector } from 'react-redux'
import { createTestimonial, getTestimonial } from '../../../Redux/ActionCreators/TestimonialActionCreators'


export default function AdminCreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        pic: "",
        message: "",
        active: true
    })

    let [errorMsg, setErrorMsg] = useState(
        {
            name: 'Name Feild is Mendatory ',
            message: 'Message Feild is Mendatory ',
            pic: 'Image Feild is Mendatory '
        }
    )
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var name = e.target.name
        var value = e.target.files && e.target.files.length ? "testimonial/" + e.target.files[0].name : e.target.value

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
        e.preventDefault()
        let error = Object.values(errorMsg).find((x) => x !== "")
        if (error)
            setShow(true)

        else {
            let item = TestimonialStateData.find(x => x.name.toLowerCase() === data.name.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMsg((old) => {
                    return {
                        ...old,
                        'name': 'Testimonial with same Name Already Exist'
                    }
                })
                return
            }
            dispatch(createTestimonial({ ...data }))
            navigate("/admin/testimonial")
        }
    }

    useEffect(() => {
        (async () => {
            dispatch(getTestimonial())
        })()
    }, [TestimonialStateData.length]);


    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='btn-color w-100 p-2 text-light text-center'>Testimonial<Link to="/admin/testimonial"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className='mb-3'>
                                <label for="name">Name*</label>
                                <input type="text" name='name' onChange={getInputData} placeholder='Testimonial Name' className={`form-control border-3 ${show && errorMsg.name ? 'border-danger' : "border-primary"}`} />
                                {show && errorMsg.name ? <p className='text-danger '>{errorMsg.name}</p> : null}
                            </div>


                            <div className="mb-3">
                                <label >Message*</label>
                                <textarea name="message" onChange={getInputData} className={`form-control border-3 ${show && errorMsg.message?'border-danger' : "border-primary"}`} placeholder='Message...' rows={5} ></textarea>
                                {show && errorMsg.message ? <p className='text-danger '>{errorMsg.message}</p> : null}
                            </div>

                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label for="pic">Image*</label>
                                    <input type="file" name='pic' onChange={getInputData} className={`form-control border-3 ${show && errorMsg.pic ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.pic ? <p className='text-danger'>{errorMsg.pic}</p> : null}

                                </div>
                                <div className='col-md-6 mb-3'>
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