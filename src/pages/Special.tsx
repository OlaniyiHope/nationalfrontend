import "./Special.css";

interface NewsColumn {
  title: string;
  featured: {
    image: string;
    title: string;
  };
  items: string[];
}

const columns: NewsColumn[] = [
  {
    title: "Special Features",
    featured: {
      image: "/images/special-features.jpg",
      title: "Widow seeks justice after speeding convoy kills Enugu police inspector",
    },
    items: [
      "Looting the dead: How accident scenes turn hunting grounds for criminals",
      "Experts worry over drug abuse among SCD patients",
    ],
  },
  {
    title: "Interview",
    featured: {
      image: "/images/interview.jpg",
      title: "Nigerians should reject vote buying to have quality leadership – Ex-envoy, Gana",
    },
    items: [
      "Boys need intentional support, mentoring as much as girls — Rights activist, Oyinlola",
      "UNIOSUN students deserve justice after military invasion — Spokesperson",
    ],
  },
  {
    title: "Spice",
    featured: {
      image: "/images/spice.jpg",
      title: "Versatility key to success in events industry – MC Kajoe",
    },
    items: [
      "Labisi showcases African gospel roots in new EP",
      "How Iyabo Ojo mastered art of staying relevant",
      "Anita Joseph, Caramel Plug trade words over stolen photo",
    ],
  },
  {
    title: "Panorama",
    featured: {
      image: "/images/panorama.jpg",
      title: "Can 12-year basic education fix Nigeria's school crisis?",
    },
    items: [
      "Adeleke will defeat APC with at least 100,000 votes – Osun SSG",
      "Tinubu's state police push: Security solution or 2027 political strategy?",
      "Missing planes, missing answers",
    ],
  },
];

export default function Special() {
  return (
    <section className="newsColumns">
      <div className="newsColumns__grid">
        {columns.map((col) => (
          <div className="newsColumn" key={col.title}>
            <div className="sectionTitle">
              <span></span>
              <h2>{col.title}</h2>
              <div></div>
            </div>

            <article className="newsColumn__featured">
              <img src={col.featured.image} alt={col.featured.title} />
              <div className="newsColumn__overlay">
                <h3>{col.featured.title}</h3>
              </div>
            </article>

            <ul className="newsColumn__list">
              {col.items.map((item) => (
                <li key={item}>
                  <a href="#0">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}