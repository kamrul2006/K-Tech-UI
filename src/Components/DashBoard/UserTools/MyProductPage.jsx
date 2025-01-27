import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useState, useEffect, useContext } from 'react';
import UseProduct from '../../../Hooks/UseProduct';
import { AuthContext } from '../../../Auth/Providers/AuthProvider';
import axiosSecure from '../../../Hooks/axiosSecure';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyProductsPage = () => {
    const { user } = useContext(AuthContext)
    const [allProduct, refetch] = UseProduct()
    const axiosSecurity = axiosSecure()

    const myProduct = allProduct.filter(pr => pr.productOwner.email == user?.email)



    // Handle Delete
    const handleDelete = (id) => {
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
                axiosSecurity.delete(`/products/${id}`)
                    .then(res => {
                        refetch()
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };




    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-semibold text-center mb-6">My Products</h1>


            {myProduct.length < 1 ?
                <div>
                    <img src='https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-illustration-download-in-svg-png-gif-file-formats--no-records-list-record-emply-data-user-interface-pack-design-development-illustrations-6430770.png?f=webp' className='mx-auto' />

                    <h1 className='text-center pb-10 text-2xl text-blue-700 font-bold'>No Product</h1>
                </div>
                :

                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Product Name</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Number of Votes</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">Actions</th>
                        </tr>
                    </thead>



                    <tbody>
                        {myProduct.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-600 border-b">{product.productName}</td>
                                <td className="py-3 px-4 text-sm text-gray-600 border-b">{product.voteCount}</td>

                                <td className="py-3 px-4 text-sm text-gray-600 border-b">
                                    <span
                                        className={`py-1 px-2 rounded-full text-xs ${product.Status == 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                                            }`}
                                    >
                                        {product.Status == 'pending' ? product?.Status : 'Granted'}
                                    </span>
                                </td>


                                <td className="py-3 px-4 border-b space-x-3">

                                    <div className='flex items-center gap-4'>
                                        <Link to={`/dashboard/update-product/${product._id}`}>
                                            <button
                                                className="text-blue-400 hover:text-blue-700"    >
                                                <FaPen />
                                            </button>
                                        </Link>

                                        <button
                                            className="text-red-400 hover:text-red-700 ml-3"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>

                                </td>

                            </tr>
                        ))}
                    </tbody>





                </table>}
        </div>
    );
};

export default MyProductsPage;
