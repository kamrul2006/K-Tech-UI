import { useContext, useState } from "react";
import { FaCheckCircle, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../Auth/Providers/AuthProvider";

const UserProfilePage = () => {
    const { user } = useContext(AuthContext)

    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubscribe = () => {
        setIsModalOpen(true);
    };

    const handlePaymentSuccess = () => {
        setIsSubscribed(true);
        setIsModalOpen(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white">

                <div className="flex flex-col items-center">

                    {user?.photoURL ? <img src={user?.photoURL} alt={user?.displayName} className="w-20 rounded-full border-2 border-blue-600" /> :
                        <FaUserCircle size={80} className="text-gray-400 mb-4" />}

                    <h1 className="text-2xl font-bold">{user?.displayName}</h1>
                </div>


                <div className="mt-4 space-y-4 text-center">
                    <p className="text-gray-600">Email: {user?.email}</p>

                    {!isSubscribed ? (
                        <button
                            onClick={handleSubscribe}
                            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                        >
                            $9.99 - Subscribe Now
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-green-500 font-semibold">
                            <FaCheckCircle />
                            <span>Status: Verified</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
                        <h2 className="text-lg font-bold mb-4">Complete Your Payment</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handlePaymentSuccess();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Card Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                />
                            </div>
                            <div className="mb-4 flex gap-2">
                                <input
                                    type="text"
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    placeholder="MM/YY"
                                    required
                                />
                                <input
                                    type="text"
                                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                                    placeholder="CVC"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                Pay $9.99
                            </button>
                            <button
                                type="button"
                                className="w-full mt-2 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfilePage;
