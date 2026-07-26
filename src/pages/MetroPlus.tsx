// import "./MetroPlus.css";

// const featured = {
//   title: "LASTMA captured 38,000 traffic offenders in Q2 2026 — GM",
//   excerpt:
//     "LASTMA's General Manager reveals over 38,000 traffic offenders were captured...",
//   image: "/images/metro-main.jpg",
// };

// const leftStories = [
//   {
//     title: "Woman slumps, dies in Cross River commercial bus",
//     image: "/images/news1.jpg",
//   },
//   {
//     title: "VIDEO: Commuters stranded as flood cuts off Ogun road",
//     image: "/images/news2.jpg",
//   },
//   {
//     title: "Police seek family of 83-year-old man found in Lagos",
//     image: "/images/news3.jpg",
//   },
//   {
//     title: "Soldiers intercept illicit drugs on Lagos-Calabar road",
//     image: "/images/news4.jpg",
//   },
// ];

// const rightStories = [
//   {
//     title: "Police arrest three women over sale of four-year-old",
//     image: "/images/news5.jpg",
//   },
//   {
//     title: "Oyo firefighters rescue six-month-old baby",
//     image: "/images/news6.jpg",
//   },
//   {
//     title: "Nine family members feared killed",
//     image: "/images/news7.jpg",
//   },
//   {
//     title: "NDLEA arrests South African woman",
//     image: "/images/news8.jpg",
//   },
// ];

// export default function MetroPlus() {
//   return (
//     <section className="metro">

//       <div className="sectionTitle">
//         <span></span>
//         <h2>Metro Plus</h2>
//         <div></div>
//       </div>

//       <div className="metroGrid">

//         <article className="metroFeatured">
//           <img src={featured.image} alt={featured.title} />

//           <h3>{featured.title}</h3>

//           <p>{featured.excerpt}</p>
//         </article>

//         <div className="metroColumn">
//           {leftStories.map((story) => (
//             <article className="smallNews" key={story.title}>
//               <img src={story.image} alt="" />
//               <h4>{story.title}</h4>
//             </article>
//           ))}
//         </div>

//         <div className="metroColumn">
//           {rightStories.map((story) => (
//             <article className="smallNews" key={story.title}>
//               <img src={story.image} alt="" />
//               <h4>{story.title}</h4>
//             </article>
//           ))}
//         </div>

//         <aside className="metroAd">

//           <h3>Read Daily Herald Anywhere</h3>

//           <p>
//             Unlock the full print replica on every device.
//           </p>

//           <button>Subscribe</button>

//         </aside>

//       </div>

//     </section>
//   );
// // }
// import { Link } from "react-router-dom";
// import { usePosts, postImage } from "@/hooks/usePosts";
// import "./MetroPlus.css";

// export default function MetroPlus() {
//   const { posts, loading, error } = usePosts();

//   const trending = posts
//     .filter((p) => p.isTrending)
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const featured = trending[0];
//   const stories = trending.slice(1, 7);

//   return (
//     <section className="metroPlus">
//       <div className="sectionHeader">
//         <span className="sectionDot"></span>
//         <h2>Metro Plus</h2>
//         <div className="sectionLine"></div>
//       </div>

//       {loading ? (
//         <p className="sectionStatus">Loading…</p>
//       ) : error ? (
//         <p className="sectionStatus sectionStatus--error">Couldn't load Metro Plus.</p>
//       ) : trending.length === 0 ? (
//         <p className="sectionStatus">No trending stories yet.</p>
//       ) : (
//         <div className="metroPlusGrid">
//           {featured && (
//             <article className="metroPlusFeatured">
//               <Link to={`/single/${featured.slug}`}>
//                 <img src={postImage(featured.images)} alt={featured.title} />
//                 <h3>{featured.title}</h3>
//               </Link>
//               <p>{featured.excerpt}</p>
//             </article>
//           )}

//           <div className="metroPlusStories">
//             {stories.map((story) => (
//               <article className="metroPlusCard" key={story._id}>
//                 <Link to={`/single/${story.slug}`}>
//                   <img src={postImage(story.images)} alt={story.title} />
//                   <h4>{story.title}</h4>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import { usePosts, postImage } from "@/hooks/usePosts";
import "./MetroPlus.css";

export default function MetroPlus() {
  const { posts, loading, error } = usePosts();

  const trending = posts
    .filter((p) => p.isTrending)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const featured = trending[0];
  const leftStories = trending.slice(1, 5);
  const rightStories = trending.slice(5, 9);

  return (
    <section className="metro">
      <div className="sectionTitle">
        <span></span>
        <h2>Metro Plus</h2>
        <div></div>
      </div>

      {loading ? (
        <p className="metroStatus">Loading…</p>
      ) : error ? (
        <p className="metroStatus metroStatus--error">Couldn't load Metro Plus.</p>
      ) : trending.length === 0 ? (
        <p className="metroStatus">No trending stories yet.</p>
      ) : (
        <div className="metroGrid">
          {featured && (
            <article className="metroFeatured">
              <Link to={`/single/${featured.slug}`}>
                <img src={postImage(featured.images)} alt={featured.title} />
                <h3>{featured.title}</h3>
              </Link>
              <p>{featured.excerpt}</p>
            </article>
          )}

          <div className="metroColumn">
            {leftStories.map((story) => (
              <article className="smallNews" key={story._id}>
                <Link to={`/single/${story.slug}`}>
                  <img src={postImage(story.images)} alt={story.title} />
                  <h4>{story.title}</h4>
                </Link>
              </article>
            ))}
          </div>

          <div className="metroColumn">
            {rightStories.map((story) => (
              <article className="smallNews" key={story._id}>
                <Link to={`/single/${story.slug}`}>
                  <img src={postImage(story.images)} alt={story.title} />
                  <h4>{story.title}</h4>
                </Link>
              </article>
            ))}
          </div>

          <aside className="metroAd">
            <h3>Read Daily Herald Anywhere</h3>
            <p>Unlock the full print replica on every device.</p>
            <button>Subscribe</button>
          </aside>
        </div>
      )}
    </section>
  );
}