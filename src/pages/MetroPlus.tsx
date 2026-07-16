import "./MetroPlus.css";

const featured = {
  title: "LASTMA captured 38,000 traffic offenders in Q2 2026 — GM",
  excerpt:
    "LASTMA's General Manager reveals over 38,000 traffic offenders were captured...",
  image: "/images/metro-main.jpg",
};

const leftStories = [
  {
    title: "Woman slumps, dies in Cross River commercial bus",
    image: "/images/news1.jpg",
  },
  {
    title: "VIDEO: Commuters stranded as flood cuts off Ogun road",
    image: "/images/news2.jpg",
  },
  {
    title: "Police seek family of 83-year-old man found in Lagos",
    image: "/images/news3.jpg",
  },
  {
    title: "Soldiers intercept illicit drugs on Lagos-Calabar road",
    image: "/images/news4.jpg",
  },
];

const rightStories = [
  {
    title: "Police arrest three women over sale of four-year-old",
    image: "/images/news5.jpg",
  },
  {
    title: "Oyo firefighters rescue six-month-old baby",
    image: "/images/news6.jpg",
  },
  {
    title: "Nine family members feared killed",
    image: "/images/news7.jpg",
  },
  {
    title: "NDLEA arrests South African woman",
    image: "/images/news8.jpg",
  },
];

export default function MetroPlus() {
  return (
    <section className="metro">

      <div className="sectionTitle">
        <span></span>
        <h2>Metro Plus</h2>
        <div></div>
      </div>

      <div className="metroGrid">

        <article className="metroFeatured">
          <img src={featured.image} alt={featured.title} />

          <h3>{featured.title}</h3>

          <p>{featured.excerpt}</p>
        </article>

        <div className="metroColumn">
          {leftStories.map((story) => (
            <article className="smallNews" key={story.title}>
              <img src={story.image} alt="" />
              <h4>{story.title}</h4>
            </article>
          ))}
        </div>

        <div className="metroColumn">
          {rightStories.map((story) => (
            <article className="smallNews" key={story.title}>
              <img src={story.image} alt="" />
              <h4>{story.title}</h4>
            </article>
          ))}
        </div>

        <aside className="metroAd">

          <h3>Read Daily Herald Anywhere</h3>

          <p>
            Unlock the full print replica on every device.
          </p>

          <button>Subscribe</button>

        </aside>

      </div>

    </section>
  );
}