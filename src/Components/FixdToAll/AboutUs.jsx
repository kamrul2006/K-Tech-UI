import React from "react";
import { Link } from "react-router-dom";

const ttmm = [
    {
        name: "Kamrul Islam Apurba",
        role: "Founder & CEO",
        img: "https://i.ibb.co/7bHZFKf/my.png",
    },
    {
        name: "Jane Smith",
        role: "CTO",
        img: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
        name: "Mark Lee",
        role: "Designer",
        img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
        name: "Emma Brown",
        role: "Developer",
        img: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
        name: "Lucas White",
        role: "Marketing Lead",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
        name: "Sophia Green",
        role: "HR Manager",
        img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
]

const AboutUs = () => {
    return (
        <div className="bg-gray-50 text-gray-800 md:my-20">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center h-[60vh] md:h-[75vh] flex items-center justify-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')`,
                }}
            >
                <div className="bg-black bg-opacity-50 w-full h-full flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Welcome to K-Tech
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            At K-Tech, we innovate, inspire, and create cutting-edge technology solutions
                            to drive the future.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 px-6 md:px-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2">
                        <img
                            src="https://img.freepik.com/premium-vector/world-cloud-computing-network_63216-45.jpg?w=360"
                            alt="Mission"
                            className="rounded-lg shadow-lg w-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            At K-Tech, our mission is to deliver top-notch technology solutions that
                            empower businesses and individuals to achieve their goals. We are dedicated
                            to innovation, integrity, and creating meaningful impact in the tech world.
                        </p>
                        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
                            Join us in building a future where technology drives progress and success.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-blue-50 py-16 px-6 md:px-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-blue-600">
                        Meet Our Team
                    </h2>
                    <p className="text-lg text-gray-600 mt-2">
                        A passionate group of professionals committed to innovation and excellence.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ttmm.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 text-center"
                        >
                            <img
                                src={member.img}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-blue-500"
                            />
                            <h3 className="text-lg font-bold">{member.name}</h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-blue-800 mb-4 text-white py-5 md:py-16 px-6 md:px-16 md:rounded-2xl">
                <div className="text-center">
                    <h2 className="text-2xl md:text-4xl font-bold">Join K-Tech</h2>
                    <p className="md:text-lg text-gray-300 mt-4 max-w-2xl mx-auto">
                        Be part of our journey as we drive innovation and create a better future
                        through technology.
                    </p>

                    <Link to={'/contact'}>
                        <button className="mt-6 px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition">
                            Contact Us
                        </button>
                    </Link>

                </div>
            </section>
        </div>
    );
};

export default AboutUs;
