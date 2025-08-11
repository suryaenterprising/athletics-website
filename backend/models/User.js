import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true, 
    sparse: true, 
    lowercase: true, 
    trim: true 
  }, // only for normal users
  adminId: { 
    type: String, 
    unique: true, 
    sparse: true, 
    trim: true 
  }, // only for admin
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true
  }
}, { timestamps: true });

// Instance method to check password
userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Optional: automatically hash if passwordHash is set as plain text accidentally
userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash') && !this.passwordHash.startsWith('$2b$')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

export default mongoose.model('User', userSchema);
