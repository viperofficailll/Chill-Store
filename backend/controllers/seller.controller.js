import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import multer from "multer";
import Seller from "../models/seller.model.js";
import { Product } from "../models/product.model.js";

// Initialize multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Store uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the filename to current timestamp + original name
  },
});

const upload = multer({ storage });

// Seller registration handler
export const handlesellerRegister = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    console.log(req.body);

    // Check if seller with the same email already exists
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new seller user
    const newSeller = await Seller.create({
      username,
      email,
      password: hashedPassword,
      phone,
      role: "seller", // Seller role by default
    });

    // Generate JWT token
    const token = jwt.sign({ _id: newSeller._id }, process.env.JWT_SECRET);

    // Send the token in the response as a cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure cookies in production
      })
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register" });
  }
};

// Seller login handler
export const handlesellerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: "Seller not found" });
    }

    // Compare passwords
    const isMatch = await bcryptjs.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: seller._id }, process.env.JWT_SECRET);

    // Send the token in a cookie
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

// Placeholder functions (unimplemented)
export const sellergetprofile = (req, res) => {};
export const sellerlogout = (req, res) => {};

// Seller add product item handler
export const selleradditems = async (req, res) => {

  // Use multer's upload middleware to handle image uploads
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { name, description, price, category } = req.body;

      // Ensure an image file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Create a new product with the uploaded image
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        image: req.file.path, // Multer saves the file path here
        seller: req.user?.id, // Assuming seller info is attached to req.user
      });

      // Save the new product to the database
      await newProduct.save();

      // Send a success response with the new product
      res.status(201).json({
        message: "Product added successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
};
export const getSellerItems = async (req, res) => {
  try {
    const sellerId = req.user?.id; // Assuming the seller is authenticated
    const items = await Product.find({ seller: sellerId }); // Filter products by seller
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Failed to fetch items." });
  }
};
// Backend: Controller for deleting a product
export const delteproduct = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the route parameter
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // Assuming you are using Mongoose
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};






// Update product details handler
export const updateProduct = async (req, res) => {
  // Use multer's upload middleware to handle image uploads (if any)
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { id } = req.params; // Extract product ID from the route parameter

      if (!id) {
        return res.status(400).json({ message: "Product ID is required." });
      }

      const updates = req.body; // Extract updates from the request body

      // If there's a new image, update the image field
      if (req.file) {
        updates.image = req.file.path; // Save the image path in the updates object
      }

      // Ensure there are updates to apply
      if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({ message: "No updates provided." });
      }

      // Attempt to find and update the product
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
        new: true, // Return the updated document
        runValidators: true, // Ensure updates are validated against the schema
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      // Respond with the updated product
      res.status(200).json({
        message: "Product updated successfully.",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);

      // Handle specific error types, if needed
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid product ID format." });
      }

      res.status(500).json({ message: "Internal server error." });
    }
  });
};




export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the route parameter

    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    // Find the product in the database by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
