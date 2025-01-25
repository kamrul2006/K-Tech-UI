import React from "react";
import { motion } from "framer-motion";

const KTechLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-100">
            <motion.div
                className="relative w-32 h-32 flex items-center justify-center"
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                }}
            >

                {/* Rotating Outer Ring */}
                <motion.div
                    className="absolute border-t-4 border-red-500 rounded-full w-full h-full"
                    animate={{
                        rotate: [0, 360],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                    }}
                ></motion.div>

                {/* Rotating Outer Ring */}
                <motion.div
                    className="absolute border-t-4 border-blue-500 rounded-full w-full h-full"
                    animate={{
                        rotate: [0, -360],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                    }}
                ></motion.div>

                {/* Pulsing Inner Circle */}
                <motion.div
                    className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-red-500"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                    }}
                ></motion.div>

                {/* K_Tech Text */}
                <motion.div
                    className="absolute text-xl font-bold text-black"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                >
                    K-Tech
                </motion.div>
            </motion.div>
        </div>
    );
};

export default KTechLoader;
