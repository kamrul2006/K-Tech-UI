import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../Auth/Providers/AuthProvider";
import KTechLoader from "../FixdToAll/KLoader";
import { FcLike } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";
import UpVoteButton from "./UpVoteButton";
import axiosSecure from "../../Hooks/axiosSecure";
import Swal from "sweetalert2";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const product = useLoaderData()

    const axiosSecurity = axiosSecure()

    const [eff, setEff] = useState(true)
    const [reviews, setReviews] = useState([]);

    // Fetch product and reviews
    useEffect(() => {
        fetch(`http://localhost:5000/reviews`)
            .then((res) => res.json())
            .then((data) => {
                const rev = data.filter(d => d.productId == id)
                setReviews(rev)
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, [id, eff]);


    // Handle report button functionality
    const handleReport = () => {

        const reportInfo = {
            productId: id,
            name: product.productName,
            image: product.productImage,
            description: product.description
        }

        Swal.fire({
            title: "Are you sure want to report?",
            text: "you are reporting this product.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reported it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecurity.post('/reports', reportInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Reported !",
                                text: "This product has been reported.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    };

    // Handle form submission for posting a review
    const handleSubmitReview = (e) => {
        e.preventDefault();

        const name = user?.displayName
        const image = user?.photoURL
        const description = e.target.des.value
        const rating = e.target.rat.value

        const reviewData = {
            productId: id,
            name,
            image,
            description,
            rating
        }

        axiosSecurity.post('/reviews', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your review has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                setEff(!eff)
            })


        // console.log(reviewData)
    };

    if (!product) return <div>
        <KTechLoader />
    </div>;

    return (
        <div className="container mx-auto p-4">

            {/* ------------Product Details Section --------------*/}
            <div className="bg-white shadow rounded p-6 mb-8">
                <div className="flex flex-col md:flex-row items-start">
                    <img
                        src={product.productImage}
                        alt={product.productName}
                        className="w-full md:w-1/3 rounded-lg"
                    />
                    <div className="ml-0 md:ml-8 mt-4 md:mt-0">
                        <h1 className="text-2xl font-bold">{product.productName}</h1>
                        <p className="text-gray-700 mt-4">{product.description}</p>
                        <div className="flex flex-wrap mt-4">
                            {product.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <a
                            href={product?.externalLinks ? product.externalLinks : product?.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mt-4 text-xs flex items-center gap-2"
                        >
                            Visit External Link
                            <FiExternalLink className="text-gray-400" />
                        </a>
                        <div className="flex items-center mt-4">

                            <UpVoteButton product={product} />

                            <button
                                onClick={handleReport}
                                disabled={!user}
                                className="btn btn-outline btn-error btn-sm ml-3"
                            >
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ------------------Reviews Section -------------------------*/}
            <div className="bg-white shadow rounded p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded shadow-sm flex items-start"
                            >
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-bold">{review.name}</h3>

                                    <p className="text-gray-700 mt-2 text-xs p-1 border rounded bg-gray-50 font-semibold">{review.description}</p>

                                    <div className="flex items-center gap-1 mt-2">
                                        <p className="">Ratings: {review.rating}</p>
                                        <FaStar className="text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* -------------------Post Review Section ---------------------*/}
            <div className="bg-white shadow rounded p-6">
                <h2 className="text-xl font-bold mb-4">Post a Review</h2>
                <form onSubmit={handleSubmitReview}>
                    {/* --name------- */}
                    <div className="mb-4 flex items-center gap-3 text-xs">
                        <label className=" text-gray-700">Reviewer Name :</label>
                        <input
                            disabled
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="md:w-3/4 border px-2 py-1 rounded mt-1 font-semibold text-gray-400"
                        />
                    </div>

                    {/* --email------ */}
                    <div className="mb-4 flex items-center gap-3 text-xs">
                        <label className=" text-gray-700">Reviewer Email :</label>
                        <input
                            disabled
                            type="text"
                            value={user?.email}
                            readOnly
                            className="md:w-3/4 border px-2 py-1 rounded mt-1 font-semibold text-gray-400"
                        />
                    </div>

                    {/* --image----- */}
                    <div className="mb-4 flex items-center gap-3 text-xs">
                        <label className=" text-gray-700">Reviewer Image :</label>
                        <input
                            disabled
                            type="text"
                            value={user?.photoURL}
                            readOnly
                            className="md:w-3/4  border px-2 py-1 rounded mt-1 font-semibold text-gray-400"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block font-semibold text-gray-700">Review Description</label>
                        <textarea
                            id="des"
                            className="w-full border px-4 py-2 rounded mt-1"
                            rows="4"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Rating</label>
                        <select
                            id="rat"
                            className="w-full border px-4 py-2 rounded mt-1"
                            required
                        >
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button
                        disabled={!user}
                        type="submit"
                        className="btn btn-success btn-outline btn-sm px-5"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div >
    );
};

export default ProductDetailsPage;
