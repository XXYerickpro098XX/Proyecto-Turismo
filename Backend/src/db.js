// backend/src/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB Atlas conectado");
  } catch (error) {
    console.error("❌ Error al conectar MongoDB Atlas:", error.message);
    process.exit(1);
  }
};
