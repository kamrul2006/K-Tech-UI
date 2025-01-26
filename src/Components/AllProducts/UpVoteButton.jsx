import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Auth/Providers/AuthProvider';
import { FcLike } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import UseProduct from '../../Hooks/UseProduct';
import axiosSecure from '../../Hooks/axiosSecure';

const UpVoteButton = ({ product }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosSecurity = axiosSecure()

    const [, refetch] = UseProduct()
    const [votes, setVotes] = useState({});


    // Handle upvote functionality
    const handleUpvote = (id) => {
        if (!user) {
            navigate('/login'); // Redirect to login page if not logged in
            return;
        }

        if (votes[id]) {
            refetch()
            return;
        } // Prevent voting more than once

        // Simulate updating the vote count
        setVotes((prevVotes) => ({
            ...prevVotes,
            [id]: true,
        }));

        // Send upvote to backend
        axiosSecurity.patch(`/products/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                }
            });
    };

    return (
        <div>
            {/* -----like------ */}
            <button
                className={`btn btn-outline btn-sm w-fit`}
                onClick={() => handleUpvote(product._id)}
                disabled={!user || product.productOwner.email == user.email || votes[product._id]}
            >
                {product.voteCount || 0}
                <span className="text-lg"><FcLike /></span>
            </button>
        </div>
    );
};

export default UpVoteButton;