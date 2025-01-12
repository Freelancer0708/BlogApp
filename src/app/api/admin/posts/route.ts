import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function GET() {
  try {
    const sql = `
      SELECT id, title, status
      FROM posts
      ORDER BY updated_at DESC
    `;
    const results = await query(sql);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}
