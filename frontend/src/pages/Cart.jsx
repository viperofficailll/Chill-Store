import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import axios from "axios";
import { itemsincart, noofitemsincart } from "../store/atom";

function Cart() {
  const [cartItemIds, setCartItemIds] = useRecoilState(itemsincart);
  const [noOfItemsInCart, setNoOfItemsInCart] = useRecoilState(noofitemsincart);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const quantityMap = {};
        cartItemIds.forEach((id) => {
          quantityMap[id] = (quantityMap[id] || 0) + 1;
        });

        const uniqueIds = [...new Set(cartItemIds)];
        const items = [];

        for (let id of uniqueIds) {
          const res = await axios.get(`/api/v1/buyer/productdetails/${id}`);
          items.push({ ...res.data.product, quantity: quantityMap[id] });
        }

        setCartItems(items);
        setNoOfItemsInCart(cartItemIds.length);  // Update the number of items in the cart
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cartItemIds.length > 0) {
      fetchCartItems();
    } else {
      setCartItems([]);
      setLoading(false);
      setNoOfItemsInCart(0);  // Ensure count is reset when cart is empty
    }
  }, [cartItemIds, setNoOfItemsInCart]);

  const handleRemoveOneQuantity = (idToRemove) => {
    const index = cartItemIds.indexOf(idToRemove);
    if (index !== -1) {
      const updated = [...cartItemIds];
      updated.splice(index, 1);
      setCartItemIds(updated);
      setNoOfItemsInCart(updated.length);  // Update the number of items in the cart after removal
    }
  };

  const handleClearCart = () => {
    setCartItemIds([]);
    setNoOfItemsInCart(0);  // Reset the number of items when clearing the cart
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/cart.png')" }}
      >
        <div className="py-20 px-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-8">
            Your Cart
          </h1>

          {loading ? (
            <div className="text-white text-center">Loading cart...</div>
          ) : cartItems.length > 0 ? (
            <>
              <ul className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl mx-auto space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center text-white"
                  >
                    <div className="flex items-center">
                      <img
                        src={`http://localhost:5000/api/${item.image.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt={item.name}
                        className="w-12 h-12 rounded-md mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">{item.name}</h2>
                        <p className="text-sm text-gray-400">
                          Price: NPR. {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-lg text-gray-300">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-lg text-teal-400">
                        NPR. {(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveOneQuantity(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex justify-between items-center bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-white">Total</h2>
                <p className="text-xl text-teal-400">
                  NPR. {totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button className="px-6 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition">
                  Pay with Esewa
                </button>
                <button
                  onClick={handleClearCart}
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition"
                >
                  Clear Cart
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-white mt-20">
              Your cart is empty.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cart;
