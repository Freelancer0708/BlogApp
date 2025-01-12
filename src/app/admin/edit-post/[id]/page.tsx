"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    content: "",
    categoryId: "",
    status: "draft",
  });

  const router = useRouter();

  // 非同期で`params`を解決
  useEffect(() => {
    const fetchPostData = async () => {
      const { id } = await params; // `params`を非同期で解決

      // 記事データを取得してフォームにセット
      const response = await fetch(`/api/admin/posts/${id}`);
      if (response.ok) {
        const post = await response.json();
        setFormData({
          title: post.title,
          thumbnail: post.thumbnail || "",
          content: post.content,
          categoryId: post.category_id || "",
          status: post.status,
        });
      } else {
        alert("Failed to fetch post data.");
      }
    };

    fetchPostData();
  }, [params]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = await params; // `params`を非同期で解決

    const response = await fetch(`/api/admin/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Post updated successfully!");
      router.push("/admin/posts");
    } else {
      alert("Failed to update post.");
    }
  };

  return (
    <div className="container edit-post">
      <h1>Edit Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail URL</label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="submit">Update Post</button>
      </form>

      <Link href={"/admin/posts"}>Back</Link>
    </div>
  );
}
