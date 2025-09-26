import React, { useEffect } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getUser, deleteUser } from "../../../Redux/ActionCreators/UserActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminUser() {
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteUser({ id: id }))
            getAPIData();
        }
    }

    function getAPIData() {
        dispatch(getUser())
        if (UserStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 300);
            return time
        }
    }

    useEffect(() => {
        let time = getAPIData();
        return () => clearTimeout(time)
    }, [UserStateData.length]);

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
                            User
                            {localStorage.getItem("role") === "Super Admin" ? <Link to="/admin/user/create">
                                <i className='fa fa-plus text-light float-end'></i>
                            </Link> : null}
                        </h5>
                        <div className="table-responsive">
                            <table id="myTable" className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>Active</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        UserStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.username}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.role}</td>

                                                <td>{item.active ? "Yes" : "No"}</td>
                                                <td>
                                                    {localStorage.getItem("role") === 'Super Admin' && item.role !== "Buyer" ?
                                                        <Link to={`/admin/user/update/${item.id}`} className='btn btn-primary'><i className='fa fa-edit'></i></Link>
                                                        : null
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        localStorage.getItem('role') === 'Super Admin' ? <button className='btn btn-danger' onClick={() => deleteRecord(item.id)}>
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
