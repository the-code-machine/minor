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
const Student = mongoose.models.Student || mongoose.model('Students', userSchema);
const Mentor = mongoose.models.Mentors|| mongoose.model('Mentors', userSchema);
const Examiner = mongoose.models.Examiners|| mongoose.model('Examiners', userSchema);
const Admin = mongoose.models.Admins ||mongoose.model('Admins', userSchema);

export { Student, Mentor, Examiner, Admin };
