import { useState, useEffect } from "react";
import axios from "axios";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);  // Array to hold products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      
        try {
          const response = await axios.get("/api/v1/buyer/allitems");
          console.log("Fetched data:", response.data); // Log the full response for debugging
      
          // If the response is an object containing the products array
          if (Array.isArray(response.data)) {
            setProducts(response.data);
          } else if (response.data && response.data.products && Array.isArray(response.data.products)) {
            setProducts(response.data.products); // If products are inside a "products" field
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

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name && product.name.toLowerCase().includes(search.toLowerCase()) // Check if name exists
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navabar />

      {/* Main Content */}
      <main className="flex-grow bg-cover bg-center" style={{ backgroundImage: "url('/bg.png')" }}>
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

          {/* Display All Products Below Search Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {products.length > 0 ? (
              products.map((product) => (
                <Card
                  key={product._id}  // Use _id as key for better performance
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                  image={`http://localhost:5000/api/uploads/${product.image.replace(/\\/g, '/')}`} // Fixed image path for frontend
                />
              ))
            ) : (
              <div className="text-white text-center col-span-full">
                No products available.
              </div>
            )}
          </div>

          {/* Cards Section After Search Filter */}
          {search && (
            <div className="mt-8 w-full max-w-6xl px-4">
              <h2 className="text-white text-xl font-semibold mb-4">Search Results:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Card
                      key={product._id}  // Use _id as key for better performance
                      title={product.name}
                      description={product.description}
                      price={product.price}
                      category={product.category}
                      image={`http://localhost:5000/api/uploads/${product.image.replace(/\\/g, '/')}`} // Fixed image path for frontend
                    />
                  ))
                ) : (
                  <div className="text-white text-center col-span-full">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
