import { Teams } from "@/models/team.model";
import { MentorStudentExaminer } from "@/models/sheet.model";

const updateTeam = async (
  teamId,
  leaderName,
  leaderId,
  mentorId,
  examinerId,
  projectId,
  description,
  firstMember,
  secondMember,
  permissions,
  teamConfirmed
) => {


  try {
    let team = await Teams.findOne({ teamId });

    if (team) {
      if (!team.secondMember) {
        team.secondMember = secondMember || team.secondMember;
      } else if (!team.thirdMember) {
        team.thirdMember = secondMember || team.thirdMember;
      } else if (!team.fourthMember) {
        team.fourthMember = secondMember || team.fourthMember;
      }
      team.leaderName = leaderName || team.leaderName;
      team.leaderId = leaderId || team.leaderId;
      team.mentorId = mentorId || team.mentorId;
      team.examinerId = examinerId || team.examinerId;
      team.projectId = projectId || team.projectId;
      team.description = description || team.description;
      team.firstMember = firstMember || team.firstMember;
      team.permissions = permissions || team.permissions;
      team.teamConfirmed = teamConfirmed || team.teamConfirmed;
      await team.save();
      return { message: 'Team updated successfully', status: 201 };
    } else {
      const newTeam = new Teams({
        teamId,
        leaderName,
        leaderId,
        mentorId,
        examinerId,
        projectId,
        description,
        firstMember,
        permissions,
      });

      await newTeam.save();

      return { message: 'Team created successfully', status: 201 };
    }
  } catch (error) {
    console.error('Error updating team:', error);
    return { message: 'Internal server error', status: 500 };
  }
};

const checkTeam = async (teamId, leaderName, leaderId, mentorId, examinerId, projectId, description, firstMember, secondMember, thirdMember, fourthMember, permissions) => {
  try {
    let team = await Teams.findOne({ teamId });

    if (!team) {
      throw new Error('Team not Existed');
    }

    if (!team.firstMember || !team.secondMember || !team.thirdMember || !team.fourthMember || !team.leaderId) {
      throw new Error('Team not Complete');
    }

    if (team.firstMember !== firstMember || team.secondMember !== secondMember || team.thirdMember !== thirdMember || team.fourthMember !== fourthMember) {
      throw new Error('Team Members are not Valid');
    }

    const allDocuments = await MentorStudentExaminer.find();

    if (!allDocuments.length) {
      throw new Error('Team data not found. Please contact admin.');
    }

     // Check for the document that has all four members
     let mentorId1;
     const eligibleDoc = allDocuments.find(doc => {
       return doc.data.some(row => {
         const isEligible = [row[5], row[6], row[7], row[8]].some(email => {
           return [firstMember, secondMember, thirdMember, fourthMember].map(member => member.toLowerCase()).includes(email.toLowerCase());
         });
     
         if (isEligible) {
           mentorId1 = row[4];
         }
     
         return isEligible;
       });
     });

    if (!eligibleDoc) {
      throw new Error('One or more team members are not eligible');
    }

    // Assuming mentorId is in the first column of the data

    const permissionsMap = new Map();

    permissions.forEach(obj => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      permissionsMap.set(key, value);
    });
    
    const teamConfirmed = true;
    team.description = description||team.description
    team.teamConfirmed = teamConfirmed ||team.teamConfirmed
    team.mentorId = mentorId1
    team.permissions = permissionsMap || team.permissions;
    team.firstMember = firstMember || team.firstMember;
    team.secondMember = secondMember || team.secondMember;
    team.thirdMember = thirdMember || team.thirdMember;
    team.fourthMember = fourthMember || team.fourthMember;
    await team.save()

    return { message: 'Your Team Get Approved!', status: 201 };
  } catch (error) {
    console.error('Error in checkTeam function:', error);
    return { message: error.message || 'Internal server error', status: 500 };
  }
};

const sendTeamDetails = async (teamId) => {
  try {

    // Find the team by its ID
    const team = await Teams.findOne({ teamId });

    if (!team) {
      // If no team is found, return a 404 status with an appropriate message
      return { message: 'Team not found', status: 404 };
    }

    const data = {
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
      teamConfirmed:team.teamConfirmed,
      teamId: team.teamId,
    }
    return {
      data: data, status: 201
    };
  } catch (error) {
    console.error('Error fetching team details:', error);
    return { message: 'Internal server error', status: 500 };
  }
};
export { updateTeam, sendTeamDetails, checkTeam };