import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataforToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";

    const decodedData = jwt.verify(token, process.env.Secret);

    return decodedData.id;
  } catch (error) {
    console.error("Error getting data from token:", error);
  }
}
