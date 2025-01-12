export interface BlogPost {
    id: number;
    title: string;
    content: string;
    thumbnail: string | null;
    updated_at: string | Date; // MySQLは文字列形式で日時を返す場合がある
  }
  