import { motion } from "framer-motion";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";

function Contact() {
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
              Contact Us
            </h1>
            <p className="text-lg text-white">
              We would love to hear from you! If you have any questions,
              concerns, or feedback, dont hesitate to get in touch with us. Our
              team is available 24/7 to assist you with your needs.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
