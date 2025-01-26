import PropTypes from "prop-types";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";

function Cart({ cartItems = [], setCartItems }) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    setCartItems([]); // Clear all items in the cart
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navabar />

      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/cart.png')" }}
      >
        <div className="py-20 px-8">
          <h1 className="text-3xl font-semibold text-center text-white mb-8">
            Your Cart
          </h1>

          {cartItems.length > 0 ? (
            <>
              <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-white"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-md mr-4"
                        />
                        <div>
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <p className="text-sm text-gray-400">
                            Price: ₹{item.price}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg text-gray-300">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-lg text-teal-400">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex justify-between items-center bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h2 className="text-xl font-semibold text-white">Total</h2>
                <p className="text-xl text-teal-400">
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button className="px-6 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition">
                  Checkout
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


Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Cart;
