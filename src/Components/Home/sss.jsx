import React, { useEffect, useState } from 'react';
import { FcLike, } from 'react-icons/fc';
import { FiExternalLink } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';



const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null); // Mock user state (replace with real authentication)
    const [votes, setVotes] = useState({});

    // Fetch products from the backend (Express API)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/products'); // Adjust the API endpoint
                const data = await response.json();

                
                const sortedProducts = data.filter(d=> d.category=='featured');
                setProducts(sortedProducts.slice(0, 4)); // Show only the latest 4 products
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
        // Mock user authentication state (replace with real implementation)
        setUser({
            id: '123', // User ID
            username: 'JohnDoe',
        });
    }, []);

    // Handle upvote functionality
    const handleUpvote = (productId) => {
        if (!user) {
            navigate('/login'); // Redirect to login page if not logged in
            return;
        }

        if (votes[productId]) return; // Prevent voting more than once

        // Simulate updating the vote count
        setVotes((prevVotes) => ({
            ...prevVotes,
            [productId]: true, // Mark product as voted
        }));

        // Optional: Send upvote to backend
        fetch(`/api/products/${productId}/upvote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id }),
        }).catch((error) => console.error('Error upvoting:', error));

        // Update the vote count locally
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === productId
                    ? { ...product, votes: (product.votes || 0) + 1 }
                    : product
            )
        );
    };

    return (
        <section className="py-16 px-8 md:px-0 bg-gray-100 text-center">
            <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (

                    <div key={product._id}
                        className="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow">


                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-full h-48 md:h-40 object-cover rounded-md mb-4"
                        />
                        <hr />


                        <Link to={`/products/${product._id}`}>
                            <h3
                                className="text-base font-medium text-blue-600 cursor-pointer hover:text-green-600 hover:font-bold my-4 flex items-center gap-2"
                            >
                                {product.productName} <FiExternalLink className="text-gray-400" />
                            </h3>
                        </Link>

                        <div className="my-3 flex flex-wrap justify-center space-x-2 mb-4">
                            {product.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-800 py-1 px-2  rounded-full text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* ---------buttons----------- */}
                        <div className='flex justify-end'>
                            {/* -----like------ */}
                            <button
                                className={`btn btn-outline btn-sm w-fit`}
                                onClick={() => handleUpvote(product._id)}
                                disabled={!user || user.id === product.ownerId || votes[product._id]}
                            >
                                {product.voteCount || 0}
                                <span className="text-lg"><FcLike /></span>
                            </button>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
