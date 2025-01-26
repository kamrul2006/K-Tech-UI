import { Link, } from "react-router-dom";
import UpVoteButton from "./UpVoteButton";
import UseTrProduct from "../../Hooks/UseTrProduct";
import { FiExternalLink } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const TrendingProducts = () => {
    const [allProduct, refetch] = UseTrProduct()

    return (
        <section className="bg-white py-10 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-6">Trending Products</h2>
                <p className="text-center text-gray-600 mb-8 md:px-20 text-sm font-semibold">
                    Explore the most popular products loved by our community. These trending items are selected based on user votes and are a perfect blend of innovation, quality, and functionality. Discover your next favorite product today!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {allProduct.slice(0, 6).map((product) => (
                        <div
                            key={product._id}
                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />

                            <hr />

                            <Link to={`/products/${product._id}`}>
                                <h3
                                    className=" font-medium text-blue-600 cursor-pointer hover:text-green-600 hover:font-bold my-4 flex items-center gap-2"
                                >
                                    {product.productName} <FiExternalLink className="text-gray-400" />
                                </h3>
                            </Link>

                            <p className="text-gray-600 text-xs mb-3">{product.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {product.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 text-xs font-medium p-1 rounded-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-end items-center" onCanPlay={refetch()}>
                                <UpVoteButton product={product} refetch={refetch} />
                            </div>

                        </div>
                    ))}
                </div>

                <Link to={"/products"}>
                    <button
                        className="mt-8 w-fit mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-3 px-8 rounded-full flex items-center gap-3 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                        <span>Show All Products</span>
                        <FaArrowRight className="text-white w-5 h-5" />
                    </button>
                </Link>

            </div>
        </section>
    );
};

export default TrendingProducts;
