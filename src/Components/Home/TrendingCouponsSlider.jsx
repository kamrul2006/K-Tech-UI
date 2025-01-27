import React, { useEffect, useState } from "react";
import axiosSecure from "../../Hooks/axiosSecure";
import SubscribeButton from "../FixdToAll/SubscribeButton";
import { Flip, Hinge } from "react-awesome-reveal";

const TrendingCouponsSlider = () => {
    const [coupons, setCoupons] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const axiosSecurity = axiosSecure()


    // Fetch valid coupons (example endpoint)
    useEffect(() => {
        const fetchCoupons = async () => {
            try {

                axiosSecurity.get('/coupons')
                    .then(res => {
                        const validCoupons = res.data.filter(
                            (coupon) => new Date(coupon.expiryDate) > new Date()
                        );
                        setCoupons(validCoupons);
                    })

            } catch (error) {
                console.error("Error fetching coupons:", error);
            }
        };
        fetchCoupons();
    }, []);

    // Handle next and previous buttons
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % coupons.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + coupons.length) % coupons.length);
    };

    if (!coupons.length)
        return (
            <p className="text-center text-gray-500">No coupons available right now.</p>
        );

    return (
        <div className="my-5 md:my-10 lg:w-1/2 mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
                🎉 Trending Coupons
            </h2>

            <div className="relative overflow-hidden w-full">
                {/* Slider Content */}
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {coupons.map((coupon, i) => (

                        <div
                            key={coupon._id}
                            className="min-w-full flex-shrink-0 p-6 bg-white shadow-md rounded-lg flex flex-col items-center text-center space-y-4 md:space-y-6"
                        >
                            <Flip>
                                <h3 className="text-lg md:text-xl font-semibold text-blue-600 border-b-4 pb-3 w-full border-dotted">
                                    {coupon.couponCode}
                                </h3>

                                <p className="text-sm md:text-base text-gray-600">
                                    <strong>Discount:</strong> ${coupon.discountAmount}
                                </p>
                                <p className="text-sm md:text-base text-gray-600">
                                    <strong>Expires On:</strong>{" "}
                                    {new Date(coupon.expiryDate).toLocaleDateString()}
                                </p>
                                <p className="text-xs md:text-sm text-gray-500">
                                    {coupon.description}
                                </p>

                                <SubscribeButton amount={coupon.discountAmount} />
                            </Flip>
                        </div>

                    ))}
                </div>

                {/* Controls */}
                <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                >
                    ‹
                </button>
                <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
                >
                    ›
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="mt-4 flex justify-center space-x-2">
                {coupons.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-400"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TrendingCouponsSlider;
