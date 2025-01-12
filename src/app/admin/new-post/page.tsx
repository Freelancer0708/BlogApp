"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    content: "",
    categoryId: "",
    status: "draft",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/admin/new-post", {
      method: "POST",
      body: new FormData(e.target as HTMLFormElement),
    });

    if (response.ok) {
      const { editUrl } = await response.json();
      router.push(editUrl); // 成功時: 記事編集ページにリダイレクト
    } else {
      const { message } = await response.json();
      alert(message); // 失敗時: アラート表示
    }
  };

  return (
    <div className="container new-post">
      <h1>Create Blog Post</h1>
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
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
