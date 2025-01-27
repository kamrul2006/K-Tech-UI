import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import UpVoteButton from "./UpVoteButton";
import { Bounce, Slide, Zoom } from "react-awesome-reveal";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = 6; // Number of cards per page

    // Fetch products from the backend
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `https://k-tech-server.vercel.app/api/products?search=${search}&page=${currentPage}&limit=${itemsPerPage}`
            );
            setProducts(response.data.products.filter(pr => pr?.Status != 'pending'));
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Handle search input
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    // Fetch products when the page or search term changes
    useEffect(() => {
        fetchProducts();
    }, [currentPage, search]);

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Page Title and Description */}
                <div className="mb-8 text-center">
                    <Bounce>
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">
                            Explore All Products on K-Tech
                        </h1></Bounce>
                    <Bounce>
                        <p className="text-gray-600 md:px-24 font-semibold">
                            Discover cutting-edge technology products designed to elevate your lifestyle
                            and enhance your productivity. From innovative gadgets to smart solutions,
                            find the perfect product to match your needs. Browse, vote, and explore the
                            best of K-Tech!
                        </p>
                    </Bounce>
                </div>

                {/* Search Bar */}
                <Slide>
                    <div className="mb-6">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search products..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </Slide>
                {/* Product Cards */}
                <div className=" min-h-screen">


                    {products.length < 1 ? <div
                        className="text-5xl text-blue-700 flex items-center justify-center min-h-[300px]">
                        <p>  No match product found.</p>
                    </div> :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <Zoom>
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow-md overflow-hidden"
                                    >
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <Link to={`/products/${product._id}`}>
                                                <h3
                                                    className=" font-medium text-blue-600 cursor-pointer hover:text-green-600 hover:font-bold mb-4 flex items-center gap-2"
                                                >
                                                    {product.productName} <FiExternalLink className="text-gray-400" />
                                                </h3>
                                            </Link>

                                            {product.tags.map((tag, index) => (
                                                <span key={index} className="bg-gray-200 text-gray-600 p-1 rounded-full text-xs ml-2 my-4">
                                                    {tag}
                                                </span>
                                            ))}

                                            <p className="text-gray-400 text-sm mt-2 font-bold">
                                                {product.description}
                                            </p>

                                            {/* ---------buttons----------- */}
                                            <div className="flex justify-end mr-4" >
                                                {/* -----like------ */}
                                                <UpVoteButton product={product} />
                                            </div>

                                        </div>
                                    </div>
                                </Zoom>
                            ))}
                        </div>

                    }


                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm ${currentPage === 1 && "cursor-not-allowed opacity-50"
                            }`}
                    >
                        <BiLeftArrow />
                    </button>

                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm ${currentPage === totalPages && "cursor-not-allowed opacity-50"
                            }`}
                    >
                        <BiRightArrow />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
