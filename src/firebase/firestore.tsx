import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  isPublished: boolean;
  updatedAt: Date;
};

// ブログ記事を取得する関数
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const postsCollection = collection(db, 'blogPosts');
  const snapshot = await getDocs(postsCollection);

  return snapshot.docs.map((doc) => {
    const data = doc.data() as { title: string; content: string; createdAt: Timestamp; isPublished: boolean; updatedAt: Timestamp; }; // 必須フィールドに型を適用
    return {
      id: doc.id, // 既にFirestoreで取得したID
      title: data.title || 'Untitled',
      content: data.content || 'No content available',
      createdAt: data.createdAt.toDate() || new Date(),
      isPublished: data.isPublished || false,
      updatedAt: data.updatedAt.toDate() || new Date(),
    };
  });
}
