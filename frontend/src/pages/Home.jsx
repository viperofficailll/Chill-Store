import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/v1/buyer/allitems");

        if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setError("Unexpected response format.");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name && product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <Navabar />

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
      
      >
        <div className="flex flex-col items-center py-20 px-4">
          {/* Search Bar */}
          <div className="mb-16 w-full max-w-lg relative">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-4 rounded-3xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-lg transition-all duration-300"
            />
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="text-gray-300 text-lg">Loading products...</div>
          )}
          {error && <div className="text-red-500 text-lg">{error}</div>}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    to={`/productdetails/${product._id}`}
                    key={product._id}
                    className="transform hover:scale-105 transition-transform duration-300"
                  >
                    <Card
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      image={`http://localhost:4000/${product.image.replace(
                        /\\/g,
                        "/"
                      )}`}
                      className="hover:shadow-2xl"
                    />
                  </Link>
                ))
              ) : (
                <div className="text-gray-400 text-center col-span-full text-xl">
                  No results found.
                </div>
              )
            ) : (
              !loading && (
                <div className="text-gray-400 text-center col-span-full text-xl">
                  No products available.
                </div>
              )
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
