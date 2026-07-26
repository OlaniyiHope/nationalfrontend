// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import "./Single.css";

// interface RelatedLink {
//   title: string;
// }

// interface TopNewsItem {
//   title: string;
//   image: string;
// }

// // Placeholder data — replace with real feed/API data (fetched by article slug/id)
// const article = {
//   title: "NSCDC denies shielding officers, rift with security agencies in Akwa Ibom",
//   date: "July 14, 2026 7:32 pm",
//   author: "Patrick Odey",
//   image: "/images/article-main.jpg",
//   imageCaption: "Nigeria Security and Civil Defence Corps, Edo State Command. Photo: NSCDC",
//   paragraphs: [
//     "The Nigeria Security and Civil Defence Corps, Akwa Ibom State Command, has denied allegations that its Commandant, Geraldine Abetianbe, shields personnel found wanting in the course of their duties.",
//     "The command also dismissed claims that it has a fractured relationship with other security agencies in the state.",
//     "An online media platform had alleged that the commandant was involved in shielding erring officers, refusing to distribute tech operational system packs and drones, victimising personnel and neglecting staff welfare.",
//     'Reacting in a statement issued in Uyo on Tuesday, the command\'s Public Relations Officer, Friday Ekerete, described the allegations as "malicious, misleading and lacking in factual basis."',
//     '"The publication\'s reference to \'SP Mike Asibor, Head of Anti-Vandal\' is false.',
//     '"We wish to state that SC Michael Asibor is not a staff of the NSCDC Akwa Ibom State Command, let alone the Head of Anti-Vandal. The Head of Anti-Vandal at the NSCDC Akwa Ibom State Command Headquarters is SC Akan Ekenem.',
//   ],
//   relatedNews: [
//     { title: "Police arrest 10 suspected cultists over deadly Bayelsa attack" },
//     { title: "Police arrest suspected bandit, recover ammunition in Kano" },
//     { title: "Oyo APC slams Makinde over call for UN probe into school pupils' rescue" },
//   ] as RelatedLink[],
//   closingParagraphs: [
//     '"The command has and will always cooperate with investigations and will never shield any of its personnel found wanting," he said.',
//   ],
// };

// const topNews: TopNewsItem[] = [
//   { title: "Senate identifies soldiers, policeman killed, injured in Oyo", image: "/images/top1.jpg" },
//   { title: "Gunmen kill Lagos NURTW organising secretary", image: "/images/top2.jpg" },
//   { title: "UPDATED: Reps withdraw own state police bill, consider Tinubu's proposal", image: "/images/top3.jpg" },
//   { title: "My husband worked for me for 11 months after losing his pilot job – Businesswoman", image: "/images/top4.jpg" },
//   { title: "Atiku demands probe of Gbajabiamila over fresh corruption allegations", image: "/images/top5.jpg" },
//   { title: "Dangote dumps naira, begins petrol sales in dollars", image: "/images/top6.jpg" },
//   { title: "Fake agency scandal: ICPC begins probe as DG alleges threat to life", image: "/images/top7.jpg" },
// ];

// const shareLinks = [
//   { name: "Telegram", icon: "telegram" },
//   { name: "X", icon: "x" },
//   { name: "Facebook", icon: "facebook" },
//   { name: "WhatsApp", icon: "whatsapp" },
//   { name: "LinkedIn", icon: "linkedin" },
//   { name: "Reddit", icon: "reddit" },
// ];

// export default function SinglePage() {
//   return (
//     <>
//       <Header />

//       <main className="article">
//         <div className="container">
//           <div className="article__adTop">ADVERTISEMENT</div>

//           <div className="article__grid">
//             {/* Sticky share rail */}
//             <aside className="article__share">
//               {shareLinks.map((s) => (
//                 <a href="#0" key={s.name} className={`shareIcon shareIcon--${s.icon}`} aria-label={s.name}>
//                   <span className="shareIcon__dot" />
//                 </a>
//               ))}
//             </aside>

//             {/* Article body */}
//             <article className="article__body">
//               <h1>{article.title}</h1>
//               <span className="article__date">{article.date}</span>

//               <figure className="article__figure">
//                 <img src={article.image} alt={article.imageCaption} />
//                 <figcaption>{article.imageCaption}</figcaption>
//               </figure>

//               <div className="article__byline">By {article.author}</div>

//               {article.paragraphs.slice(0, 4).map((p, i) => (
//                 <p key={i}>{p}</p>
//               ))}

//               <div className="article__video" aria-hidden="true">
//                 <span className="article__videoBadge">PUNCH</span>
//               </div>

//               {article.paragraphs.slice(4).map((p, i) => (
//                 <p key={`b-${i}`}>{p}</p>
//               ))}

//               <aside className="article__related">
//                 <h3>Related News</h3>
//                 <ul>
//                   {article.relatedNews.map((r) => (
//                     <li key={r.title}>
//                       <a href="#0">{r.title}</a>
//                     </li>
//                   ))}
//                 </ul>
//               </aside>

//               {article.closingParagraphs.map((p, i) => (
//                 <p key={`c-${i}`}>{p}</p>
//               ))}

