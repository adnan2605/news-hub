import React, { useEffect } from 'react';
import Breadcrum from '../../../Components/Breadcrum';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';

import $ from 'jquery'
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux';

export default function AdminProduct() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData();
        }
    }

    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length) {
            var time = setTimeout(() => {
                $('#myTable').DataTable()
            }, 500);
            return time
        }
    }

    useEffect(() => {
        let time = getAPIData();
        return () => clearTimeout(time)
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
                        <h5 className='btn-color w-100 p-2 text-light text-center'>
                            Product
                            <Link to="/admin/product/create">
                                <i className='fa fa-plus text-light float-end'></i>
                            </Link>
                        </h5>
                        <div className="table-responsive">
                            <table id="myTable" className='table table-bordered table-striped table-hover'>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Maincategory</th>
                                        <th>Subcategory</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Base Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Stock</th>
                                        <th>Stock Quantity</th>
                                        <th>Image</th>
                                        <th>Active</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ProductStateData.map(item => {
                                            return <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.maincategory}</td>
                                                <td>{item.subcategory}</td>
                                                <td>{item.brand}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>&#8377;{item.basePrice}</td>
                                                <td>{item.discount}%</td>
                                                <td>&#8377;{item.finalPrice}</td>
                                                <td>{item.stock ? "Yes" : "NO"}</td>
                                                <td>{item.stockQuantity}</td>
                                                <td>
                                                    <div className='product-img'>
                                                        {
                                                            item.pic.map((pic) => {
                                                                return <Link to={`${process.env.REACT_APP_BACKEND_SERVER}${pic}`} target='_blank'>
                                                                    <img className='me-3 mb-2' src={`${process.env.REACT_APP_BACKEND_SERVER}${pic}`} height={80} width={80} alt="" />
                                                                </Link>
                                                            })
                                                        }
                                                    </div>
                                                </td>
                                                <td>{item.active ? "Yes" : "No"}</td>
                                                <td>
                                                    <Link to={`/admin/product/update/${item.id}`} className='btn btn-primary'>
                                                        <i className='fa fa-edit'></i>
                                                    </Link>
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
