import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js"; // Adjust path if needed

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set in environment variables.");
  process.exit(1);
}

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminId = "admin";     // desired admin ID
    const password = "admin123"; // desired password
    const role = "admin";

    // Check if admin exists (case-insensitive adminId match)
    const existing = await User.findOne({ adminId: new RegExp(`^${adminId}$`, "i"), role });
    if (existing) {
      console.log("⚠  Admin user already exists.");
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new admin
    const adminUser = new User({
      adminId,
      passwordHash,
      role,
    });

    await adminUser.save();

    console.log(`✅ Admin user created:\n   ID=${adminId}\n   Password=${password}  <-- Change after first login`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 MongoDB connection closed");
  }
}

createAdmin();