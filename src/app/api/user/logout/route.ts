import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logged out",
    });

    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Error logging out user:", error);
  }
}
