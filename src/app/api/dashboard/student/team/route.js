import { sendTeamDetails, updateTeam } from "@/controllers/team.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";

connectDb();
export async function PUT(request) {
    const reqBod = await request.json();
    const { teamId, leaderName,
        leaderId,
        mentorId,
        examinerId,
        projectId,
        description,
        firstMember,
        secondMember,
        thirdMember,
        fourthMember,
        permissions } = reqBod;
    try {
        const res = await updateTeam(teamId, leaderName,
            leaderId,
            mentorId,
            examinerId,
            projectId,
            description,
            firstMember,
            secondMember,
            thirdMember,
            fourthMember,
            permissions);
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.error({ status: 500 });
    }
}
export async function POST(request) {
    const reqBod = await request.json();
    const { teamId } = reqBod;
    try {
        const res = await sendTeamDetails(teamId);
        return NextResponse.json(res);
    } catch (err) {
        return NextResponse.error({ status: 500 });
    }
}