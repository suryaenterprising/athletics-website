import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    // Only for normal users
    email: { 
      type: String, 
      unique: true, 
      sparse: true, 
      lowercase: true, 
      trim: true 
    },
    // Only for admins
    adminId: { 
      type: String, 
      unique: true, 
      sparse: true, 
      lowercase: true,  // normalize for matching
      trim: true 
    },
    passwordHash: { 
      type: String, 
      required: true 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true
    }
  },
  { timestamps: true }
);

// Custom validation to require either email or adminId
userSchema.pre('validate', function (next) {
  if (!this.email && !this.adminId) {
    this.invalidate('email', 'Either email or adminId is required.');
    this.invalidate('adminId', 'Either email or adminId is required.');
  }
  next();
});

// Instance method to check password validity
userSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Virtual field for setting plain-text password
userSchema.virtual('password')
  .set(function (password) {
// Pre-save hook to ensure hashing if passwordHash was overwritten accidentally
userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash') && this.passwordHash && !this.passwordHash.startsWith('$2b$')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});
  });

// Pre-save hook to ensure hashing if passwordHash was overwritten accidentally
userSchema.pre('save', async function (next) {
  if (this.isModified('passwordHash') && !this.passwordHash.startsWith('$2b$')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }
  next();
});

export default mongoose.model('User', userSchema);