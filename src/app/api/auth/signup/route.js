import { signupUser } from "@/controllers/auth.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";
import {Student,Examiner,Admin,Mentor} from "@/models/auth.model";
connectDb();
export async function POST(request) {
  const reqBod = await request.json();
  const {email, password ,selectedOption} = reqBod;
    let UserModel;
    if(selectedOption === 'student'){
      UserModel = Student;
    }
    else if(selectedOption === 'mentor'){
      UserModel = Mentor;
    }
    else if(selectedOption === 'examiner'){
      UserModel = Examiner;
    }
    else if(selectedOption === 'admin'){
      UserModel = Admin;
    }
  try {
    const res = await signupUser(UserModel, email, password, selectedOption);
    return NextResponse.json({ message:res,status:201 });
  } catch (err) {
    console.error('Error generating OTP:', err.message);
    return NextResponse.error({ status: 500 });
  }
}