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
      console.log(itemsincart)
    
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="flex flex-col items-center justify-center py-20">
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-white">{error}</div>}
          {!loading && !error && product && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white max-w-3xl w-full">
              <img
                src={`http://localhost:4000/${product.image.replace(/\\/g, "/")}`}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-400 mb-4">{product.description}</p>
              <div className="text-lg font-semibold mb-6">
                Price: NPR. {product.price}
              </div>
              <button
                onClick={handleAddToCart}
                className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetails;
