// hooks/useCategoryPosts.ts
import { useEffect, useState } from "react";

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  images?: string[];
  slug: string;
  createdAt: string;
}

interface CategoryData {
  _id: string;
  name: string;
  slug?: string;
  posts: Post[];
}

const BASE = import.meta.env.VITE_BASE_URL;

export function useCategoryPosts(categorySlug: string) {
  const [data, setData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${BASE}/db/category/slug/${categorySlug}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(`Failed to fetch category "${categorySlug}":`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categorySlug]);

  return { category: data, posts: data?.posts || [], loading, error };
}