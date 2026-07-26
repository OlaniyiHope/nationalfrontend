// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import "./CategoryPage.css";

// interface SideItem {
//   date: string;
//   title: string;
// }

// interface TaggedItem {
//   title: string;
//   image: string;
//   tag: string;
// }

// interface TimelineItem {
//   title: string;
//   excerpt: string;
//   date: string;
//   image: string;
// }

// // Placeholder data — replace with real feed/API data, keyed by category
// const categoryName = "News";

// const leftList: SideItem[] = [
//   { date: "July 14, 2026 7:32 pm", title: "NSCDC denies shielding officers, rift with security agencies in Akwa Ibom" },
//   { date: "July 14, 2026 7:25 pm", title: "Adeleke inaugurates roads, faculty buildings in UNILESA" },
//   { date: "July 14, 2026 7:08 pm", title: "Fight misinformation, Customs CG urges 70 new NIPR inductees" },
//   { date: "July 14, 2026 7:07 pm", title: "Police arrest suspected bandit, recover ammunition in Kano" },
//   { date: "July 14, 2026 7:04 pm", title: "Gombe gov presents INEC nomination forms to assembly" },
// ];

// const featured = {
//   image: "/images/category-featured.jpg",
//   title: "VIDEO: Rescued Oyo kidnap victims reunite with families",
//   date: "July 14, 2026 8:22 pm",
// };

// const rightList: TaggedItem[] = [
//   { title: "Adamawa gov unveils ₦2.98bn modern market in Yola", image: "/images/news1.jpg", tag: "News" },
//   { title: "Yoruba group hails rescue of Oyo pupils, teachers", image: "/images/news2.jpg", tag: "News" },
//   { title: "Read our laws before criticising us, Akpabio urges Nigerians", image: "/images/news3.jpg", tag: "News" },
//   { title: "Sanwo-Olu urges Lagosians to plant trees against climate change", image: "/images/news4.jpg", tag: "News" },
//   { title: "Pension assets rose in Q2", image: "/images/news5.jpg", tag: "News" },
// ];

// const timelineList: TimelineItem[] = [
//   {
//     title: "Natasha seeks counselling for rescued Oyo pupils, teachers",
//     excerpt:
//       "Senator Natasha Akpoti-Uduaghan advocates for psychological support and trauma counselling for Oyo pupils and teachers rescued from captivity....",
//     date: "July 14, 2026 5:58 pm",
//     image: "/images/timeline1.jpg",
//   },
//   {
//     title: "NSCDC arrests 671 suspected illegal miners",
//     excerpt:
//       "The NSCDC's Mining Marshals have arrested 671 suspected illegal miners across Nigeria, with 397 already arraigned, boosting government revenue from solid m...",
//     date: "July 14, 2026 5:56 pm",
//     image: "/images/timeline2.jpg",
//   },
//   {
//     title: "NANS declares national emergency over dilapidated campus hostels",
//     excerpt:
//       "NANS declares a national emergency over dilapidated campus hostels, citing threats to student welfare. Discover how this impacts Nigerian tertiary institut...",
//     date: "July 14, 2026 5:40 pm",
//     image: "/images/timeline3.jpg",
//   },
// ];

// export default function CategoryPage() {
//   return (
//     <>
//       <Header />

//       <main className="category">
//         <div className="container">
//           <div className="categoryTitle">
//             <span></span>
//             <h1>Category: {categoryName}</h1>
//             <div></div>
//           </div>

//           <div className="categoryTop">
//             {/* Left column — text-only list */}
//             <div className="categorySide">
//               {leftList.map((item) => (
//                 <article className="categorySide__item" key={item.title}>
//                   <span className="categorySide__date">{item.date}</span>
//                   <a href="#0">{item.title}</a>
//                 </article>
//               ))}
//             </div>

//             {/* Center — featured story */}
//             <article className="categoryFeatured">
//               <img src={featured.image} alt={featured.title} />
//               <h2>{featured.title}</h2>
//               <span className="categoryFeatured__date">{featured.date}</span>
//             </article>

