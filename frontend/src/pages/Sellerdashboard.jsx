import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "axios";
function SellerDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("/api/v1/seller/allitems");
        setItems(response.data.items || []);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items.");
      } finally {
        setLoadingItems(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/seller/orders");
        setOrders(response.data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchItems();
    fetchOrders();
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

  // Logout function to clear cookies and redirect to the home page
  const handleLogout = () => {
    // Clear the cookie (adjust the cookie name if it's different)
    document.cookie = "token=; Max-Age=0; path=/"; // Clears the cookie
    
    // Redirect to the homepage
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar with Logout Button */}
      <div className="flex justify-between items-center py-4 px-8">
        <h1 className="text-3xl font-semibold text-white">Seller Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow bg-cover bg-center" style={{ backgroundImage: "url('/profile.png')" }}>
        <div className="flex flex-col items-center justify-center py-20 px-8">
          {/* Seller Info */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
            <h1 className="text-3xl font-semibold text-white text-center mb-4">Welcome, Seller</h1>
            <p className="text-lg text-white text-center mb-4">Manage your store, add items for sale, and view your current inventory.</p>
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
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full mb-8">
            <h2 className="text-3xl font-semibold text-white text-center mb-8">Your Vault (Items to be Sold)</h2>
            {loadingItems ? (
              <p className="text-center text-white">Loading items...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : items.length === 0 ? (
              <p className="text-center text-white">No items found. Start adding some!</p>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item._id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="text-xl text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">{item.description}</p>
                      <p className="text-lg text-teal-400">NPR {item.price}</p>
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

          {/* Orders and Payments Received */}
<div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full">
  <h2 className="text-3xl font-semibold text-white text-center mb-8">Your Orders & Payments</h2>
  {loadingOrders ? (
    <p className="text-center text-white">Loading orders...</p>
  ) : error ? (
    <p className="text-center text-red-500">{error}</p>
  ) : orders.length === 0 ? (
    <p className="text-center text-white">No orders found.</p>
  ) : (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order._id} className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-xl text-white">Order ID: {order._id}</h3>
          <p className="text-sm text-gray-400">Payment Method: {order.paymentMethod}</p>
          <p className="text-sm text-gray-400">Total Amount: NPR {order.totalAmount}</p>
          <p className="text-sm text-gray-400">Status: {order.orderStatus}</p>

          {/* Buyer's Details */}
          <div className="mt-4">
            <h4 className="text-lg text-white mb-2">Buyer Details:</h4>
            <p className="text-sm text-gray-400">Name: {order.buyer?.username}</p>
            <p className="text-sm text-gray-400">Email: {order.buyer?.email}</p>
            <p className="text-sm text-gray-400">Phone: {order.buyer?.phone}</p>
            <p className="text-sm text-gray-400">Location: {order.buyer?.deliverylocation}</p>
          </div>

          {/* Items in this Order */}
          <div className="mt-4">
            <h4 className="text-lg text-white">Items in this Order:</h4>
            <ul>
              {order.items.map((item) => (
                <li key={item._id} className="text-white">
                  <p>{item.product?.name} - {item.quantity} x NPR {item.price}</p>
                </li>
              ))}
            </ul>
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
