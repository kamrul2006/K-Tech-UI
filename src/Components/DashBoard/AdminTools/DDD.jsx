import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axiosSecure from "../../../Hooks/axiosSecure";
import { Slide } from "react-awesome-reveal";

const ManageCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState(null);

    const [EE, setEE] = useState(false)
    const axiosSecurity = axiosSecure()

    // Fetch coupons from the server
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                axiosSecurity.get("/coupons")
                    .then(res => setCoupons(res.data))

            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };
        fetchCoupons();
    }, [EE]);

    // Add new coupon
    const onSubmit = async (data) => {

        // console.log(data)
        axiosSecurity.post("/coupons", data)
            .then((res) => {
                if (res.data.insertedId) {
                    setEE(!EE)
                    Swal.fire({
                        title: "Product added",
                        text: "This product has been submitted for review.",
                        icon: "success",
                    });
                    reset();
                }
            });
    };

    // Handle delete coupon
    const handleDelete = async (id) => {
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
                axiosSecurity.delete(`/coupons/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            setEE(!EE)

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

    // Open modal with coupon data to edit
    const openModal = (coupon) => {
        setSelectedCoupon(coupon);
        reset({
            couponCode: coupon.couponCode,
            // expiryDate: new Date(coupon.expiryDate).toLocaleDateString(),
            expiryDate: coupon.expiryDate,
            description: coupon.description,
            discountAmount: coupon.discountAmount,
        });
        setModalIsOpen(true);
    };

    // Close modal
    const closeModal = () => {
        reset({
            couponCode: null,
            expiryDate: null,
            description: null,
            discountAmount: null
        });
        setModalIsOpen(false);

    };

    // Update coupon
    const handleUpdate = async (data) => {

        // console.log(data, selectedCoupon._id)

        axiosSecurity.patch(`/coupons/${selectedCoupon._id}`, data)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    closeModal();
                    setEE(!EE)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Coupon is Updated.`,
                        showConfirmButton: false,
                        timer: 2000
                    });

                }
            })
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-8">
            <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-10">
                🎟️ Manage Coupons
            </h1>

            <div className="flex flex-col md:justify-center lg:flex-row gap-8 md:gap-4">
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
                <div className="w-full lg:w-2/3 border-2 p-2 bg-gray-200 rounded-lg">


                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Current Coupons
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coupons.map((coupon) => (
                            <Slide direction="right">
                                <div
                                    key={coupon._id}
                                    className="bg-white shadow-md rounded-lg p-4 space-y-3"
                                >


                                    <h3 className="text-lg font-bold text-gray-800">
                                        {coupon.couponCode}
                                    </h3>

                                    <hr />

                                    <p className="text-sm text-gray-600">
                                        <strong>Expiry Date:</strong> <br /> {new Date(coupon.expiryDate).toLocaleDateString()}
                                    </p>

                                    <hr />

                                    <p className="text-sm text-gray-600">
                                        <strong>Description:</strong> {coupon.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <strong>Discount:</strong> ${coupon.discountAmount}
                                    </p>
                                    <div className="flex justify-between gap-4">
                                        <button
                                            onClick={() => openModal(coupon)}
                                            className="btn btn-sm btn-info btn-outline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="btn btn-sm btn-error btn-outline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Slide>
                        ))}
                    </div>

                </div>

            </div>

            {/* Modal for Coupon Edit */}
            {modalIsOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-bold mb-4">Update Coupon</h2>

                        <form onSubmit={handleSubmit(handleUpdate)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium">Coupon Code</label>
                                <input
                                    type="text"
                                    {...register("couponCode", { required: "Coupon Code is required" })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={selectedCoupon?.couponCode}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Expiry Date</label>
                                <input
                                    type="date"
                                    {...register("expiryDate", { required: "Expiry Date is required" })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={selectedCoupon?.expiryDate}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={selectedCoupon?.description}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium">Discount Amount</label>
                                <input
                                    type="number"
                                    {...register("discountAmount", { required: "Discount Amount is required" })}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    defaultValue={selectedCoupon?.discountAmount}
                                />
                            </div>

                            <div className="flex justify-between gap-4">
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
                                >
                                    Update Coupon
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="w-full bg-gray-500 text-white py-2 rounded-md font-semibold hover:bg-gray-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCoupon;
