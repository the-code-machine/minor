const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for user profile information
const userProfileSchema = new Schema({
  userId: {
    type: String, // Change from ObjectId to String
    required: true,
    unique: true, // Ensures emails are unique
  },
  linkedinUrl: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  githubUrl: {
    type: String,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String, // URL or file reference
  },
  coverImage: {
    type: String, // URL or file reference
  },
  userType: {
    type: String, // URL or file reference
  },
  teamId: {
    type: String, // URL or file reference
  },
  mentorId: {
    type: String, // URL or file reference
  },
  projectId: {
    type: String, // URL or file reference
  },
  examinerId: {
    type: String, // URL or file reference
  },
  teamConfirmed: {
    type: Boolean,
    default: false,
  },
});

// Create the model
const UserProfile = mongoose.models.UserProfile|| mongoose.model('UserProfile', userProfileSchema);

export{ UserProfile};
