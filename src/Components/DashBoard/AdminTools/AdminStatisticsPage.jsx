import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import UseTrProduct from "../../../Hooks/UseTrProduct";
import axiosSecure from "../../../Hooks/axiosSecure";

const AdminStatisticsPage = () => {
    const axiosSecurity = axiosSecure()

    const [allProduct, refetch] = UseTrProduct()
    const pendingProducts = allProduct.filter(pr => pr?.Status == 'pending')
    const acceptedProducts = allProduct.filter(pr => pr?.Status != 'pending')
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)


    // Fetch data from the backend
    useEffect(() => {
        // ---------for user
        axiosSecurity.get('/users')
            .then(res => setTotalUsers(res.data))

        // ----------for review
        axiosSecurity.get('/reviews')
            .then(res => setTotalReviews(res.data))
    }, []);

    const COLORS = ["#4CAF50", "#FF9800", "#2196F3", "#E91E63", "#9C27B0"];

    const chartData = [
        { name: "Accepted Products", value: acceptedProducts.length },
        { name: "Pending Products", value: pendingProducts.length },
        { name: "Total Reviews", value: totalReviews.length },
        { name: "Total Users", value: totalUsers.length },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Statistics</h1>

            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-xl font-semibold mb-4 text-blue-500">
                    Website Overview
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center">
                    {/* Pie Chart */}
                    <PieChart width={400} height={500}>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>

                    {/* Statistics Summary */}
                    <div className="w-full lg:w-1/2 bg-blue-50 shadow-md rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-blue-700">
                            Statistics Summary
                        </h3>
                        <p className=" font-medium text-gray-700">
                            🛒 Total Products:{" "}
                            <span className="font-bold text-blue-600">
                                {allProduct.length}
                            </span>
                        </p>
                        <p className=" font-medium text-gray-700">
                            ✅ Accepted Products:{" "}
                            <span className="font-bold text-green-600">
                                {acceptedProducts.length}
                            </span>
                        </p>
                        <p className=" font-medium text-gray-700">
                            ⏳ Pending Products:{" "}
                            <span className="font-bold text-yellow-500">
                                {pendingProducts.length}
                            </span>
                        </p>
                        <p className=" font-medium text-gray-700">
                            📝 Total Reviews:{" "}
                            <span className="font-bold text-pink-600">
                                {totalReviews.length}
                            </span>
                        </p>
                        <p className=" font-medium text-gray-700">
                            👥 Total Users:{" "}
                            <span className="font-bold text-purple-600">
                                {totalUsers.length}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStatisticsPage;
