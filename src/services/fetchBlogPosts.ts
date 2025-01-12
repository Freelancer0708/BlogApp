import { query } from "@/lib/mysql";
import { BlogPost } from "@/types/BlogPost";

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const sql = `
    SELECT id, title, content, thumbnail, updated_at
    FROM posts
    WHERE status = 'published'
    ORDER BY updated_at DESC
  `;
  const posts = await query<BlogPost>(sql);

  return posts.map((post) => ({
    ...post,
    updated_at: new Date(post.updated_at), // updated_atをDateオブジェクトに変換
  }));
}
