import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navabar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/v1/buyer/profile"); // No authorization required
        setUser(response.data.message); // Set the user data
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    alert("Edit profile functionality will be implemented soon!");
  };

  const handleLogout = () => {
    navigate('/')
    
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/profile.png')" }}
      >
        <div className="flex flex-col items-start justify-start py-20 px-8">
          {/* Profile Header */}
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-teal-500"
            />
            <h1 className="text-2xl font-semibold text-white">
              {user?.username || "John Doe"}
            </h1>
            <p className="text-gray-400">{user?.email || "johndoe@example.com"}</p>
          </div>

          {/* Profile Details */}
          <div className="bg-gray-800 bg-opacity-90 mt-8 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Details</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <strong>Username:</strong> {user?.username}
              </li>
              <li className="mb-2">
                <strong>Email:</strong> {user?.email}
              </li>
              <li className="mb-2">
                <strong>Role:</strong> {user?.role}
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> {user?.phone || "N/A"}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;
