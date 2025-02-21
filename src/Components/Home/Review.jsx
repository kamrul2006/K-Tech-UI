import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const reviews = [
  {
    name: "Jhankhar Mahbub",
    rating: 5,
    comment: "Outstanding service! K-Tech never disappoints.",
  },
  {
    name: "Michael Lee",
    rating: 4,
    comment: "Great experience, just a few minor issues.",
  },
  {
    name: "Sophia Green",
    rating: 5,
    comment: "Highly recommended! Excellent support and quality.",
  },
  {
    name: "Daniel White",
    rating: 5,
    comment: "Fantastic experience! Will definitely use again.",
  },
  {
    name: "Emily Johnson",
    rating: 4,
    comment: "Very good service, but a bit pricey.",
  },
  {
    name: "Chris Wilson",
    rating: 5,
    comment: "Superb quality and amazing customer service!",
  }
];

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 2 : prevIndex - 2));
  };

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= reviews.length - 2 ? 0 : prevIndex + 2));
  };

  return (
    <div className="bg-blue-50 text-blue-900 py-16 px-8 md:px-20 flex flex-col items-center w-full">
      <h2 className="text-4xl font-bold text-center mb-10 border-b-4 border-blue-400 pb-4">What Our Customers Say</h2>
      <div className="relative w-full max-w-6xl flex items-center">
        <button onClick={prevReview} className="text-blue-500 hover:text-blue-700 absolute left-0 md:left-8">
          <FaChevronLeft size={40} />
        </button>
        <div className="w-full flex justify-center gap-6 overflow-hidden">
          {reviews.slice(currentIndex, currentIndex + 2).map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl text-center w-full max-w-md">
              <h3 className="md:text-2xl font-semibold text-blue-700">{review.name}</h3>
              <div className="flex justify-center my-3">
                {Array(review.rating).fill().map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-blue-600 italic text-xs md:text-base">"{review.comment}"</p>
            </div>
          ))}
        </div>
        <button onClick={nextReview} className="text-blue-500 hover:text-blue-700 absolute right-0 md:right-8">
          <FaChevronRight size={40} />
        </button>
      </div>
    </div>
  );
}
