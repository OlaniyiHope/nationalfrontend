import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import "./HomePage.css";
import Footer from "@/components/layout/Footer";
import TopVideos from "./TopVideos";
import MetroPlus from "./MetroPlus";
import Business from "./Business";
import Special from "./Special";

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  content: string;
  author?: string;
  category?: { _id: string; name: string } | null;
  tags: string[];
  images: string[];
  isBreaking: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  isEditorsPick: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const BASE = import.meta.env.VITE_BASE_URL;

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BASE}/db/posts`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const list: Post[] = Array.isArray(data) ? data : data.posts || [];
        setPosts(list);
      } catch (err) {
        console.error("Failed to fetch posts for homepage:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export default function HomePage() {
  const { posts, loading, error } = usePosts();

  // Sort newest-first once, reuse for every section below
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const featured =
    sorted.find((p) => p.isFeatured) || sorted[0] || null;

  const latest = sorted
    .filter((p) => p._id !== featured?._id)
    .slice(0, 5);

  const topStories = sorted
    .filter((p) => (p.isTrending || p.isBreaking) && p._id !== featured?._id)
    .slice(0, 3);

  return (
    <>
      <Header />

      <main className="home">
        <div className="container home__grid">
          <section className="home__latest">
            <h2>Latest News</h2>

            {loading ? (
              <p className="home__status">Loading…</p>
            ) : error ? (
              <p className="home__status home__status--error">
                Couldn't load latest news.
              </p>
            ) : latest.length === 0 ? (
              <p className="home__status">No stories yet.</p>
            ) : (
              <ul>
                {latest.map((item) => (
                  <li key={item._id}>
                    <span className="home__latest-time">
                      {timeAgo(item.createdAt)}
                    </span>
                    <a href={`/single/${item.slug}`}>{item.title}</a>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="home__feature">
            {loading ? (
              <p className="home__status">Loading…</p>
            ) : error ? (
              <p className="home__status home__status--error">
                Couldn't load featured story.
              </p>
            ) : !featured ? (
              <p className="home__status">No featured story yet.</p>
            ) : (
              <>
                <div
                  className="home__feature-image"
                  style={
                    featured.images?.[0]
                      ? { backgroundImage: `url(${featured.images[0]})` }
                      : undefined
                  }
                  aria-hidden="true"
                />
                <h1>
                  <a href={`/single/${featured.slug}`}>{featured.title}</a>
                </h1>
                <p>{featured.excerpt}</p>
              </>
            )}
          </section>

          <section className="home__top">
            <h2>Top Stories</h2>

            {loading ? (
              <p className="home__status">Loading…</p>
            ) : error ? (
              <p className="home__status home__status--error">
                Couldn't load top stories.
              </p>
            ) : topStories.length === 0 ? (
              <p className="home__status">No top stories yet.</p>
            ) : (
              <div className="home__top-list">
                {topStories.map((story) => (
                  <article className="top-story" key={story._id}>
                    <div className="top-story__content">
                      <a
                        href={`/single/${story.slug}`}
                        className="top-story__title"
                      >
                        {story.title}
                      </a>

                      {story.category && (
                        <span className="top-story__category">
                          {story.category.name}
                        </span>
                      )}
                    </div>

                    {story.images?.[0] && (
                      <img
                        src={story.images[0]}
                        alt={story.title}
                        className="top-story__image"
                      />
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <div className="container">
        <TopVideos />
        <MetroPlus />
        <Business />
        <Special />
      </div>

      <Footer />
    </>
  );
}
