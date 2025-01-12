"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export function Header() {
  const pathname = usePathname();

  const isAdminPage = pathname.startsWith("/admin"); // 管理者ページかどうかを判定
  const isAdminLoginPage = pathname.startsWith("/admin/login");

  useEffect(() => {
    const adminMenu = document.getElementsByClassName("admin-menu")[0];
    const adminHeader = document.getElementsByClassName("admin-header")[0];

    // メニューボタンのクリックでヘッダーの開閉
    adminMenu?.addEventListener("click", () => {
      adminHeader?.classList.toggle("open");
    });

    // ヘッダーリスト内のリンクをクリックしたときにクラスを削除
    const headerLinks = document.querySelectorAll(".header-list a");
    headerLinks.forEach((link) => {
      link.addEventListener("click", () => {
        adminHeader?.classList.remove("open");
      });
    });

    // クリーンアップ関数
    return () => {
      adminMenu?.removeEventListener("click", () => {
        adminHeader?.classList.toggle("open");
      });
      headerLinks.forEach((link) => {
        link.removeEventListener("click", () => {
          adminHeader?.classList.remove("open");
        });
      });
    };
  }, []);

  if (isAdminLoginPage) { return null; }

  if (isAdminPage) {
    // 管理者用ヘッダー
    return (
      <>
        <div className="admin-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <header className="admin-header">
          <div className="header-list">
            <Link href="/" target="_blank">Site</Link>
            <Link href="/admin">Home</Link>
            <Link href="/admin/posts">Posts</Link>
            <Link href="/admin/new-post">New Post</Link>
          </div>
        </header>
      </>
    );
  }

  // 通常ユーザー用ヘッダー
  return (
    <>
      <header className="site-header">
        <div className="header-list">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </header>
    </>
  );
}
