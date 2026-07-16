import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./CategoryPage.css";

interface SideItem {
  date: string;
  title: string;
}

interface TaggedItem {
  title: string;
  image: string;
  tag: string;
}

interface TimelineItem {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

// Placeholder data — replace with real feed/API data, keyed by category
const categoryName = "News";

const leftList: SideItem[] = [
  { date: "July 14, 2026 7:32 pm", title: "NSCDC denies shielding officers, rift with security agencies in Akwa Ibom" },
  { date: "July 14, 2026 7:25 pm", title: "Adeleke inaugurates roads, faculty buildings in UNILESA" },
  { date: "July 14, 2026 7:08 pm", title: "Fight misinformation, Customs CG urges 70 new NIPR inductees" },
  { date: "July 14, 2026 7:07 pm", title: "Police arrest suspected bandit, recover ammunition in Kano" },
  { date: "July 14, 2026 7:04 pm", title: "Gombe gov presents INEC nomination forms to assembly" },
];

const featured = {
  image: "/images/category-featured.jpg",
  title: "VIDEO: Rescued Oyo kidnap victims reunite with families",
  date: "July 14, 2026 8:22 pm",
};

const rightList: TaggedItem[] = [
  { title: "Adamawa gov unveils ₦2.98bn modern market in Yola", image: "/images/news1.jpg", tag: "News" },
  { title: "Yoruba group hails rescue of Oyo pupils, teachers", image: "/images/news2.jpg", tag: "News" },
  { title: "Read our laws before criticising us, Akpabio urges Nigerians", image: "/images/news3.jpg", tag: "News" },
  { title: "Sanwo-Olu urges Lagosians to plant trees against climate change", image: "/images/news4.jpg", tag: "News" },
  { title: "Pension assets rose in Q2", image: "/images/news5.jpg", tag: "News" },
];

const timelineList: TimelineItem[] = [
  {
    title: "Natasha seeks counselling for rescued Oyo pupils, teachers",
    excerpt:
      "Senator Natasha Akpoti-Uduaghan advocates for psychological support and trauma counselling for Oyo pupils and teachers rescued from captivity....",
    date: "July 14, 2026 5:58 pm",
    image: "/images/timeline1.jpg",
  },
  {
    title: "NSCDC arrests 671 suspected illegal miners",
    excerpt:
      "The NSCDC's Mining Marshals have arrested 671 suspected illegal miners across Nigeria, with 397 already arraigned, boosting government revenue from solid m...",
    date: "July 14, 2026 5:56 pm",
    image: "/images/timeline2.jpg",
  },
  {
    title: "NANS declares national emergency over dilapidated campus hostels",
    excerpt:
      "NANS declares a national emergency over dilapidated campus hostels, citing threats to student welfare. Discover how this impacts Nigerian tertiary institut...",
    date: "July 14, 2026 5:40 pm",
    image: "/images/timeline3.jpg",
  },
];

export default function CategoryPage() {
  return (
    <>
      <Header />

      <main className="category">
        <div className="container">
          <div className="categoryTitle">
            <span></span>
            <h1>Category: {categoryName}</h1>
            <div></div>
          </div>

          <div className="categoryTop">
            {/* Left column — text-only list */}
            <div className="categorySide">
              {leftList.map((item) => (
                <article className="categorySide__item" key={item.title}>
                  <span className="categorySide__date">{item.date}</span>
                  <a href="#0">{item.title}</a>
                </article>
              ))}
            </div>

            {/* Center — featured story */}
            <article className="categoryFeatured">
              <img src={featured.image} alt={featured.title} />
              <h2>{featured.title}</h2>
              <span className="categoryFeatured__date">{featured.date}</span>
            </article>

            {/* Right column — list with thumbnails + tag */}
            <div className="categorySide categorySide--tagged">
              {rightList.map((item) => (
                <article className="taggedItem" key={item.title}>
                  <div className="taggedItem__content">
                    <a href="#0">{item.title}</a>
                    <span className="taggedItem__tag">{item.tag}</span>
                  </div>
                  <img src={item.image} alt={item.title} />
                </article>
              ))}
            </div>
          </div>

          {/* Timeline list — continues below on scroll/pagination */}
          <div className="categoryTimeline">
            {timelineList.map((item) => (
              <article className="timelineItem" key={item.title}>
                <div className="timelineItem__marker"></div>
                <div className="timelineItem__body">
                  <div className="timelineItem__text">
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                    <span className="timelineItem__date">{item.date}</span>
                  </div>
                  <img src={item.image} alt={item.title} />
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