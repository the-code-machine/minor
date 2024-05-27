import { sendTeamDetails, checkTeam } from "@/controllers/team.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";

connectDb();
export async function PUT(request) {
    try {
        const reqBod = await request.json();
        const { teamId, leaderName, leaderId, mentorId, examinerId, projectId, description, firstMember, secondMember, thirdMember, fourthMember, permissions } = reqBod;

        const res = await checkTeam(teamId, leaderName, leaderId, mentorId, examinerId, projectId, description, firstMember, secondMember, thirdMember, fourthMember, permissions);
        return NextResponse.json(res);
    } catch (err) {
        console.error("Error in POST handler:", err);
        const message = err.message || 'An error occurred';
        return new NextResponse(JSON.stringify({ message }), { status: 500 });
    }
}
