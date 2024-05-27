import { UserProfile } from "@/models/userprofile.model";

// Update or create user profile information based on email (userId)
const updateUserProfile = async (userId, linkedinUrl, twitterUrl, githubUrl, bio, profileImage, coverImage ,userType,mentorId,projectId,examinerId,teamId,teamConfirmed) => {
 

  try {
    // Find the user profile by email (userId)
    let userProfile = await UserProfile.findOne({ userId });

    if (userProfile) {
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
      userProfile.teamConfirmed = teamConfirmed || userProfile.teamConfirmed;
      

      await userProfile.save();
      return { message: 'User profile updated successfully' ,status:201};
    } else {
      // Create new profile if none exists
     const userProfileNew = new UserProfile({
        userId, // Email
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
      return { message: 'User profile created successfully' ,status:201};
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { message: 'Internal server error' ,status:500};
  }
};

const sendUserProfile = async (userId) => {
    try {
  
      const userProfile = await UserProfile.findOne({ userId });
  
      if (!userProfile) {
        return { message: 'User profile not found' ,status:404};
      }
  
      const data ={
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
      }
      return {
         data:data,status:201
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return { message: 'Internal server error' ,status:500};
    }}

export { updateUserProfile,sendUserProfile}