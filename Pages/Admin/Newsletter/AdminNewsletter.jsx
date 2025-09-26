import React, { useEffect } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';


import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminNewsletter() {
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData();
        }
    }
    function updateRecord(id) {
        if (window.confirm("Are you sure to update Record?")) {
            let item=NewsletterStateData.find(x=>x.id===id)
            dispatch(updateNewsletter({ ...item, active:!item.active }))
            getAPIData();
        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 300);
            return time
        }
    }

    useEffect(() => {
        let time = getAPIData();
        return () => clearTimeout(time)
    }, [NewsletterStateData.length]);

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
                            Newsletter

                        </h5>
                        <div className="table-responsive">
                            <table id="myTable" className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        NewsletterStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td onClick={()=>updateRecord(item.id)} style={{cursor: "pointer"}} >{item.active ? "Yes" : "No"}</td>
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
