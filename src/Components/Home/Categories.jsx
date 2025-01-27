import React from "react";
import { BiCamera, BiLaptop } from "react-icons/bi";
import { CgSmartphone } from "react-icons/cg";
import { FaGamepad } from "react-icons/fa";
import { PiDrone, PiTelevision } from "react-icons/pi";

const Categories = () => {
  const categories = [
    {
      name: "Photography",
      icon: <BiCamera className="text-blue-500 w-10 h-10" />,
      description: "Explore cameras, drones, and photography gear.",
    },
    {
      name: "Smartphones",
      icon: <CgSmartphone className="text-green-500 w-10 h-10" />,
      description: "Find the latest smartphones and accessories.",
    },
    {
      name: "Gaming",
      icon: <FaGamepad className="text-purple-500 w-10 h-10" />,
      description: "Browse gaming consoles, accessories, and more.",
    },
    {
      name: "Drones",
      icon: <PiDrone className="text-red-500 w-10 h-10" />,
      description: "Discover high-quality drones for all purposes.",
    },
    {
      name: "TV & Audio",
      icon: <PiTelevision className="text-yellow-500 w-10 h-10" />,
      description: "Check out the latest TVs and audio systems.",
    },
    {
      name: "Laptops",
      icon: <BiLaptop className="text-indigo-500 w-10 h-10" />,
      description: "Shop for laptops, notebooks, and accessories.",
    },
  ];

  return (
    <section className="py-10 bg-gray-50 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Explore Categories</h2>
        <p className="text-gray-600 mb-8">
          Discover products from a variety of categories to suit your tech needs.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition border"
          >
            <div className="flex items-center gap-4 mb-4">
              {category.icon}
              <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
