import { query } from "@/lib/mysql";
import Image from "next/image";

interface BlogPost {
  title: string;
  content: string;
  thumbnail: string;
  updated_at: string;
}

interface BlogProps {
  params: { slug: string }; // `params`の型定義
}

export default async function BlogSingle({ params }: BlogProps) {
  const { slug } = await params;

  // MySQLから記事データを取得
  const sql = `
    SELECT title, content, thumbnail, updated_at
    FROM posts
    WHERE id = ?
    LIMIT 1
  `;
  const results:BlogPost[] = await query(sql, [slug]);

  if (results.length === 0) {
    return <div>Post not found</div>; // データが見つからない場合
  }

  const post = results[0];

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
