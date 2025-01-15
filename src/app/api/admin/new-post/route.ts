import { NextResponse } from "next/server";
import { query } from "@/lib/mysql";

export async function POST(req: Request) {
  const formData = await req.formData();
  const title = formData.get("title") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const content = formData.get("content") as string;
  const categoryId = formData.get("categoryId") ? Number(formData.get("categoryId")) : null;
  const status = formData.get("status") as string;

  const authorId = 1; // 現在のユーザーID

  try {
    const sql = `
      INSERT INTO posts (title, thumbnail, content, author_id, status, category_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [title, thumbnail, content, authorId, status, categoryId];
    const result = await query<{ insertId: number }>(sql, values);
    const insertId = result[0]?.insertId;
    if (!insertId) { throw new Error("Failed to retrieve insertId"); }
    // 成功時: 新しい記事の編集ページのURLを返す
    return NextResponse.json({ 
      message: "Post created successfully",
      editUrl: `/admin/edit-post/${insertId}` 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    // 失敗時: エラーメッセージを返す
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
  }
}
