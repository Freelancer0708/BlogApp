import { isAuthenticated } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AdminPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="container">
      <h1>Welcome to Admin Dashboard</h1>

      <div className="admin-links">
      <Link href={"/admin/posts"}>Posts</Link>
      <Link href={"/admin/new-post"}>New Post</Link>
      </div>

    </div>
  );
}
