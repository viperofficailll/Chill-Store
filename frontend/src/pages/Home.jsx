import { useState, useEffect } from "react";
import axios from "axios";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]); // Array to hold products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        const response = await axios.get("/api/v1/buyer/allitems");
        console.log("Fetched data:", response.data); // Log the response for debugging

        // Handle products based on API response structure
        if (response.data.products && Array.isArray(response.data.products)) {
          setProducts(response.data.products); // Assign products array
        } else {
          setError("Unexpected response format.");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        setError("Failed to load products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navabar />

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="flex flex-col items-center justify-center py-20">
          {/* Search Bar */}
          <div className="mb-12 w-3/4 max-w-lg">
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Loading and Error States */}
          {loading && <div className="text-white">Loading...</div>}
          {error && <div className="text-white">{error}</div>}

          {/* Display Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {products.length > 0 ? (
              filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    key={product._id} // Use _id as the unique key
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    image={`http://localhost:5000/api/${product.image.replace(
                      /\\/g,
                      "/"
                    )}`} // Fix image path for frontend
                  />
                ))
              ) : (
                <div className="text-white text-center col-span-full">
                  No results found.
                </div>
              )
            ) : (
              !loading && (
                <div className="text-white text-center col-span-full">
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
