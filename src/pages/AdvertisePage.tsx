import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./AdvertisePage.css";
import cardImage from "./card.jpeg";
interface StatItem {
  value: string;
  label: string;
  icon: "visitors" | "views" | "followers";
}

interface RateCard {
  label: string;
  href: string;
}

interface CreativeSize {
  label: string;
  dimensions: string;
  image: string;
}

interface AdExecutive {
  name: string;
  email: string;
  phone: string;
}

const stats: StatItem[] = [
  { value: "4M+", label: "Unique Visitors", icon: "visitors" },
  { value: "60M+", label: "Monthly Page Views", icon: "views" },
  { value: "7.5M+", label: "Social Followers", icon: "followers" },
];

const rateCards: RateCard[] = [
  { label: "Print Rate Card", href: "/rate-cards/print.pdf" },
  { label: "SME Rate Card", href: "/rate-cards/sme.pdf" },
  { label: "Video Rate Card", href: "/rate-cards/video.pdf" },
  { label: "Online Rate Card", href: "/rate-cards/online.pdf" },
  { label: "Sports Extra Rate card", href: "/rate-cards/sports-extra.pdf" },
  { label: "Social Media Rate card", href: "/rate-cards/social-media.pdf" },
];

const desktopSizes: CreativeSize[] = [
  { label: "BILLBOARD", dimensions: "970X250", image: "/images/ad-sizes/billboard.png" },
  { label: "LEADERBOARD", dimensions: "728X90", image: "/images/ad-sizes/leaderboard.png" },
  { label: "LARGE LEADERBOARD", dimensions: "970X90", image: "/images/ad-sizes/large-leaderboard.png" },
  { label: "HALF PAGE", dimensions: "300X600", image: "/images/ad-sizes/half-page.png" },
  { label: "MEDIUM RECTANGLE", dimensions: "300X250", image: "/images/ad-sizes/medium-rectangle.png" },
];

const mobileSizes: CreativeSize[] = [
  { label: "MOBILE LEADERBOARD", dimensions: "320X50", image: "/images/ad-sizes/mobile-leaderboard.png" },
  { label: "MOBILE BANNER", dimensions: "300X100", image: "/images/ad-sizes/mobile-banner.png" },
  { label: "MEDIUM RECTANGLE", dimensions: "300X250", image: "/images/ad-sizes/mobile-rectangle.png" },
];

const executives: AdExecutive[] = [
  { name: "Yomi Onileowo", email: "oonileowo@nationaldailynewspaper.com", phone: "08037828693" },
  { name: "Mary Stanley-Ubani", email: "mstanleyubani@nationaldailynewspaper.com", phone: "08023359117" },
  { name: "Abisayo Fakiyesi", email: "afakiyesi@nationaldailynewspaper.com", phone: "08155685676" },
];

function StatIcon({ type }: { type: StatItem["icon"] }) {
  if (type === "visitors") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    );
  }
  if (type === "views") {
    return (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="9" r="3" />
      <circle cx="17" cy="9" r="3" />
      <path d="M2 20c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5" />
      <path d="M13 20c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
    </svg>
  );
}

export default function AdvertisePage() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile">("desktop");
  const activeSizes = activeTab === "desktop" ? desktopSizes : mobileSizes;

  return (
    <>
      <Header />

      <main className="advertise">
        {/* Hero */}
        <section className="advertiseHero">
          <div className="container advertiseHero__grid">
            <div className="advertiseHero__text">
              <p className="advertiseHero__lead">
                National Daily News Paper Digital, the digital publishing division of Nigeria's most
                widely read newspaper, stands as the leading multimedia
                newspaper group in the country, reaching millions of readers
                both locally and internationally.
              </p>
              <p className="advertiseHero__sub">
                We are eager to collaborate with you to align your brand
                message with the ideal audience and achieve your goals.
              </p>

              <a className="downloadMediaBtn" href="/media-kit.pdf" download>
                DOWNLOAD MEDIA
                <span className="downloadMediaBtn__icon" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>

            <div className="advertiseHero__image" aria-hidden="true" />
          </div>
        </section>

        {/* Stats */}
        <section className="advertiseStats">
          <div className="container">
            <h2> National Daily News Paper  Digital reaches a growing global audience</h2>

            <div className="advertiseStats__grid">
              {stats.map((stat) => (
                <div className="statCard" key={stat.label}>
                  <div className="statCard__icon">
                    <StatIcon type={stat.icon} />
                  </div>
                  <div className="statCard__value">{stat.value}</div>
                  <div className="statCard__label">{stat.label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rate cards */}
        <section className="advertiseRates">
          <div className="container">
            <h2>ADVERT RATE CARDS</h2>

            <div className="advertiseRates__grid">
              {rateCards.map((card) => (
                <a className="rateCard" href={card.href} key={card.label} download>
                  {card.label}
                  <span className="rateCard__icon" aria-hidden="true">
                    ↓
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
{/* Newspaper Print Rate Card */}
<section className="advertisePrintRates">
  <div className="container">
    <h2>PRINT ADVERTISEMENT RATE CARD</h2>

    <p className="advertisePrintRates__text">
      View our official National Daily Newspaper print advertisement rate card
      for colour, black &amp; white, special positions, inserts, picture &
      caption, and other advertising options.
    </p>

    <div className="advertisePrintRates__image">
      <img
        src={cardImage}
        alt="National Daily Newspaper Advertisement Rate Card"
      />
    </div>
  </div>
</section>
        {/* Creative sizes */}
        <section className="advertiseCreative">
          <div className="container">
            <h2>ADVERT CREATIVE SIZES</h2>

            <div className="creativeTabs">
              <button
                type="button"
                className={activeTab === "desktop" ? "is-active" : ""}
                onClick={() => setActiveTab("desktop")}
              >
                DESKTOP
              </button>
              <button
                type="button"
                className={activeTab === "mobile" ? "is-active" : ""}
                onClick={() => setActiveTab("mobile")}
              >
                MOBILE
              </button>
            </div>

            <div className="creativeSizes__grid">
              {activeSizes.map((size) => (
                <div className="creativeSize" key={size.label}>
                  <img src={size.image} alt={`${size.label} ${size.dimensions}`} />
                  <span className="creativeSize__label">{size.label}</span>
                  <span className="creativeSize__dims">{size.dimensions}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="advertiseContact">
          <div className="container">
            <h2>Contact us to get started</h2>
            <p> National Daily News Paper  Digital Advert Executives</p>

            <div className="advertiseContact__grid">
              {executives.map((exec) => (
                <div className="execCard" key={exec.name}>
                  <h3>{exec.name}</h3>
                  <a href={`mailto:${exec.email}`}>{exec.email}</a>
                  <a href={`tel:${exec.phone}`}>{exec.phone}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
