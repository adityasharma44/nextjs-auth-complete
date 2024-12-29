import { dbConfig } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConfig();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await UserModel.findOne({ email: email });


    if (!user) {
      return NextResponse.json({ message: "User not Exist" }, { status: 400 });
    }

    const isFound = await bcrypt.compare(password, user.password);
    if (!isFound) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );
    }

    const payload = {
      email: user.email,
      id: user._id,
      userName: user.userName,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "Logged in successfully", success: true,user },
      { status: 201 }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
