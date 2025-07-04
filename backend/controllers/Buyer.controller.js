import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
import {Product} from "../models/product.model.js";
import Buyer from "../models/buyer.model.js";
import Order from "../models/orders.model.js";



export const handlesignup = async (req, res) => {
    try {
      const role = "buyer";
      const { username, email, password, phone ,deliveryLocation} = req.body;
      console.log(req.body);
  
      // Check if Buyer with the same email already exists
      const match = await Buyer.findOne({ email });
      if (match) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcryptjs.hash(password, 10);
      console.log("Register");
  
      // Create a new user
      const newuser = await Buyer.create({
        username,
        email,
        password: hashedPassword,
        phone,
        role,
        deliverylocation:deliveryLocation,
      });
  
      // Generate a JWT token
      const token = jwt.sign({ _id: newuser._id }, process.env.JWT_SECRET);
  
      // Send the token in the response as a cookie
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // For production, use HTTPS
        })
        .status(200)
        .json({ success: true, message: "User created successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Failed to register" });
    }
  };
  export const handlebuyerlogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await Buyer.findOne({ email });
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
  export const buyerallitems = async (req, res) => {
    
  };
  
  export const profile = async (req, res) => {
    res.status(200).send({ success: true, message: req.user})
  }
  export const productdetails = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ product });
    } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).json({ message: "Failed to fetch product details" });
    }
  }


  export const orderhandeler = async (req, res) => {
    try {
      const buyer = req.user._id;
      const { items, totalAmount, paymentMethod } = req.body;
  
      // Basic input validation
      if (!buyer || !items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Fetch product data and build full items array
      const fullItems = await Promise.all(
        items.map(async (item, index) => {
          const productData = await Product.findById(item.product);
  
          if (!productData) {
            throw new Error(`Product with ID ${item.product} not found (item index: ${index})`);
          }
  
          if (!productData.seller) {
            throw new Error(`Seller not found for product ID ${item.product} (item index: ${index})`);
          }
  
          return {
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            seller: productData.seller, // ensure this is populated in your Product model!
          };
        })
      );
  
      // Create the order
      const order = await Order.create({
        buyer,
        items: fullItems,
        totalAmount,
        paymentMethod: paymentMethod || "Esewa",
      });
  
      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
      });
  
    } catch (error) {
      console.error("Order creation failed:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  };
  