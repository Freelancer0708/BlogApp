import Link from "next/link";
import { fetchBlogPosts } from "@/services/fetchBlogPosts";
import { BlogPost } from "@/types/BlogPost";
import Image from "next/image";

export async function BlogList() {
  const posts: BlogPost[] = await fetchBlogPosts();
  const stripHtmlTags = (input: string) => {
    const withoutHtml = input.replace(/<\/?[^>]+(>|$)/g, ""); // HTMLタグを削除
    return withoutHtml.replace(/\r?\n|\r/g, " "); // 改行をスペースに置換
  };
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id} className="blog-list-item">
          <div className="blog-list-item-img">
            <Image
              src={post.thumbnail || "https://blog-app-pied-one.vercel.app/uploads/default-thumbnail.webp"} // サムネイルがない場合の代替画像
              alt={post.title}
              width={600}
              height={200}
            />
          </div>
          <div className="blog-list-item-content">
            <h2 className="blog-list-item-title">
              {post.title.length < 26 ? post.title : post.title.substring(0, 26) + "…"}
            </h2>
            <p className="blog-list-item-detail">
              {stripHtmlTags(post.content).length < 60
                ? stripHtmlTags(post.content)
                : stripHtmlTags(post.content).substring(0, 60) + "…"}
            </p>
            <data className="blog-list-item-date">
              {post.updated_at instanceof Date
                ? new Date(post.updated_at).getFullYear().toString().padStart(2, '0') +
                "/" +
                (new Date(post.updated_at).getMonth() + 1).toString().padStart(2, '0') +
                "/" +
                new Date(post.updated_at).getDate().toString().padStart(2, '0') +
                " " +
                new Date(post.updated_at).getHours().toString().padStart(2, '0') +
                ":" +
                new Date(post.updated_at).getMinutes().toString().padStart(2, '0')
                : ""}
            </data>
          </div>
        </Link>
      ))}
    </div>
  );
}
