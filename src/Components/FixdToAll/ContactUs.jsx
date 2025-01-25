import React, { useContext } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../../Auth/Providers/AuthProvider";

const ContactUs = () => {
const {user}=useContext(AuthContext)

    return (
        <div className="bg-gray-50 text-gray-800 md:my-20">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[50vh] md:h-[65vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
                }}
            >
                <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Get in Touch with K-Tech
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            We're here to answer your questions and assist with your tech needs. Let's connect!
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 px-6 md:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-500">
                        Contact Information
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Reach out to us through any of the following methods.
                    </p>
                </div>
                <div className="flex flex-wrap gap-10 justify-center">
                    <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-6 w-full sm:w-[300px]">
                        <FaPhoneAlt className="text-blue-500 text-2xl" />
                        <div>
                            <h3 className="text-lg font-bold">Phone</h3>
                            <p className="text-gray-600">+1 234 567 890</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-6 w-full sm:w-[300px]">
                        <FaEnvelope className="text-blue-500 text-2xl" />
                        <div>
                            <h3 className="text-lg font-bold">Email</h3>
                            <p className="text-gray-600">support@k-tech.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white shadow-lg rounded-lg p-6 w-full sm:w-[300px]">
                        <FaMapMarkerAlt className="text-blue-500 text-2xl" />
                        <div>
                            <h3 className="text-lg font-bold">Address</h3>
                            <p className="text-gray-600">123 Tech Street, Innovation City</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="bg-blue-50 py-16 px-6 md:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                        Send Us a Message
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        Have a question or feedback? Fill out the form below, and we'll get back to you.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                    <form className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <input
                                type="text"
                                placeholder="Your Name"
                                defaultValue={user?.displayName}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input
                                type="email"
                                defaultValue={user?.email}
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            rows="6"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="bg-blue-800 mb-4 text-white py-5 md:py-16 px-6 md:px-16 md:rounded-2xl">
                <div className="text-center">
                    <h2 className="text-2xl md:text-4xl font-bold">Follow Us</h2>
                    <p className="md:text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                        Stay updated with the latest news and innovations from K-Tech by following us
                        on social media.
                    </p>
                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-gray-100 text-3xl hover:text-white transition" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-400 text-3xl hover:text-blue-500 transition" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-pink-500 text-3xl hover:text-pink-600 transition" />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
