import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const First = () => {
  const navigate = useNavigate();
  return (
    <>
     <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg.png')", // Referencing the bg.png image in the public folder
      }}
    >
      {/* Chill Store Text (Top-right) with Dark Shade */}
      <motion.div
        className="absolute top-10 right-10 text-white bg-black bg-opacity-50 p-4 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Chill Store
        </h1>
      </motion.div>

      {/* Animated Buttons (Horizontal gap, Color Palette Adjustments) */}
      <div className="text-center mt-100 flex space-x-6">
        <motion.button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onClick={()=>navigate('/buyersignup')}>
          Sign Up as Buyer
        </motion.button>

        <motion.button
          className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={()=>navigate('/sellersignup')}
        >
          Sign Up as Seller
        </motion.button>

        <motion.button
          className="px-8 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={()=>navigate('/login')}
        >
          Log In
        </motion.button>
      </div>
    </section>

    </>
   
  );
};

export default First;
