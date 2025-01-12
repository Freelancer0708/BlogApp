import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "@/lib/mysql";

interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  try {
    const sql = `
      SELECT id, username, password_hash
      FROM admin_users
      WHERE username = ?
      LIMIT 1
    `;
    const users = await query<AdminUser>(sql, [username]);

    if (users.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
