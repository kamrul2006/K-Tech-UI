import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";
import axiosSecure from "../../../Hooks/axiosSecure";
import KTechLoader from "../../FixdToAll/KLoader";

const AddProductPage = () => {
    const axiosSecurity = axiosSecure();

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [tags, setTags] = useState([]);
    const [productCount, setProductCount] = useState(0);
    // console.log(productCount)

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const res = await axiosSecurity.get(`/users-role/${user?.email}`);
                setUserRole(res.data.userRole);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user role:", error);
                setIsLoading(false);
            }
        };

        fetchUserRole();
    }, [user?.email]);

    // console.log(userRole)

    // Fetch product count
    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await axiosSecurity.get(`/products-count?email=${user?.email}`);
                setProductCount(response.data.count);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching product count:", error);
                setIsLoading(false);
            }
        };

        if (user?.email) fetchProductCount();
    }, [user?.email, axiosSecurity]);

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
            Status: "pending",
        };

        axiosSecurity.post("/products", productData)
            .then((res) => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Product added",
                        text: "This product has been submitted for review.",
                        icon: "success",
                    });
                    reset();
                    navigate("/dashboard/my-product");
                }
            });
    };

    // Show loading spinner while fetching product count
    if (isLoading) {
        return (
            <KTechLoader />
        );
    }

    // Restrict normal users if they already added a product
    if (!userRole?.isSubscribed && productCount >= 1) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
                    <h2 className="text-xl font-bold text-red-500">Limit Reached</h2>
                    <p className="mt-4 text-gray-700">
                        You have reached your limit of adding one product as a normal user.
                    </p>
                    <p className="mt-4 text-gray-700">
                        To add more products, consider purchasing a Membership Subscription.
                    </p>
                    <button
                        onClick={() => navigate("/dashboard/userHome")}
                        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition"
                    >
                        Purchase Membership
                    </button>
                </div>
            </div>
        );
    }

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

                {/* Tags */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
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
;
