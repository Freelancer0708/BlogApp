import { BlogList } from "@/components/BlogList";

export default async function Blog() {
  return (
    <div className="container blog">
      <h1>Blog Page</h1>
      <BlogList />
    </div>
  );
}