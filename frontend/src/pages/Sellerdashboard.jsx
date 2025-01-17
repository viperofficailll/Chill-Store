import { useState } from "react";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const navigate = useNavigate();

  // Sample items, in a real app, this would be fetched from an API
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Item 1",
      price: 20,
      description: "A description of item 1",
    },
    {
      id: 2,
      name: "Item 2",
      price: 30,
      description: "A description of item 2",
    },
    {
      id: 3,
      name: "Item 3",
      price: 50,
      description: "A description of item 3",
    },
  ]);

  const handleRemoveItem = (id) => {
    // Remove item logic here (e.g., API call to remove the item)
    setItems(items.filter(item => item.id !== id));
  };

  const handleEditItem = (id) => {
    // Navigate to the edit item page
    navigate(`/edit-item/${id}`);
  };


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navabar />

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
              onClick={()=>navigate('/additem')}
            >
              Add New Item
            </button>
          </div>

          {/* Vault (Seller's Items) */}
          <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full">
            <h2 className="text-3xl font-semibold text-white text-center mb-8">
              Your Vault (Items to be Sold)
            </h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
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
                      onClick={() => handleEditItem(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default SellerDashboard;
