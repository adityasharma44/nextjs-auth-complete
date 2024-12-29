import { dbConfig } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

dbConfig();

export async function POST(request: NextResponse) {
  try {
    const reqBody = await request.json();
    const { email, userName, password } = reqBody;

    const user = await UserModel.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { error: "User already Exist" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      userName,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();

    // send verification mail
    sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "User Created successfully", savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
