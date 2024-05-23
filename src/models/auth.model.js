const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ['student', 'mentor', 'examiner','admin'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Check password
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Create models for different user types
const Student = mongoose.model('Student', userSchema);
const Mentor = mongoose.model('Mentor', userSchema);
const Examiner = mongoose.model('Examiner', userSchema);
const Admin = mongoose.model('Admin', userSchema);

module.exports = {
  Student,
  Mentor,
  Examiner,
  Admin
};
