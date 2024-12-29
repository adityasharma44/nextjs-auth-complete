import { getDataFromToken } from "@/helpers/getDataFromToken";  
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { dbConfig } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await UserModel.findOne({ _id: userId });
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

dbConfig();
