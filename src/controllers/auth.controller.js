const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const jwtModel= require('../models/jwt.model')
const mongoose = require('mongoose');
const {MentorStudentExaminer} = require('../models/sheet.model');
// Load environment variables
dotenv.config();


// Signup controller
const signupUser = async (UserModel, email, password, userType) => {
  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return 'User already exists' 
    }
    if (userType.toLowerCase() === 'mentor') {
      const allDocuments = await MentorStudentExaminer.find(); // Retrieve all documents

      if (!allDocuments.length) {
        return 'Mentor data not found. Please contact admin.'
      }
      const isMentorEligible = allDocuments.some(doc => {
        return doc.data.some(row => row[4] === email); // Check if any row contains the email
      });

      if (!isMentorEligible) {
        return  'Not eligible to sign up as mentor. Please contact admin.' // Forbidden
      }
    }
    const newUser = new UserModel({ email, password, userType });
    await newUser.save(); // Save the new user to MongoDB

    return  'User signed up successfully'
  } catch (error) {
    console.error('Error during signup:', error);
    return 'User signup failed'
  }
};


// Login controller
const loginUser = async (Model, email, password) => {
  try {
    // Check if user exists
    const user = await Model.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
      return { error: 'Invalid email or password', status: 500 }; // Unauthorized
    }

  
    const token = jwtModel.generateToken(email)
   

    return {token:token,status:201}
  } catch (error) {
    return { error: error.message, status: 500 }; // Internal server error
  }
};

export { signupUser, loginUser}
