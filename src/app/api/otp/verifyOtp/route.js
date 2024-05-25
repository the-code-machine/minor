import { verifyotp } from "@/controllers/otp.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";

connectDb();
export async function POST(request) {
  const reqBod = await request.json();
  const {otp} = reqBod;
  try {
    const res = await verifyotp(otp);
    return NextResponse.json({ message: res });
  } catch (err) {
    console.error('Error generating OTP:', err.message);
    return NextResponse.error({ status: 500 });
  }
}