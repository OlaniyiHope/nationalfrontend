// import "./TopVideos.css";

// interface Video {
//   id: number;
//   title: string;
//   image: string;
// }

// const videos: Video[] = [
//   {
//     id: 1,
//     title: "So This Happened (EP 408) reviews: Court nullifies NDC registration",
//     image: "/images/video1.jpg",
//   },
//   {
//     id: 2,
//     title: "So This Happened (EP 408) reviews: Fresh minimum wage talks gather momentum",
//     image: "/images/video2.jpg",
//   },
//   {
//     id: 3,
//     title: "So This Happened (EP 408) reviews: Remi Tinubu's advice sparks debate",
//     image: "/images/video3.jpg",
//   },
// ];
// export default function TopVideos() {
//   return (
//     <section className="topVideos">
//       <div className="topVideos__header">
//         <span className="topVideos__square"></span>
//         <h2>Top Videos</h2>
//         <div className="topVideos__line"></div>
//       </div>

//       <div className="topVideos__grid">
//         {videos.map((video) => (
//           <article className="videoCard" key={video.id}>
//             <img src={video.image} alt={video.title} />

//             <div className="videoCard__overlay">
//               <h3>{video.title}</h3>
//             </div>
//           </article>
//         ))}
//       </div>

//       <div className="topVideos__button">
//         <button>View More</button>
//       </div>
//     </section>
//   );
// }
import { useEffect, useState } from "react";
import "./TopVideos.css";

interface VideoPost {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  videoImage?: string; 
  videos?: string[];
  category?: {
    _id: string;
    name: string;
  };
}

export default function TopVideos() {
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const BASE = import.meta.env.VITE_BASE_URL;

        const res = await fetch(`${BASE}/db/posts`);

        if (!res.ok) throw new Error("Failed to fetch videos");

        const data = await res.json();

        const posts = Array.isArray(data) ? data : data.posts || [];

        // Only posts in the "videos" category
        const videoPosts = posts.filter(
          (post: VideoPost) =>
            post.category?.name.toLowerCase() === "videos"
        );

        setVideos(videoPosts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <p>Loading videos...</p>;
  }

  return (
    <section className="topVideos">
      <div className="topVideos__header">
        <span className="topVideos__square"></span>
        <h2>Top Videos</h2>
        <div className="topVideos__line"></div>
      </div>

      <div className="topVideos__grid">
        {videos.map((video) => (
          <article className="videoCard" key={video._id}>
            <a href={`/post/${video.slug}`}>
          <img
  src={
    video.videoImage
      ? video.videoImage
      : video.images.length
      ? video.images[0]
      : "/images/video-placeholder.jpg"
  }
  alt={video.title}
/>
              <div className="videoCard__overlay">
                <h3>{video.title}</h3>
              </div>
            </a>
          </article>
        ))}
      </div>

      <div className="topVideos__button">
        <button>View More</button>
      </div>
    </section>
  );
}