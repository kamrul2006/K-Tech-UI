import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

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
                `http://localhost:5000/api/products?search=${search}&page=${currentPage}&limit=${itemsPerPage}`
            );
            setProducts(response.data.products);
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
                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
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
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {product.productName}
                                </h3>

                                {product.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 p-1 rounded-full text-xs ml-2">
                                        {tag}
                                    </span>
                                ))}

                                <p className="text-gray-600 text-sm mt-2">
                                    {product.description}
                                </p>


                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-blue-500 font-semibold">
                                        ${product.price ? product.price : 100}
                                    </span>
                                    <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center mt-8 space-x-4">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm ${currentPage === 1 && "cursor-not-allowed opacity-50"
                            }`}
                    >
                      <BiLeftArrow/>
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
                       <BiRightArrow/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
