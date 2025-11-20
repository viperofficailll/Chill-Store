import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { itemsincart, noofitemsincart } from "../store/atom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentCartItems = useRecoilValue(itemsincart);
  const setItemsInCart = useSetRecoilState(itemsincart);
  const setNoOfItemsInCart = useSetRecoilState(noofitemsincart);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/v1/buyer/productdetails/${id}`);
        setProduct(response.data.product);
      } catch (err) {
        setError("Failed to fetch product details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    setItemsInCart([...currentCartItems, id]);
    setNoOfItemsInCart((prevCount) => prevCount + 1);
    console.log("Item added to cart:", id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4">
        {loading && <div className="text-gray-300 text-lg">Loading...</div>}
        {error && <div className="text-red-500 text-lg">{error}</div>}

        {!loading && !error && product && (
          <div className="bg-gray-800 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden transition-transform transform hover:scale-105">
            {/* Product Image */}
            <div className="md:w-1/2">
              <img
                src={`http://localhost:4000/${product.image.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={product.name}
                className="w-full h-80 object-cover md:h-full hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-400 mb-6 line-clamp-5">
                  {product.description}
                </p>
                <span className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-500 text-black font-bold rounded-full text-lg">
                  NPR {product.price.toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                className="bg-teal-500 text-black font-semibold rounded-lg px-6 py-3 hover:bg-teal-400 shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
