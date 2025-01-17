import mongoose from "mongoose";
export const conn = async () => {
try {
    await  mongoose.connect(process.env.MONGO_URI, { dbName: "chillStore" })
    console.log("connected to mongodb");
  
    
} catch (error) {
    console.log('error connecting to mongodb')
}
};
