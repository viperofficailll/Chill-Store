import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditItem() {
  const { id } = useParams(); // Get the item ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // Initialize with null
  });

  // Fetch item details
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/seller/items/${id}`);
        const fetchedItem = response.data.product;
        setFormData({
          name: fetchedItem.name,
          description: fetchedItem.description,
          price: fetchedItem.price,
          image: null, // Keep image null since the user may not update it
        });
      } catch (err) {
        console.error("Error fetching item details:", err);
        setError("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSave = async () => {
    try {
      const updateData = new FormData();
      updateData.append("name", formData.name);
      updateData.append("description", formData.description);
      updateData.append("price", formData.price);
      if (formData.image) {
        updateData.append("image", formData.image); // Only append the image if it exists
      }

      // Replace ':id' with the actual ID
      const response = await axios.put(
        `/api/v1/seller/items/${id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      alert(response.data.message);
      navigate('/dashboard'); // Redirect to the dashboard after success
    } catch (err) {
      console.error("Error updating item:", err);
      alert("Failed to update the item.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      <div className="bg-gray-200 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-teal-500 text-white font-bold py-2 rounded hover:bg-teal-400"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditItem;
