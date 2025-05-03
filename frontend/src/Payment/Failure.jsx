import { Link } from "react-router-dom";

function Failure() {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="flex-grow flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/buyersignup.png')" }} // ✅ using /public
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 text-center px-8 py-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl max-w-md w-full">
          <h1 className="text-4xl font-bold mb-4 text-red-500">
            Payment Failed
          </h1>
          <p className="text-white text-lg mb-6">
            Unfortunately, your payment could not be processed. Please try again.
          </p>
          <Link to="/">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-full transition duration-200">
              Back to Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Failure;