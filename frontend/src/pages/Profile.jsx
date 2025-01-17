import Navbar from "../components/Navabar";
import Footer from "../components/Footer";

function Profile() {
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
            <h1 className="text-2xl font-semibold text-white">John Doe</h1>
            <p className="text-gray-400">johndoe@example.com</p>
          </div>

          {/* Profile Details */}
          <div className="bg-gray-800 bg-opacity-90 mt-8 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-white mb-4">Profile Details</h2>
            <ul className="text-gray-400">
              <li className="mb-2">
                <strong>Username:</strong> JohnDoe
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> +123 456 7890
              </li>
              <li className="mb-2">
                <strong>Address:</strong> 123 Main St, Springfield
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="px-6 py-2 bg-teal-500 text-black font-semibold rounded-md hover:bg-teal-400 transition">
              Edit Profile
            </button>
            <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition">
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
