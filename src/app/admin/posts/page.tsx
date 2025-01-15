"use client";

import { useEffect, useState } from "react";

// 記事の型を定義
interface Post {
  id: number;
  title: string;
  status: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 記事データを取得
    const fetchPosts = async () => {
      const response = await fetch("/api/admin/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        alert("Failed to fetch posts.");
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const response = await fetch(`/api/admin/posts/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Post deleted successfully.");
      setPosts(posts.filter((post) => post.id !== postId));
    } else {
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="container manage-posts">
      <h1>Manage Blog Posts</h1>
      <table className="post-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.status}</td>
              <td>
                <a href={`/admin/edit-post/${post.id}`} className="edit-link">
                  Edit
                </a>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
