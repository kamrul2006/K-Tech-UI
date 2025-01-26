import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";
import axiosSecure from "../../../Hooks/axiosSecure";

const AddProductPage = () => {
    const axiosSecurity = axiosSecure()

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext)

    // Tag input handlers
    const handleDelete = (i) => setTags(tags.filter((_, index) => index !== i));
    const handleAddition = (tag) => setTags([...tags, tag]);


    const onSubmit = async (data) => {
        const productData = {
            ...data,
            tags: tags.map((tag) => tag.text),
            productOwner: {
                name: user?.displayName,
                image: user?.photoURL,
                email: user?.email,
            },
            timestamp: new Date(),
            voteCount: 0,
            Status: 'pending'
        };

        // console.log(productData)
        axiosSecurity.post('/products', productData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Product added",
                        text: "This product has been submitted for review.",
                        icon: "success"
                    });

                    navigate('/dashboard/my-product')
                }
            })


    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 md:py-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Add Product</h2>

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        {...register("productName", { required: "Product Name is required" })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product name"
                    />
                    {errors.productName && (
                        <p className="text-red-500 text-sm">{errors.productName.message}</p>
                    )}
                </div>

                {/* Product Image */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Product Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="url"
                        {...register("productImage", { required: "Product Image URL is required" })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product image URL"
                    />
                    {errors.productImage && (
                        <p className="text-red-500 text-sm">{errors.productImage.message}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product description"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                    )}
                </div>

                {/* Product Owner Info */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Product Owner Info</h3>
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.photoURL}
                            alt="Owner"
                            className="w-12 h-12 rounded-full border border-gray-300"
                        />
                        <div>
                            <p className="text-sm font-medium">Name: {user?.displayName}</p>
                            <p className="text-sm text-gray-600">Email: {user?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Tags
                    </label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        placeholder="Add a tag"
                        classNames={{
                            tags: "border border-gray-300 rounded-md p-2 w-full",
                            tagInput: "focus:outline-none",
                            tag: "inline-flex items-center bg-blue-100 text-blue-600 rounded px-2 py-1 mr-2",
                            remove: "ml-1 text-red-500 cursor-pointer",
                        }}
                    />
                </div>

                {/* External Links */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        External Links
                    </label>
                    <input
                        type="url"
                        {...register("externalLink")}
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter product website or landing page URL"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProductPage;
