import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // null, 'buyer', 'seller'

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950">
      {/* Chill Store Logo */}
      <motion.div
        className="absolute top-10 text-white bg-black bg-opacity-50 p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold tracking-wider text-center">
          Chill Store
        </h1>
      </motion.div>

      {/* Step 1: Choose Role */}
      {!role && (
        <motion.div
          className="flex flex-col md:flex-row gap-10 mt-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setRole("buyer")}
            whileHover={{ scale: 1.08 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-400 text-center">
              Buyer
            </h2>
            <p className="text-gray-300 text-center">
              Browse products, add to cart, and place orders easily.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 bg-opacity-90 backdrop-blur-md p-10 rounded-2xl shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setRole("seller")}
            whileHover={{ scale: 1.08 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-purple-400 text-center">
              Seller
            </h2>
            <p className="text-gray-300 text-center">
              Manage your inventory, add new products, and track orders.
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Step 2: Choose Login or Signup */}
      {role && (
        <motion.div
          className="flex flex-col md:flex-row gap-8 mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-black font-bold rounded-full shadow-xl hover:opacity-90 transition"
            onClick={() =>
              navigate(role === "buyer" ? "/buyersignup" : "/sellersignup")
            }
            whileHover={{ scale: 1.05 }}
          >
            Sign Up
          </motion.button>

          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold rounded-full shadow-xl hover:opacity-90 transition"
            onClick={() =>
              navigate(role === "buyer" ? "/buyerlogin" : "/loginseller")
            }
            whileHover={{ scale: 1.05 }}
          >
            Log In
          </motion.button>

          <motion.button
            className="px-6 py-3 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition"
            onClick={() => setRole(null)}
          >
            Back
          </motion.button>
        </motion.div>
      )}
    </section>
  );
};

export default First;
