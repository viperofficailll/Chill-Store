import { motion } from "framer-motion";
import Navabar from "../components/Navabar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navabar />

      {/* Main Content */}
      <main
        className="flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      >
        <div className="flex flex-col items-center justify-center py-20 px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg max-w-4xl w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-3xl font-semibold text-white text-center mb-8">
              About Us
            </h1>
            <p className="text-lg text-white">
              Chill Store is your one-stop shop for the latest and greatest
              products. Our mission is to provide a seamless shopping experience
              with top-notch customer service. Our team works tirelessly to bring
              you the best deals and the most innovative products to suit your
              needs.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;
