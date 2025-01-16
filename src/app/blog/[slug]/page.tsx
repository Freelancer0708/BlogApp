import { query } from "@/lib/mysql";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  status: string;
  updated_at: string;
}

interface BlogProps {
  params: Promise<{ slug: string }>; // `params`の型定義
}

export default async function BlogSingle({ params }: BlogProps) {
  const { slug } = await params;

  // MySQLから記事データを取得
  const sql = `
    SELECT id, title, content, thumbnail, status, updated_at
    FROM posts
    WHERE id = ?
    LIMIT 1
  `;
  const results:BlogPost[] = await query(sql, [slug]);
  const post = results[0];

  if (results.length === 0 || post.status !== "published") {
    return (
      <div className="container blog">
        <h1>Post not found</h1>
      </div>
    );
  }

  const updated_at = new Date(post.updated_at).getFullYear().toString().padStart(2, '0') +
    "/" +
    (new Date(post.updated_at).getMonth() + 1).toString().padStart(2, '0') +
    "/" +
    new Date(post.updated_at).getDate().toString().padStart(2, '0') +
    " " +
    new Date(post.updated_at).getHours().toString().padStart(2, '0') +
    ":" +
    new Date(post.updated_at).getMinutes().toString().padStart(2, '0');

  return (
    <div className="container blog-single">
      <div className="blog-single-header">
        <data>Update: {updated_at}</data>
        <h1>{post.title}</h1>
      </div>
      <div className="blog-single-content">
        <div className="blog-thumbnail">
          <Image src={post.thumbnail} alt={post.title} width={600} height={400} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
