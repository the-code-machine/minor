const UserProfile = require('../models/userprofile.model');

// Update or create user profile information based on email (userId)
const updateUserProfile = async (req, res) => {
  const { userId } = req.params; // This is email in your context
  const { fullName, linkedinUrl, twitterUrl, githubUrl, bio, profileImage, coverImage ,userType,mentorId,projectId,examinerId,teamId} = req.body;

  try {
    // Find the user profile by email (userId)
    let userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
      // Update existing profile
      userProfile.fullName = fullName || userProfile.fullName;
      userProfile.linkedinUrl = linkedinUrl || userProfile.linkedinUrl;
      userProfile.twitterUrl = twitterUrl || userProfile.twitterUrl;
      userProfile.githubUrl = githubUrl || userProfile.githubUrl;
      userProfile.bio = bio || userProfile.bio;
      userProfile.profileImage = profileImage || userProfile.profileImage;
      userProfile.userType = userType || userProfile.userType;
      userProfile.mentorId = mentorId || userProfile.mentorId;
      userProfile.projectId = projectId || userProfile.projectId;
      userProfile.teamId = teamId || userProfile.teamId;
      userProfile.examinerId = examinerId || userProfile.examinerId;
      userProfile.coverImage = coverImage || userProfile.coverImage;
      

      await userProfile.save();
      return res.status(200).json({ message: 'User profile updated successfully' });
    } else {
      // Create new profile if none exists
     const userProfileNew = new UserProfile({
        userId, // Email
        fullName,
        linkedinUrl,
        twitterUrl,
        githubUrl,
        bio,
        profileImage,
        coverImage,
        projectId,
        examinerId,
        teamId,
        mentorId,
        userType
      });

      await userProfileNew.save();
      return res.status(201).json({ message: 'User profile created successfully' });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const sendUserProfile = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userProfile = await UserProfile.findOne({ userId });
  
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      return res.status(200).json({
        fullName: userProfile.fullName,
        userType: userProfile.userType,
        mentorId: userProfile.mentorId,
        teamId: userProfile.teamId,
        projectId:userProfile.projectId,
        examinerID:userProfile.examinerID,
        linkedinUrl: userProfile.linkedinUrl,
        twitterUrl: userProfile.twitterUrl,
        githubUrl: userProfile.githubUrl,
        bio: userProfile.bio,
        profileImage: userProfile.profileImage,
        coverImage: userProfile.coverImage,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }}


module.exports = {
  updateUserProfile, sendUserProfile
};
