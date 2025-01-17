
function Card() {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <img src='' className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">title</h3>
        <p className="text-sm text-gray-400">description</p>
      </div>
    </div>
  );
}

export default Card;
