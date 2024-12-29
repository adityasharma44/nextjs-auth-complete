import { dbConfig } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import UserModel from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);
    const user = await UserModel.findOne({
      verifyToken: token,verifyTokenExpiry:{$gt:new Date()}});


    if (!user) {
      return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({message:"email verified successfully"})
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

dbConfig();
