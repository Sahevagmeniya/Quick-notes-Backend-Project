import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/notesData`);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection faild !!", "Error:", err.message);
    process.exit(1); //server ko terminate karata he
  }
};

export default connectDB;
