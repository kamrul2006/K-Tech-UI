import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageCouponPage = () => {
    const [coupons, setCoupons] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch coupons from the server
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await fetch("/api/coupons"); // Replace with your backend endpoint
                const data = await response.json();
                setCoupons(data);
            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };
        fetchCoupons();
    }, []);

    // Add new coupon
    const onSubmit = async (data) => {
        try {
            const response = await fetch("/api/coupons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.insertedId) {
                Swal.fire("Success", "Coupon added successfully", "success");
                setCoupons([...coupons, { ...data, _id: result.insertedId }]);
                reset();
            }
        } catch (error) {
            console.error("Error adding coupon:", error);
            Swal.fire("Error", "Failed to add coupon", "error");
        }
    };

    // Delete a coupon
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/coupons/${id}`, { method: "DELETE" });
            if (response.ok) {
                Swal.fire("Deleted", "Coupon deleted successfully", "success");
                setCoupons(coupons.filter((coupon) => coupon._id !== id));
            }
        } catch (error) {
            console.error("Error deleting coupon:", error);
            Swal.fire("Error", "Failed to delete coupon", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-8">
            <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-10">
                🎟️ Manage Coupons
            </h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Coupon Add Form */}
                <div className="w-full lg:w-1/3 bg-white shadow-lg rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Add New Coupon
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Coupon Code */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Coupon Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("couponCode", { required: "Coupon Code is required" })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter coupon code"
                            />
                            {errors.couponCode && (
                                <p className="text-red-500 text-sm">{errors.couponCode.message}</p>
                            )}
                        </div>

                        {/* Expiry Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Expiry Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                {...register("expiryDate", { required: "Expiry Date is required" })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                            {errors.expiryDate && (
                                <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>
                            )}
                        </div>

                        {/* Coupon Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Coupon Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter coupon description"
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">{errors.description.message}</p>
                            )}
                        </div>

                        {/* Discount Amount */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Discount Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                {...register("discountAmount", { required: "Discount Amount is required" })}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Enter discount amount"
                            />
                            {errors.discountAmount && (
                                <p className="text-red-500 text-sm">{errors.discountAmount.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition"
                        >
                            Add Coupon
                        </button>
                    </form>
                </div>

                {/* Coupons List */}
                <div className="w-full lg:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Current Coupons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coupons.map((coupon) => (
                            <div
                                key={coupon._id}
                                className="bg-white shadow-md rounded-lg p-4 space-y-3"
                            >
                                <h3 className="text-lg font-bold text-gray-800">
                                    {coupon.couponCode}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Expiry Date:</strong> {new Date(coupon.expiryDate).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Description:</strong> {coupon.description}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Discount:</strong> ${coupon.discountAmount}
                                </p>
                                <button
                                    onClick={() => handleDelete(coupon._id)}
                                    className="w-full bg-red-500 text-white py-1.5 rounded-md font-medium hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageCouponPage;
