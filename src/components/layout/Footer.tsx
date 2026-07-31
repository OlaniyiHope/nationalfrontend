import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "./logo.jpg"
interface FooterLink {
  label: string;
  to: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "News",
    links: [
      { label: "News", to: "/news" },
      { label: "Politics", to: "/politics" },
      { label: "Metro Plus", to: "/metro-plus" },
      { label: "Featured", to: "/featured" },
      { label: "Business", to: "/business" },
    ],
  },
  {
    title: "Sport & Life",
    links: [
      { label: "Sports", to: "/sports" },
      { label: "2026 World Cup", to: "/world-cup" },
      { label: "Entertainment", to: "/entertainment" },
      { label: "Spice", to: "/spice" },
      { label: "HealthWise", to: "/healthwise" },
    ],
  },
  {
    title: "Opinion",
    links: [
      { label: "Editorial", to: "/editorial" },
      { label: "Columns", to: "/columns" },
      { label: "Opinion", to: "/opinion" },
      { label: "Interview", to: "/interview" },
      { label: "Special Features", to: "/special-features" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
           <Link to="/" aria-label="Homepage">
    <img src={logo} alt="The Daily Herald" className="brand__logo" />
  </Link>
  <p className="brand__tagline">Most Widely Read Newspaper</p>
        </div>

        <div className="site-footer__columns">
          {footerColumns.map((col) => (
            <div key={col.title} className="site-footer__column">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="site-footer__newsletter">
          <h3>Stay informed</h3>
          <p>Get our top stories in your inbox every morning.</p>
          <form
            className="site-footer__newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="you@example.com" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p style={{color: "white"}}>© {year} The Daily Herald. All rights reserved.</p>
        <ul className="site-footer__legal">
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/advertise">Advertise with us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
        </ul>
      </div>
    </footer>
  );
}
