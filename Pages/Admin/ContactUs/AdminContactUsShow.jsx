import React, { useEffect, useState } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';



import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactusActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';

export default function AdminContactUsShow() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()

    function deleteRecord() {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteContactUs({ id: id }))
            navigate('/admin/contactus')
        }
    }
    function updateRecord() {
        if (window.confirm("Are you sure to update Record?")) {
            let item = ContactUsStateData.find(x => x.id === id)
            dispatch(updateContactUs({ ...item, active: !item.active }))
            getAPIData();
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            let item = ContactUsStateData.find(x => x.id === id)
            if (item) {
                setData(item)
            }
            else
                navigate('/admin/contactus')
        }
    }

    useEffect(() => {
        getAPIData();

    }, [ContactUsStateData.length]);

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
                            ContactUs

                        </h5>
                        <div className="table-responsive">
                            <table className='table table-bordered table-striped table-hover'>

                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{data.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{data.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{data.phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Subject</th>
                                        <td>{data.subject}</td>
                                    </tr>
                                    <tr>
                                        <th>Message</th>
                                        <td>{data.message}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.date).toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <th>Active</th>
                                        <td>{data.active ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.active ?
                                                    <button className='btn btn-primary w-100' onClick={updateRecord}>Update</button> :
                                                    <button className='btn btn-danger w-100' onClick={deleteRecord}>Delete</button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