//               <div className="article__appCta">
//                 <p>
//                   Stay in the know—fast. Get instant alerts, breaking headlines, and exclusive stories with
//                   the <strong>Punch News App</strong>. <strong>Download now</strong> and never miss a beat.
//                 </p>
//                 <button>Get the Punch News App</button>
//               </div>
//             </article>

//             {/* Right sidebar */}
//             <aside className="article__sidebar">
//               <div className="article__adBox">
//                 <img src="/images/ad-app.jpg" alt="Punch News App" />
//               </div>
//               <div className="article__adBox article__adBox--whatsapp">
//                 <img src="/images/ad-whatsapp.jpg" alt="Join our WhatsApp channel" />
//               </div>
//               <div className="article__adBox article__adBox--plain">ADVERTISEMENT</div>
//             </aside>
//           </div>

//           {/* Top News grid */}
//           <section className="topNews">
//             <div className="sectionTitle">
//               <span></span>
//               <h2>Top News</h2>
//               <div></div>
//             </div>

//             <div className="topNews__grid">
//               <article className="topNews__lead">
//                 <img src={topNews[0].image} alt={topNews[0].title} />
//                 <h3>{topNews[0].title}</h3>
//               </article>

//               {topNews.slice(1).map((item) => (
//                 <article className="topNews__item" key={item.title}>
//                   <img src={item.image} alt={item.title} />
//                   <h4>{item.title}</h4>
//                 </article>
//               ))}
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./Single.css";

interface Post {
  _id: string;
  title: string;
  excerpt?: string;
  content: string;
  author: string;
  images?: string[];
  videos?: string[];
  videoImage?: string;
  category?: { _id: string; name: string; slug?: string };
  slug: string;
  createdAt: string;
}

interface PostDetail extends Post {
  related: Post[];
  topNews: Post[];
}

const BASE = import.meta.env.VITE_BASE_URL;

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

const shareLinks = [
  { name: "Telegram", icon: "telegram" },
  { name: "X", icon: "x" },
  { name: "Facebook", icon: "facebook" },
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "Reddit", icon: "reddit" },
];

export default function SinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${BASE}/db/post/slug/${slug}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setPost(data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="article">
          <div className="container"><p>Loading…</p></div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <Header />
        <main className="article">
          <div className="container"><p>Article not found.</p></div>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = post.content.split("\n").filter((p) => p.trim().length > 0);
  const midpoint = Math.ceil(paragraphs.length / 2);
  const related = post.related || [];
  const topNews = post.topNews || [];

  return (
    <>
      <Header />

      <main className="article">
        <div className="container">
          <div className="article__adTop">ADVERTISEMENT</div>

          <div className="article__grid">
            {/* Sticky share rail */}
            <aside className="article__share">
              {shareLinks.map((s) => (
                <a href="#0" key={s.name} className={`shareIcon shareIcon--${s.icon}`} aria-label={s.name}>
                  <span className="shareIcon__dot" />
                </a>
              ))}
            </aside>

            {/* Article body */}
            <article className="article__body">
              <h1>{post.title}</h1>
              <span className="article__date">{formatDate(post.createdAt)}</span>

              {post.images?.[0] && (
                <figure className="article__figure">
                  <img src={postImage(post)} alt={post.title} />
                </figure>
              )}

              <div className="article__byline">By {post.author}</div>

              {paragraphs.slice(0, midpoint).map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {post.videos?.[0] && (
                <div className="article__video">
                  <video src={post.videos[0]} controls poster={post.videoImage} />
                </div>
              )}

              {paragraphs.slice(midpoint).map((p, i) => (
                <p key={`b-${i}`}>{p}</p>
              ))}

              {related.length > 0 && (
                <aside className="article__related">
                  <h3>Related News</h3>
                  <ul>
                    {related.map((r) => (
                      <li key={r._id}>
                        <a href={`/single/${r.slug}`}>{r.title}</a>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <div className="article__appCta">
                <p>
                  Stay in the know—fast. Get instant alerts, breaking headlines, and exclusive stories.
                </p>
                <button>Get the News App</button>
              </div>
            </article>

            {/* Right sidebar */}
            <aside className="article__sidebar">
              <div className="article__adBox">
                <img src="/images/ad-app.jpg" alt="App ad" />
              </div>
              <div className="article__adBox article__adBox--whatsapp">
                <img src="/images/ad-whatsapp.jpg" alt="WhatsApp channel" />
              </div>
              <div className="article__adBox article__adBox--plain">ADVERTISEMENT</div>
            </aside>
          </div>

          {/* Top News grid */}
          {topNews.length > 0 && (
            <section className="topNews">
              <div className="sectionTitle">
                <span></span>
                <h2>Top News</h2>
                <div></div>
              </div>

              <div className="topNews__grid">
                <article className="topNews__lead">
                  <img src={postImage(topNews[0])} alt={topNews[0].title} />
                  <h3>{topNews[0].title}</h3>
                </article>

                {topNews.slice(1).map((item) => (
                  <article className="topNews__item" key={item._id}>
                    <img src={postImage(item)} alt={item.title} />
                    <h4>{item.title}</h4>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}