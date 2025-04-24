import mongoose from "mongoose";
const buyerSchema = new mongoose.Schema({
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
    deliverylocation:{
        type: String,
        required:true

    },

    phone:{
        type: String,
        required: true,
        
    },
    password:{
        type: String,
        required: true,
        
    },
    
  
});

const  Buyer = mongoose.model("Buyer", buyerSchema);
export default Buyer;