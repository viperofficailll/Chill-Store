import  { useState } from "react";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Home() {
  const [search, setSearch] = useState("");

  const items = [
    { title: "Product 1", description: "Amazing product", image: "https://via.placeholder.com/300" },
    { title: "Product 2", description: "Don't miss this", image: "https://via.placeholder.com/300" },
    { title: "Product 3", description: "Top-notch quality", image: "https://via.placeholder.com/300" },
    { title: "Product 4", description: "Great value", image: "https://via.placeholder.com/300" },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
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

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {filteredItems.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            ))}
            {filteredItems.length === 0 && (
              <div className="text-white text-center col-span-full">
                No results found.
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

export default Home;
