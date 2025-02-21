import { useContext, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../Auth/Providers/AuthProvider";

export default function NewsletterSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext)

    const handleSubscribe = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-8 md:px-20 flex flex-col items-center w-full my-5 rounded-xl">
            <Fade>
                < h2
                    className="text-5xl font-extrabold text-center mb-6 drop-shadow-lg"
                >
                    Subscribe to Our Newsletter
                </ h2>
                <p className="text-lg text-center mb-8 max-w-2xl opacity-90">
                    Stay ahead with the latest news, exclusive offers, and updates from K-Tech. Sign up now and never miss a thing!
                </p>
                <div className="w-full max-w-lg flex flex-col md:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-fit px-5 py-4 rounded-lg text-blue-900 outline-none focus:ring-4 focus:ring-blue-300 shadow-xl "
                        defaultValue={user?.email}
                    />
                    <button
                        onClick={handleSubscribe}
                        className="bg-white text-blue-600 font-bold px-6 py-4 rounded-lg shadow-xl hover:bg-blue-200 transition duration-300 text-lg">
                        Subscribe
                    </button>

                </div>
            </Fade>
            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                        <Zoom duration={250}>
                            < div
                                className="bg-white text-blue-600 p-8 rounded-xl shadow-2xl text-center ">
                                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                                <h3 className="text-3xl font-bold mb-4">Congratulations! 🎉</h3>
                                <p className="text-lg mb-6">You have successfully subscribed to our newsletter.</p>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg">
                                    Close
                                </button>
                            </ div>
                        </Zoom>
                    </div>
                )
            }
        </div >
    );
}
