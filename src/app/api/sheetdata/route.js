import { saveSheetDataExaminer,saveSheetDataMentor } from "@/controllers/sheet.controller";
import { connectDb } from "@/dbConnection/db";
import { NextResponse } from "next/server";

connectDb();
export async function POST(request) {
  const reqBod = await request.json();
  const {sheetName, editedCell, newValue, allData} = reqBod;
  try {
    const res = await saveSheetDataMentor(sheetName, editedCell, newValue, allData);
    return NextResponse.json({ res });
  } catch (err) {
    console.error('Error generating OTP:', err.message);
    return NextResponse.error({ status: 500 });
  }
}