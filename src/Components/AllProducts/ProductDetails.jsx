import React, { useState, useEffect, useContext } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth/Providers/AuthProvider";
import KTechLoader from "../FixdToAll/KLoader";
import { FcLike } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";
import UpVoteButton from "./UpVoteButton";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    //   const [product, setProduct] = useState([]);
    const product = useLoaderData()

    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({
        description: "",
        rating: 0,
    });

    // Fetch product and reviews
    useEffect(() => {
        fetch(`/api/reviews/${id}`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((error) => console.error("Error fetching reviews:", error));
    }, [id]);

    // console.log(product)


    // Handle report button functionality
    const handleReport = () => {
        if (!user) {
            toast.error("Please log in to report.");
            return;
        }

        fetch(`/api/products/${id}/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id }),
        })
            .then((res) => res.json())
            .then(() => toast.success("Product reported successfully!"))
            .catch((error) => console.error("Error reporting product:", error));
    };

    // Handle form submission for posting a review
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!reviewData.rating || !reviewData.description) {
            toast.error("All fields are required!");
            return;
        }

        fetch("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...reviewData,
                productId: id,
                reviewerName: user.name,
                reviewerImage: user.image,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Review posted successfully!");
                setReviewData({ description: "", rating: 0 });
                setReviews((prev) => [
                    ...prev,
                    {
                        ...reviewData,
                        reviewerName: user.name,
                        reviewerImage: user.image,
                    },
                ]);
            })
            .catch((error) => console.error("Error posting review:", error));
    };

    if (!product) return <div>
        <KTechLoader />
    </div>;

    return (
        <div className="container mx-auto p-4">
            {/* Product Details Section */}
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
                            href={product.externalLinks}
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
                                className="btn btn-outline btn-error btn-sm ml-3"
                            >
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white shadow rounded p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Reviews</h2>
                {reviews.length === 0 ? (
                    <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                ) : (
                    <div className="grid gap-4">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded shadow-sm flex items-start"
                            >
                                <img
                                    src={review.reviewerImage}
                                    alt={review.reviewerName}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="font-bold">{review.reviewerName}</h3>
                                    <p className="text-gray-700 mt-2">{review.description}</p>
                                    <div className="flex items-center mt-2">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Post Review Section */}
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
                            value={reviewData.description}
                            onChange={(e) =>
                                setReviewData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            className="w-full border px-4 py-2 rounded mt-1"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold">Rating</label>
                        <select
                            value={reviewData.rating}
                            onChange={(e) =>
                                setReviewData((prev) => ({
                                    ...prev,
                                    rating: parseInt(e.target.value, 10),
                                }))
                            }
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
