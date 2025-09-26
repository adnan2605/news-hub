import React, { useEffect } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';


import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactusActionCreators"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function AdminContactUs() {
    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteContactUs({ id: id }))
            getAPIData();
        }
    }
    function updateRecord(id) {
        if (window.confirm("Are you sure to update Record?")) {
            let item = ContactUsStateData.find(x => x.id === id)
            dispatch(updateContactUs({ ...item, active: !item.active }))
            getAPIData();
        }
    }

    function getAPIData() {
        dispatch(getContactUs())
        if (ContactUsStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 300);
            return time
        }
    }

    useEffect(() => {
        let time = getAPIData();
        return () => clearTimeout(time)
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
                            <table id="myTable" className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ContactUsStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.subject}</td>
                                                <td>{new Date(item.date).toLocaleString()}</td>
                                                <td onClick={() => updateRecord(item.id)} style={{ cursor: "pointer" }} >{item.active ? "Yes" : "No"}</td>
                                                <td><Link to={`/admin/contactus/show/${item.id}`} className='btn btn-primary'><i className='fa fa-eye '></i></Link></td>
                                                <td>
                                                    {localStorage.getItem('role') === "Super Admin" && item.active === false ?
                                                        <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}>
                                                            <i className="bi bi-trash"></i>
                                                        </button> : null
                                                    }
                                                </td>
                                            </tr>
                                        })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
