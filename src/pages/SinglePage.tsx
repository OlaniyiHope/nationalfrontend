import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./Single.css";

interface RelatedLink {
  title: string;
}

interface TopNewsItem {
  title: string;
  image: string;
}

// Placeholder data — replace with real feed/API data (fetched by article slug/id)
const article = {
  title: "NSCDC denies shielding officers, rift with security agencies in Akwa Ibom",
  date: "July 14, 2026 7:32 pm",
  author: "Patrick Odey",
  image: "/images/article-main.jpg",
  imageCaption: "Nigeria Security and Civil Defence Corps, Edo State Command. Photo: NSCDC",
  paragraphs: [
    "The Nigeria Security and Civil Defence Corps, Akwa Ibom State Command, has denied allegations that its Commandant, Geraldine Abetianbe, shields personnel found wanting in the course of their duties.",
    "The command also dismissed claims that it has a fractured relationship with other security agencies in the state.",
    "An online media platform had alleged that the commandant was involved in shielding erring officers, refusing to distribute tech operational system packs and drones, victimising personnel and neglecting staff welfare.",
    'Reacting in a statement issued in Uyo on Tuesday, the command\'s Public Relations Officer, Friday Ekerete, described the allegations as "malicious, misleading and lacking in factual basis."',
    '"The publication\'s reference to \'SP Mike Asibor, Head of Anti-Vandal\' is false.',
    '"We wish to state that SC Michael Asibor is not a staff of the NSCDC Akwa Ibom State Command, let alone the Head of Anti-Vandal. The Head of Anti-Vandal at the NSCDC Akwa Ibom State Command Headquarters is SC Akan Ekenem.',
  ],
  relatedNews: [
    { title: "Police arrest 10 suspected cultists over deadly Bayelsa attack" },
    { title: "Police arrest suspected bandit, recover ammunition in Kano" },
    { title: "Oyo APC slams Makinde over call for UN probe into school pupils' rescue" },
  ] as RelatedLink[],
  closingParagraphs: [
    '"The command has and will always cooperate with investigations and will never shield any of its personnel found wanting," he said.',
  ],
};

const topNews: TopNewsItem[] = [
  { title: "Senate identifies soldiers, policeman killed, injured in Oyo", image: "/images/top1.jpg" },
  { title: "Gunmen kill Lagos NURTW organising secretary", image: "/images/top2.jpg" },
  { title: "UPDATED: Reps withdraw own state police bill, consider Tinubu's proposal", image: "/images/top3.jpg" },
  { title: "My husband worked for me for 11 months after losing his pilot job – Businesswoman", image: "/images/top4.jpg" },
  { title: "Atiku demands probe of Gbajabiamila over fresh corruption allegations", image: "/images/top5.jpg" },
  { title: "Dangote dumps naira, begins petrol sales in dollars", image: "/images/top6.jpg" },
  { title: "Fake agency scandal: ICPC begins probe as DG alleges threat to life", image: "/images/top7.jpg" },
];

const shareLinks = [
  { name: "Telegram", icon: "telegram" },
  { name: "X", icon: "x" },
  { name: "Facebook", icon: "facebook" },
  { name: "WhatsApp", icon: "whatsapp" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "Reddit", icon: "reddit" },
];

export default function SinglePage() {
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
              <h1>{article.title}</h1>
              <span className="article__date">{article.date}</span>

              <figure className="article__figure">
                <img src={article.image} alt={article.imageCaption} />
                <figcaption>{article.imageCaption}</figcaption>
              </figure>

              <div className="article__byline">By {article.author}</div>

              {article.paragraphs.slice(0, 4).map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              <div className="article__video" aria-hidden="true">
                <span className="article__videoBadge">PUNCH</span>
              </div>

              {article.paragraphs.slice(4).map((p, i) => (
                <p key={`b-${i}`}>{p}</p>
              ))}

              <aside className="article__related">
                <h3>Related News</h3>
                <ul>
                  {article.relatedNews.map((r) => (
                    <li key={r.title}>
                      <a href="#0">{r.title}</a>
                    </li>
                  ))}
                </ul>
              </aside>

              {article.closingParagraphs.map((p, i) => (
                <p key={`c-${i}`}>{p}</p>
              ))}

              <div className="article__appCta">
                <p>
                  Stay in the know—fast. Get instant alerts, breaking headlines, and exclusive stories with
                  the <strong>Punch News App</strong>. <strong>Download now</strong> and never miss a beat.
                </p>
                <button>Get the Punch News App</button>
              </div>
            </article>

            {/* Right sidebar */}
            <aside className="article__sidebar">
              <div className="article__adBox">
                <img src="/images/ad-app.jpg" alt="Punch News App" />
              </div>
              <div className="article__adBox article__adBox--whatsapp">
                <img src="/images/ad-whatsapp.jpg" alt="Join our WhatsApp channel" />
              </div>
              <div className="article__adBox article__adBox--plain">ADVERTISEMENT</div>
            </aside>
          </div>

          {/* Top News grid */}
          <section className="topNews">
            <div className="sectionTitle">
              <span></span>
              <h2>Top News</h2>
              <div></div>
            </div>

            <div className="topNews__grid">
              <article className="topNews__lead">
                <img src={topNews[0].image} alt={topNews[0].title} />
                <h3>{topNews[0].title}</h3>
              </article>

              {topNews.slice(1).map((item) => (
                <article className="topNews__item" key={item.title}>
                  <img src={item.image} alt={item.title} />
                  <h4>{item.title}</h4>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}