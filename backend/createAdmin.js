import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";  // Adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const adminId = "admin";        // your desired admin ID
    const password = "admin123";    // your desired password
    const role = "admin";

    // Check if admin already exists
    const existing = await User.findOne({ adminId, role });
    if (existing) {
      console.log("Admin user already exists.");
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new admin user
    const adminUser = new User({
      adminId,
      passwordHash,
      role,
    });

    await adminUser.save();
    console.log(`Admin user created: ID=${adminId}, password=${password}`);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error creating admin user:", error);
    mongoose.disconnect();
  }
}

createAdmin();
