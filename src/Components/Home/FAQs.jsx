import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const FAQs = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is K-Tech?",
            answer: "K-Tech is a platform where users can share and vote on technology-related products, ideas, and innovations.",
        },
        {
            question: "How can I post a product?",
            answer: "Simply log in, go to your dashboard, and click 'Add Product'. Fill in the required details and submit for review.",
        },
        {
            question: "What are the benefits of a membership?",
            answer: "Membership removes the product upload limit and grants exclusive access to special features and deals.",
        },
        {
            question: "How are products reviewed?",
            answer: "Moderators review submitted products to ensure they meet our guidelines and approve or reject them accordingly.",
        },
        {
            question: "Can I update or delete my product after posting?",
            answer: "Yes, you can update or delete your product from your dashboard at any time.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-gray-50 py-10 px-4 md:px-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Frequently Asked Questions</h2>
                <p className="text-gray-600 mb-8">
                    Have questions? We've got answers! Check out some of the most common queries below.
                </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center px-4 py-3 bg-white text-gray-800 font-medium text-left focus:outline-none"
                        >
                            <span>{faq.question}</span>
                            {openIndex === index ? (
                                <BiChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                                <BiChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="px-4 py-3 bg-gray-100 text-gray-700">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQs;
