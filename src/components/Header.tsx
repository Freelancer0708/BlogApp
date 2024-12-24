import Link from "next/link";

export function Header() {
  return (
    <header>
      <div className="header-list">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/"></Link>
      </div>
    </header>
  );
}