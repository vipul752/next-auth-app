import { connectDB } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await User.findOne({ email: " [email protected]" });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

connectDB();
