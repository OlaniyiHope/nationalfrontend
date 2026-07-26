// hooks/usePosts.ts
import { useEffect, useState } from "react";

export interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  images?: string[];
  category?: { _id: string; name: string } | null;
  isBreaking: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  isEditorsPick: boolean;
  slug: string;
  createdAt: string;
}

const BASE = import.meta.env.VITE_BASE_URL;

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BASE}/db/posts`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const list: Post[] = Array.isArray(data) ? data : data.posts || [];
        setPosts(list);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function postImage(images?: string[]): string {
  return images?.[0] || "/images/placeholder.jpg";
}