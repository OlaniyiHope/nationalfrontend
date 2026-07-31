import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./AboutPage.css";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { IconType } from "react-icons";

interface SocialLink {
  platform: string;
  handle: string;
  icon: IconType;
}
const paragraphs: string[] = [
  "NationalDaily Newspaper is a trusted daily national newspaper dedicated to delivering accurate, timely, and balanced news to readers across the country. With a strong national presence and comprehensive coverage, we report on the stories that matter most—from politics, business, the economy, and education to health, sports, entertainment, technology, and lifestyle.",
"Our mission is to inform, educate, and empower the public through credible journalism that upholds the highest standards of integrity, fairness, and professionalism. We are committed to providing factual reporting, insightful analysis, and diverse perspectives that help our readers understand the issues shaping our nation.",
"At NationalDaily Newspaper, we believe that a well-informed society is the foundation of a strong democracy. Our team of experienced journalists and editors works tirelessly to deliver reliable news and compelling stories that inspire informed discussions and positive change.",
"As a truly national newspaper, we are committed to serving every region and every community, ensuring that the voices and experiences of people across the country are represented. Whether in print or through our digital platforms, National daily Newspaper remains your trusted source for credible news, insightful reporting, and dependable information—every day.",
];

const socialLinks: SocialLink[] = [
  {
    platform: "Facebook",
    handle: "@nationaldailynewspaper",
    icon: FaFacebookF,
  },
  {
    platform: "Instagram",
    handle: "@nationaldailynewspaper",
    icon: FaInstagram,
  },
  {
    platform: "Twitter",
    handle: "@nationaldailynewspaper",
    icon: FaXTwitter,
  },
  {
    platform: "LinkedIn",
    handle: "@nationaldailynewspaper",
    icon: FaLinkedinIn,
  },
  {
    platform: "YouTube",
    handle: "@nationaldailynewspaper",
    icon: FaYoutube,
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />

      <main className="about">
        <div className="container">
          <div className="aboutTitle">
            <span></span>
            <h1>About us</h1>
            <div></div>
          </div>

          <div className="aboutGrid">
            <article className="aboutBody">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </article>

          <div className="aboutFollow__list">
  {socialLinks.map((s) => {
    const Icon = s.icon;

    return (
      <a
        key={s.platform}
        href="#0"
        className="followItem"
      >
        <span className="followItem__icon">
          <Icon />
        </span>

        <span className="followItem__handle">
          {s.handle}
        </span>
      </a>
    );
  })}
</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
