import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

function SellerDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/v1/seller//allitems"); // Adjust the endpoint to match your backend
        setItems(response.data.items || []); // Assuming the items are in `response.data.items`
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      const response = await axios.delete(`/api/v1/seller/items/${id}`);
      alert(response.data.message); // Display success message
  
      // Update the local state to remove the deleted item
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      alert(err.response?.data?.message || "Failed to remove the item.");
    }
  };
  

  const handleEditItem = (id) => {
    navigate(`/edit-item/${id}`);
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
          {/* Seller Info */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
            <h1 className="text-3xl font-semibold text-white text-center mb-4">
              Welcome, Seller
            </h1>
            <p className="text-lg text-white text-center mb-4">
              Manage your store, add items for sale, and view your current inventory.
            </p>
          </div>

          {/* Add Item Button */}
          <div className="flex justify-center mb-8">
            <button
              className="px-6 py-3 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition"
              onClick={() => navigate("/additem")}
            >
              Add New Item
            </button>
          </div>

          {/* Vault (Seller's Items) */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-3xl font-semibold text-white text-center mb-8">
              Your Vault (Items to be Sold)
            </h2>
            {loading ? (
              <p className="text-center text-white">Loading items...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : items.length === 0 ? (
              <p className="text-center text-white">No items found. Start adding some!</p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                      <p className="text-lg text-teal-400">${item.price}</p>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition"
                        onClick={() => handleEditItem(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SellerDashboard;
