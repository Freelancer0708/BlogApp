import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function isAuthenticated() {
  const cookieStore = await cookies(); // 非同期で取得
  const token = cookieStore.get("adminToken")?.value;

  if (!token) return false;

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return true;
  } catch (error) {
    console.error("Authentication error:", error);
    return false;
  }
}
