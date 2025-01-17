import { motion } from "framer-motion";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";

function Help() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navabar />

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/profile.png')" }}
      >
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl font-semibold text-white text-center mb-8">
              Help
            </h1>
            <p className="text-lg text-white">
              Welcome to the help page! Here, you can find assistance with your
              account and more. If you have any questions, feel free to reach out
              to us. Our support team is always ready to help!
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Help;
