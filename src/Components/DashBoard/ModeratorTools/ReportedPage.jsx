import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import axiosSecure from "../../../Hooks/axiosSecure";

const ReportedContentsPage = () => {
    const navigate = useNavigate();
    const axiosSecurity = axiosSecure()

    const [reportedProducts, setReportedProducts] = useState([])
    const [Ee, setEe] = useState(false)

    useEffect(() => {
        axiosSecurity.get('/reports')
            .then(res => setReportedProducts(res.data))
    }, [Ee])

    const handleReportRemove = (productId) => {
        axiosSecurity.delete(`/reports/${productId}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    setEe(!Ee)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            })
    };

    const handleDelete = (productId, id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecurity.delete(`/products/${productId}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            handleReportRemove(id)
                        }
                    })
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Reported Contents
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left p-4 border border-gray-300">Product Name</th>
                                <th className="text-left p-4 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportedProducts.length > 0 ? (
                                reportedProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50">
                                        <td className="p-4 border border-gray-300">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={product.image}
                                                    alt={product?.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div>
                                                    <p className="font-semibold text-gray-800">{product?.name}</p>
                                                    <p className="text-sm text-gray-500">{product.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 border border-gray-300">
                                            <div className="flex flex-col gap-2 md:flex-row space-x-1 items-center text-xs">



                                                {/* View Details Button */}
                                                <Link to={`/products/${product.productId}`} className="btn btn-outline btn-xs btn-secondary "
                                                >
                                                    <button className="flex items-center gap-1">
                                                     View Details
                                                    </button>
                                                </Link>


                                                <button
                                                    onClick={() => handleReportRemove(product._id)}
                                                    className="btn btn-outline btn-xs btn-warning"
                                                >
                                                    Remove report
                                                </button>



                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleDelete(product.productId, product._id)}
                                                    className="btn btn-outline btn-xs btn-error"

                                                >
                                                     Remove Product
                                                </button>



                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center p-4 text-gray-500">
                                        No reported products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportedContentsPage;
