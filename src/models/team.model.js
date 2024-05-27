const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the team schema
const teamSchema = new Schema({
  teamId: {
    type: String, // Unique team identifier
    required: true,
    unique: true, // Ensure unique team ID
  },
  leaderName: {
    type: String,
  
  },
  leaderId: {
    type: String,

  },
  mentorId: {
    type: String, // Optional ID for the mentor
  },
  examinerId: {
    type: String, // Optional ID for the examiner
  },
  projectId: {
    type: String, // Optional ID for the project
  },
  description: {
    type: String, // Optional project/team description
  },
  firstMember: {
    type: String, // Member ID or identifier
  },
  secondMember: {
    type: String,
  },
  thirdMember: {
    type: String,
  },
  fourthMember: {
    type: String,
  },
  permissions: {
    type: Map, // Using a map for flexible key-value pairs
    of: String, // Permissions can be set for each member
  },
  teamConfirmed: {
    type: Boolean, // Flag to indicate if the team is confirmed
    default: false,
  },
}, { timestamps: true }); // Add timestamps for tracking creation and modification

// Create the team model
const Teams = mongoose.models.Team || mongoose.model('Team', teamSchema);

export {Teams};
