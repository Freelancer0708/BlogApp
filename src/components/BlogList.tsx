import Link from "next/link";
import { fetchBlogPosts } from "@/firebase/firestore";

export async function BlogList() {

  const posts = await fetchBlogPosts();
  return (
    <div className="blog-list">
        {posts.map((post) => (
            <Link href={`/blog/${post.id}`} className="blog-list-item">
                <div className="blog-list-item-img"><img src={`https://firebasestorage.googleapis.com/v0/b/exapp-admin.firebasestorage.app/o/${post.id}%2F01.webp?alt=media`} alt="" width={600} height={200}/></div>
                <div className="blog-list-item-content">
                    <h2 className="blog-list-item-title">{post.title.length < 26 ? post.title : post.title.substring(0, 26) + "…" }</h2>
                    <p className="blog-list-item-detail">{post.content.length < 60 ? post.content : post.content.substring(0, 60) + "…" }</p>
                    <data className="blog-list-item-date">{post.updatedAt.getFullYear().toString().padStart(2, '0') + "/" + (post.updatedAt.getMonth() + 1).toString().padStart(2, '0') + "/" + post.updatedAt.getDay().toString().padStart(2, '0') + " " + post.updatedAt.getHours().toString().padStart(2, '0') + ":" + post.updatedAt.getMinutes().toString().padStart(2, '0')}</data>
                </div>
            </Link>
        ))}
    </div>
  );
}