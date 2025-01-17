import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['seller', 'buyer'],
       
    },

    phone:{
        type: String,
        required: true,
        
    },
    password:{
        type: String,
        required: true,
        
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    ratings:{
        type: Number,
        default: 4,
        min: 1,
        max: 5
    }
});

 export const Seller = mongoose.model("Seller", sellerSchema);