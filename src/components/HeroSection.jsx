import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <section className="w-full max-w-7xl mx-auto mb-4 h-auto sm:h-[40vh] flex flex-col justify-center items-center text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md p-6 relative overflow-hidden">
            
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-700 opacity-60"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 opacity-20 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 opacity-20 rounded-full"></div>

            {/* Heading */}
            <motion.h1 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                className="text-4xl lg:text-5xl font-extrabold tracking-wide leading-tight relative z-10">
                Welcome to the <span className="text-blue-600 dark:text-blue-400">Blog Platform</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg max-w-2xl text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
                Explore, create, and share your thoughts with the world. 
                Join a community of passionate writers and readers!
            </motion.p>

            <Link to="/login">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 relative z-10 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    Get Started 
                </motion.button>
            </Link>
        </section>
    );
};

export default HeroSection;
