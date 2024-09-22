import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { getDataforToken } from "@/helper/getDataforToken";

connectDB();

export async function GET(req: NextRequest) {
  // Correct parameter type
  try {
    const userID = await getDataforToken(req); // req is passed to getDataforToken

    const user = await User.findOne({ _id: userID }).select("-password");

    return NextResponse.json({
      message: "User data",
      data: user,
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    return NextResponse.json({
      message: "Error fetching user data",
    });
  }
}
