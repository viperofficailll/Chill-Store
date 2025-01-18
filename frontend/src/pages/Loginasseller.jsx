import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";  // Import axios
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
  // Import useNavigate for routing

function Loginasseller() {
  const navigate = useNavigate(); // Initialize navigate function
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Simple validation
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/v1/seller/login", formData); // Post request to login endpoint
      console.log(response); // Log response for debugging

      if (response.status === 200) {
         toast.success("Registration successful!", { autoClose: 3000 });
                setTimeout(() => navigate("/dashboard"), 3000);
        // Successful login, redirect to dashboard
        
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status outside the 2xx range
        if (error.response.status === 400) {
          toast.error("Invalid email or password.", { autoClose: 3000 });
        } else {
          toast.error(`Error: ${error.response.data.message || "An error occurred."}`, { autoClose: 3000 });
        }
      } else if (error.request) {
        // No response received from the server
        toast.error("No response from server. Please try again later.", { autoClose: 3000 });
      } else {
        // Error occurred while setting up the request
        toast.error(`Error: ${error.message}`, { autoClose: 3000 });
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/login.png')", // Background image from the public folder
      }}
    >
      {/* Animated Title */}
      <motion.h2
        className="text-5xl font-extrabold text-white text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Login
      </motion.h2>

      {/* Animated Form */}
      <motion.div
        className="bg-black bg-opacity-70 p-8 rounded-lg shadow-lg max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Login
          </motion.button>
        </form>
      </motion.div>
      <ToastContainer />
    </section>
    
  );
}

export default Loginasseller;
