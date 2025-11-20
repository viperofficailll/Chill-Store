import PropTypes from "prop-types";

function Card({ title, description, image, price }) {
  return (
    <div className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Product Image */}
      <img src={image} alt={title} className="w-full h-56 object-cover" />

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
        <button className="px-4 py-2 bg-teal-400 text-black rounded-full font-semibold hover:bg-teal-300 transition">
          View Details
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full font-semibold hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 bg-gray-900">
        <h3
          className="text-lg font-semibold text-white mb-1 truncate"
          title={title}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-2 line-clamp-2">{description}</p>
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-500 text-black font-bold rounded-full text-sm">
          NPR {price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
