import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';
import axiosSecure from '../../../Hooks/axiosSecure';
import Swal from 'sweetalert2';

const UpdateProductPage = () => {
    const navigate = useNavigate();

    const product = useLoaderData()
    // console.log(product)

    const axiosSecurity = axiosSecure()



    const handleSubmit = (e) => {
        e.preventDefault();

        const productName = e.target.productName.value
        const productImage = e.target.productImage.value
        const description = e.target.description.value
        const externalLink = e.target.externalLinks.value
        const timestamp = new Date()

        const updatedData = {
            productName,
            productImage,
            description,
            externalLink,
            timestamp
        }
        // console.log(updatedData)

        axiosSecurity.patch(`/up-products/${product._id}`, updatedData)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${productName} is Updated.`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/dashboard/my-product');
                }
            })


    };

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold text-center mb-6">Update Product</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4"
            >
                <div>
                    <label htmlFor="productName" className="block text-sm font-bold text-gray-700">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        defaultValue={product.productName}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="productImage" className="block text-sm font-bold text-gray-700">
                        Product Image URL
                    </label>
                    <input
                        type="text"
                        id="productImage"
                        defaultValue={product.productImage}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter product image URL"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-bold text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        defaultValue={product.description}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter product description"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="externalLinks" className="block text-sm font-bold text-gray-700">
                        External Links
                    </label>
                    <input
                        type="url"
                        id="externalLinks"
                        defaultValue={product.externalLink}

                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Enter external link"
                        required
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/my-products')}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductPage;
