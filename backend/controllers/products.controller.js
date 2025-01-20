import { Product } from "../models/product.model.js";

export const getallproducts = async(req,res )=>{
    try {
        const products = await Product.find(); // Fetch all products from the database
        return res.status(200).json({ products }); // Return the products in the response
      } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({ error: "Failed to fetch products" }); // Handle error
      }

}