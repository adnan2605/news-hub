import React, { useEffect, useState } from 'react'
import Breadcrum from '../../../Components/Breadcrum'
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, getUser } from '../../../Redux/ActionCreators/UserActionCreators'


export default function AdminCreateUser() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin",
        password: '',
        cpassword: '',
        active: true
    })

    let [errorMsg, setErrorMsg] = useState(
        {
            name: 'Name Feild is Mendatory ',
            username: 'Username Feild is Mendatory ',
            email: 'Email Feild is Mendatory ',
            phone: 'Phone Number Feild is Mendatory ',
            password: 'Password Feild is Mendatory ',

        }
    )
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        var { name, value } = e.target

        setErrorMsg((old) => {
            return {
                ...old,
                [name]: FormValidator(e)
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
       if(data.password===data.cpassword){
        let error = Object.values(errorMsg).find((x) => x !== "")
        if (error)
            setShow(true)

        else {
            let item = UserStateData.find(x => x.username.toLowerCase() === data.username.toLowerCase() || x.email.toLowerCase() === data.email.toLowerCase())
            if (item) {
                setShow(true)
                setErrorMsg((old) => {
                    return {
                        ...old,
                        'username': item.username === data.username ? 'User with same Username Already Exist' : '',
                        'email': item.email === data.email ? 'User with same Email Already Exist' : ''
                    }
                })
                return
            }
            dispatch(createUser({ ...data }))
            navigate("/admin/user")
        }
       }
       else{
        setShow(true)
                setErrorMsg((old) => {
                    return {
                        ...old,
                        'password': 'Password and Confirm Password Does not Matched',
                       
                    }
                })
                return
       }
    }

    useEffect(() => {
           dispatch(getUser())
       }, [UserStateData.length])


    return (
        <>
            <Breadcrum title='Admin' />
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='btn-color w-100 p-2 text-light text-center'>User<Link to="/admin/user"><i className='fa fa-long-arrow-left text-light float-end'></i></Link></h5>

                        <form onSubmit={postData}>
                            <div className='row'>

                                <div className='col-md-6 mb-3'>
                                    <label for="name">Name*</label>
                                    <input type="text" name='name' onChange={getInputData} placeholder='Full Name' className={`form-control border-3 ${show && errorMsg.name ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.name ? <p className='text-danger'>{errorMsg.name}</p> : null}
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label for="name">Phone*</label>
                                    <input type="text" name='phone' onChange={getInputData} placeholder='Phone Number' className={`form-control border-3 ${show && errorMsg.phone ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.phone ? <p className='text-danger'>{errorMsg.phone}</p> : null}
                                </div>

                                <div className='col-md-6 mb-3'>
                                    <label for="name">Username*</label>
                                    <input type="text" name='username' onChange={getInputData} placeholder='Username' className={`form-control border-3 ${show && errorMsg.username ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.username ? <p className='text-danger'>{errorMsg.username}</p> : null}
                                </div>


                                <div className='col-md-6 mb-3'>
                                    <label for="name">Email*</label>
                                    <input type="text" name='email' onChange={getInputData} placeholder='Email Address' className={`form-control border-3 ${show && errorMsg.email ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.email ? <p className='text-danger'>{errorMsg.email}</p> : null}
                                </div>


                                <div className='col-md-6 mb-3'>
                                    <label for="name">Password*</label>
                                    <input type="password" name='password' onChange={getInputData} placeholder='Password' className={`form-control border-3 ${show && errorMsg.password ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.password ? <p className='text-danger'>{errorMsg.password}</p> : null}
                                </div>


                                <div className='col-md-6 mb-3'>
                                    <label for="name">Confirm Password*</label>
                                    <input type="password" name='cpassword' onChange={getInputData} placeholder='Confirm password' className={`form-control border-3 ${show && errorMsg.password ? 'border-danger' : "border-primary"}`} />
                                    {show && errorMsg.password ? <p className='text-danger'>{errorMsg.password}</p> : null}
                                </div>


                                <div className='col-md-6 mb-3'>
                                    <label for="active">Role*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-3 border-primary' id="">
                                        <option value="Admin">Admin</option>
                                        <option value="Super Admin">Super Admin</option>
                                    </select>
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