//             {/* Right column — list with thumbnails + tag */}
//             <div className="categorySide categorySide--tagged">
//               {rightList.map((item) => (
//                 <article className="taggedItem" key={item.title}>
//                   <div className="taggedItem__content">
//                     <a href="#0">{item.title}</a>
//                     <span className="taggedItem__tag">{item.tag}</span>
//                   </div>
//                   <img src={item.image} alt={item.title} />
//                 </article>
//               ))}
//             </div>
//           </div>

//           {/* Timeline list — continues below on scroll/pagination */}
//           <div className="categoryTimeline">
//             {timelineList.map((item) => (
//               <article className="timelineItem" key={item.title}>
//                 <div className="timelineItem__marker"></div>
//                 <div className="timelineItem__body">
//                   <div className="timelineItem__text">
//                     <h3>{item.title}</h3>
//                     <p>{item.excerpt}</p>
//                     <span className="timelineItem__date">{item.date}</span>
//                   </div>
//                   <img src={item.image} alt={item.title} />
//                 </div>
//               </article>
//             ))}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./CategoryPage.css";

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  description?: string;
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
const isObjectId = (v: string) => /^[0-9a-fA-F]{24}$/.test(v);

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function postImage(post: Post): string {
  return post.images?.[0] || "/images/placeholder.jpg";
}

function postExcerpt(post: Post): string {
  return post.excerpt || post.description || "";
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchCategory = async () => {
      setLoading(true);
      setError(false);
      try {
        const url = isObjectId(slug)
          ? `${BASE}/db/category/${slug}`
          : `${BASE}/db/category/slug/${slug}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        console.error("Failed to fetch category:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="category">
          <div className="container">
            <p>Loading…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !category) {
    return (
      <>
        <Header />
        <main className="category">
          <div className="container">
            <p>Category not found.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const posts = category.posts || [];
  const featured = posts[0];
  const leftList = posts.slice(1, 6);
  const rightList = posts.slice(6, 11);
  const timelineList = posts.slice(11, 14);

  return (
    <>
      <Header />

      <main className="category">
        <div className="container">
          <div className="categoryTitle">
            <span></span>
            <h1>Category: {category.name}</h1>
            <div></div>
          </div>

          <div className="categoryTop">
            {/* Left column — text-only list */}
            <div className="categorySide">
              {leftList.map((post) => (
                <article className="categorySide__item" key={post._id}>
                  <span className="categorySide__date">{formatDate(post.createdAt)}</span>
                  <Link to={`/single/${post.slug}`}>{post.title}</Link>
                </article>
              ))}
            </div>

            {/* Center — featured story */}
            {featured && (
              <article className="categoryFeatured">
                <Link to={`/single/${featured.slug}`}>
                  <img src={postImage(featured)} alt={featured.title} />
                </Link>
                <h2>
                  <Link to={`/single/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <span className="categoryFeatured__date">{formatDate(featured.createdAt)}</span>
              </article>
            )}

            {/* Right column — list with thumbnails + tag */}
            <div className="categorySide categorySide--tagged">
              {rightList.map((post) => (
                <article className="taggedItem" key={post._id}>
                  <div className="taggedItem__content">
                    <Link to={`/single/${post.slug}`}>{post.title}</Link>
                    <span className="taggedItem__tag">{category.name}</span>
                  </div>
                  <img src={postImage(post)} alt={post.title} />
                </article>
              ))}
            </div>
          </div>

          {/* Timeline list */}
          <div className="categoryTimeline">
            {timelineList.map((post) => (
              <article className="timelineItem" key={post._id}>
                <div className="timelineItem__marker"></div>
                <div className="timelineItem__body">
                  <div className="timelineItem__text">
                    <h3>
                      <Link to={`/single/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p>{postExcerpt(post)}</p>
                    <span className="timelineItem__date">{formatDate(post.createdAt)}</span>
                  </div>
                  <img src={postImage(post)} alt={post.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}