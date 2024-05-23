const Teams = require('../models/team.model'); // Import the team mod
const UserProfile = require('../models/userprofile.model');
// Insert or update team information based on teamId
const updateTeam = async (req, res) => {
    const { teamId } = req.params;
    const {
      leaderName,
      leaderId,
      mentorId,
      examinerId,
      projectId,
      description,
      firstMember,
      secondMember,
      thirdMember,
      fourthMember,
      permissions,
    } = req.body;
  
    try {
      let team = await Teams.findOne({ teamId });
  
      if (team) {
        // Update existing team
        team.leaderName = leaderName || team.leaderName;
        team.leaderId = leaderId || team.leaderId;
        team.mentorId = mentorId || team.mentorId;
        team.examinerId = examinerId || team.examinerId;
        team.projectId = projectId || team.projectId;
        team.description = description || team.description;
        team.firstMember = firstMember || team.firstMember;
        team.secondMember = secondMember || team.secondMember;
        team.thirdMember = thirdMember || team.thirdMember;
        team.fourthMember = fourthMember || team.fourthMember;
        team.permissions = permissions || team.permissions;
  
        await team.save();
        return res.status(200).json({ message: 'Team updated successfully' });
      } else {
        // Create new team
        const newTeam = new Teams({
          teamId,
          leaderName,
          leaderId,
          mentorId,
          examinerId,
          projectId,
          description,
          firstMember,
          secondMember,
          thirdMember,
          fourthMember,
          permissions,
        });
  
        await newTeam.save();
  
        return res.status(201).json({ message: 'Team created successfully' });
      }
    } catch (error) {
      console.error('Error updating team:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  


const sendTeamDetails = async (req, res) => {
    try {
      const { teamId } = req.params; // Get the unique team identifier from request parameters
  
      // Find the team by its ID
      const team = await Teams.findOne({ teamId });
  
      if (!team) {
        // If no team is found, return a 404 status with an appropriate message
        return res.status(404).json({ message: 'Team not found' });
      }
  
      // If the team is found, return the team details
      return res.status(200).json({
        leaderName: team.leaderName,
        leaderId: team.leaderId,
        mentorId: team.mentorId,
        examinerId: team.examinerId,
        projectId: team.projectId,
        description: team.description,
        firstMember: team.firstMember,
        secondMember: team.secondMember,
        thirdMember: team.thirdMember,
        fourthMember: team.fourthMember,
        permissions: team.permissions, // Ensure proper structure
        createdAt: team.createdAt, // If using timestamps
        updatedAt: team.updatedAt, // If using timestamps
      });
    } catch (error) {
      console.error('Error fetching team details:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  module.exports = { updateTeam,sendTeamDetails };