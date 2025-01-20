import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("image", imageFile);

    try {
      const response = await axios.post("/api/v1/seller/additems", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setImageFile(null);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error.response || error);
      alert(`Error: ${error.response?.data?.message || "Failed to add product."}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
     

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/profile.png')" }}
      >
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-3xl w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl font-semibold text-white text-center mb-8">
              Add a New Product
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                ></textarea>
              </div>

              {/* Price Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Image Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition"
                >
                  Add Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AddProduct;
