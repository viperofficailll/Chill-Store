import jwt from "jsonwebtoken";
import  Seller  from "../models/seller.model.js";
import bcryptjs from "bcryptjs";
import {Product} from "../models/product.model.js";

export const handlesellerRegister = async (req, res) => {
  try {
    const role = "seller";
    const { username, email, password, phone } = req.body;
    console.log(req.body);

    // Check if seller with the same email already exists
    const match = await Seller.findOne({ email });
    if (match) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    console.log("Register");

    // Create a new user
    const newuser = await Seller.create({
      username,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Generate a JWT token
    const token = jwt.sign({ _id: newuser._id }, process.env.JWT_SECRET);

    // Send the token in the response as a cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // For production, use HTTPS
      })
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Failed to register" });
  }
};

// Placeholder for the unimplemented functions
export const handlesellerlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Seller.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcryptjs.compare(password, user.password); // Use 'await'
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send the token in a cookie and a success response
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};
export const sellergetprofile = () => {};
export const sellerlogout = () => {};
export const selleradditems = async (req, res) => {
  try {
    // Extract data from the request
    const { name, description, price, category } = req.body;

    // Check if a file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Create a new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: req.file.path, // The path of the uploaded image (set by Multer)
      seller: req.user.id, // Assuming the seller's ID is attached to req.user
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
