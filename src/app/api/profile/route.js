import { sendUserProfile,updateUserProfile } from "@/controllers/userprofile.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";

connectDb();
export async function PUT(request) {
  const reqBod = await request.json();
  const {userId, linkedinUrl, twitterUrl, githubUrl, bio, profileImage, coverImage ,userType,mentorId,projectId,examinerId,teamId} = reqBod;
  try {
    const res = await updateUserProfile(userId, linkedinUrl, twitterUrl, githubUrl, bio, profileImage, coverImage ,userType,mentorId,projectId,examinerId,teamId);
    return NextResponse.json( res );
  } catch (err) {
    return NextResponse.error({ status: 500 });
  }
}
export async function POST(request) {
    const reqBod = await request.json();
    const {userId} = reqBod;
    try {
      const res = await sendUserProfile(userId);
      return NextResponse.json( res );
    } catch (err) {
      return NextResponse.error({ status: 500 });
    }
  }