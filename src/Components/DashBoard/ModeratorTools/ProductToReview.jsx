import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import UseProduct from "../../../Hooks/UseProduct";
import KTechLoader from "../../FixdToAll/KLoader";
import axiosSecure from "../../../Hooks/axiosSecure";

const ProductReviewQueue = () => {
    const axiosSecurity = axiosSecure()

    const [allProduct, refetch] = UseProduct()
    const sortedProducts = allProduct.sort((a, b) => a.Status === "pending" ? -1 : b.Status === "pending" ? 1 : 0);

    // --------------Handle add----------------
    const handleAccept = async (productId) => {
        axiosSecurity.patch(`/a-products/${productId}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire("Accepted!", "The product is Granted.", "success");
                }
            });
    };

    // --------------Handle remove----------------

    const handleReject = async (productId) => {
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

    // --------------Handle featured----------------
    const handleMakeFeatured = async (productId) => {
        axiosSecurity.patch(`/f-products/${productId}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Featured!", "The product is now featured.", "info");
                    refetch()
                }
            });
    };

    if (allProduct.length < 1) {

        return (
            <KTechLoader />
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Product Review Queue</h2>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="p-3 border border-gray-300">Product Name</th>
                                <th className="p-3 border border-gray-300">Status</th>
                                <th className="p-3 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProduct.map((product) => (
                                <tr
                                    key={product._id}
                                    className="border border-gray-300 hover:bg-gray-50"
                                >
                                    <td className="p-3">{product.productName}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-md text-sm ${product?.Status == "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"

                                                }`}
                                        >
                                            {product.Status ? product.Status : 'Accepted'}
                                        </span>
                                    </td>



                                    <td className="p-3 flex flex-wrap gap-2">


                                        {/* View Details */}
                                        <Link to={`/products/${product._id}`}>
                                            <button
                                                className="btn btn-xs btn-info"
                                            >
                                                View Details
                                            </button>
                                        </Link>


                                        {/* Make Featured */}
                                        <button
                                            className="btn btn-xs btn-primary"
                                            onClick={() => handleMakeFeatured(product._id)}
                                        >
                                            Make Featured
                                        </button>

                                        {/* Accept */}
                                        <button
                                            className="btn btn-xs btn-success"
                                            onClick={() => handleAccept(product._id)}
                                            disabled={product.Status !== "pending"}
                                        >
                                            Accept
                                        </button>

                                        {/* Reject */}
                                        <button
                                            className="btn btn-xs btn-error"
                                            onClick={() => handleReject(product._id)}
                                            disabled={product.Status !== "pending"}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductReviewQueue;
