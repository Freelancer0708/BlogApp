import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";
import type { NextRequest } from "next/server";

// Next.jsの型に従ったAPIルート定義
export async function GET(req: NextRequest, { params }: { params: Record<string, string> }) {
  const { id } = params;

  try {
    const sql = `
      SELECT id, title, content, thumbnail, category_id, status
      FROM posts
      WHERE id = ?
      LIMIT 1
    `;
    const results = await query(sql, [id]);

    if (results.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Record<string, string> }) {
  const { id } = params;
  const { title, thumbnail, content, categoryId, status } = await req.json();

  try {
    const sql = `
      UPDATE posts
      SET title = ?, thumbnail = ?, content = ?, category_id = ?, status = ?
      WHERE id = ?
    `;
    const values = [title, thumbnail, content, categoryId || null, status, id];
    await query(sql, values);

    return NextResponse.json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
  }
}
