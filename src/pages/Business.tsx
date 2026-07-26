// import "./Business.css";

// const featured = {
//   title: "Banks record strong profits as interest rates remain high",
//   excerpt:
//     "Financial institutions continue to report increased earnings despite inflation concerns.",
//   image: "/images/business-main.jpg",
// };

// const stories = [
//   {
//     title: "CBN unveils new policy for commercial banks",
//     image: "/images/business1.jpg",
//   },
//   {
//     title: "Oil prices climb amid global supply concerns",
//     image: "/images/business2.jpg",
//   },
//   {
//     title: "Dangote refinery expands fuel distribution",
//     image: "/images/business3.jpg",
//   },
//   {
//     title: "Stock market closes higher for third straight day",
//     image: "/images/business4.jpg",
//   },
//   {
//     title: "Manufacturers seek tax relief from FG",
//     image: "/images/business5.jpg",
//   },
//   {
//     title: "Naira appreciates against dollar at official market",
//     image: "/images/business6.jpg",
//   },
// ];

// export default function Business() {
//   return (
//     <section className="business">

//       <div className="sectionHeader">
//         <span className="sectionDot"></span>
//         <h2>Business</h2>
//         <div className="sectionLine"></div>
//       </div>

//       <div className="businessGrid">

//         {/* Featured Story */}
//         <article className="businessFeatured">
//           <img src={featured.image} alt={featured.title} />

//           <h3>{featured.title}</h3>

//           <p>{featured.excerpt}</p>
//         </article>

//         {/* Stories */}
//         <div className="businessStories">
//           {stories.map((story) => (
//             <article className="businessCard" key={story.title}>
//               <img src={story.image} alt={story.title} />

//               <h4>{story.title}</h4>
//             </article>
//           ))}
//         </div>

//       </div>

//     </section>
//   );
// }

import { Link } from "react-router-dom";

import "./Business.css";
import { useCategoryPosts } from "@/hooks/useCategoryPosts";

function postImage(images?: string[]): string {
  return images?.[0] || "/images/placeholder.jpg";
}

export default function Business() {
  const { posts, loading, error } = useCategoryPosts("business");

  const featured = posts[0];
  const stories = posts.slice(1, 7);

  return (
    <section className="business">
      <div className="sectionHeader">
        <span className="sectionDot"></span>
        <h2>Business</h2>
        <div className="sectionLine"></div>
      </div>

      {loading ? (
        <p className="sectionStatus">Loading…</p>
      ) : error ? (
        <p className="sectionStatus sectionStatus--error">Couldn't load Business news.</p>
      ) : posts.length === 0 ? (
        <p className="sectionStatus">No Business stories yet.</p>
      ) : (
        <div className="businessGrid">
          {featured && (
            <article className="businessFeatured">
              <Link to={`/single/${featured.slug}`}>
                <img src={postImage(featured.images)} alt={featured.title} />
                <h3>{featured.title}</h3>
              </Link>
              <p>{featured.excerpt}</p>
            </article>
          )}

          <div className="businessStories">
            {stories.map((story) => (
              <article className="businessCard" key={story._id}>
                <Link to={`/single/${story.slug}`}>
                  <img src={postImage(story.images)} alt={story.title} />
                  <h4>{story.title}</h4>
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}