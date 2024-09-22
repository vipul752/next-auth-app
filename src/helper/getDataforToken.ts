import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataforToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";

    const secret = process.env.Secret;
    if (!secret) {
      throw new Error("Secret is not defined");
    }
    const decodedData = jwt.verify(token, secret) as jwt.JwtPayload;

    return decodedData.id;
  } catch (error) {
    console.error("Error getting data from token:", error);
  }
}
