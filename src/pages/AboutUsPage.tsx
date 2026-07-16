import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./AboutPage.css";

interface SocialLink {
  platform: string;
  handle: string;
  icon: string;
}

const paragraphs: string[] = [
  "On August 8, 1970, PUNCH (Nigeria) Limited was registered under the Companies Act of 1968 to engage in the business of publishing newspapers, magazines and other periodicals. It was designed to inform, educate and entertain Nigerians and the world at large.",
  'In 1971, the company made its debut with the publication of HAPPY HOME, a glossy, family-oriented magazine. Its first editor was Bunmi Sofola. On Sunday, March 18, 1973, its first weekly newspaper, SUNDAY PUNCH hit the newsstand. The first editor was Ajibade Fashina Thomas. The newspaper was designed "to give our country a unique Sunday paper which combines the best in serious and popular journalism" with refreshing information and entertainment.',
  'On November 1, 1976, the daily tabloid, THE PUNCH, was born. Designed as "the lively paper for lively minds", it was to address most of the shortcomings and inadequacies of the established Nigerian newspapers and to be "swingingly elegant as well as socially concerned and seriously responsible." Its pioneer editor was Dayo Wright.',
  "In its bid to perform its constitutionally assigned responsibilities, the company was shutdown many times by the powers-that-be. Many of its employees were also harassed and detained by successive military regimes.",
  "The company has a board of directors which is its highest policy-making organ. The current chairman of the board is Mrs. Angela Emuwa. The first chairman was Chief James Olubunmi Aboderin, an accomplished accountant who died in 1984 from a brief illness. The company's policies and directives are implemented by a management team led by the managing director and Editor-in-Chief. The current Managing Director is Mr. Joseph Adeyeye. Though a corporate business entity which exists to make profit, it...",
];

const socialLinks: SocialLink[] = [
  { platform: "Facebook", handle: "@punchnewspaper", icon: "facebook" },
  { platform: "Instagram", handle: "@punchnewspaper", icon: "instagram" },
  { platform: "Twitter", handle: "@mobile_punch", icon: "twitter" },
  { platform: "LinkedIn", handle: "@punchnewspaper", icon: "linkedin" },
  { platform: "YouTube", handle: "@punchnewspaper", icon: "youtube" },
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

            <aside className="aboutFollow">
              <div className="aboutFollow__heading">
                <div></div>
                <span>Follow Us</span>
                <div></div>
              </div>

              <div className="aboutFollow__list">
                {socialLinks.map((s) => {
                  const linkProps = {
                    href: "#0",
                    className: `followItem followItem--${s.icon}`,
                  };
                  return (
                    <a key={s.platform} {...linkProps}>
                      <span className="followItem__icon" aria-hidden="true" />
                      <span className="followItem__handle">{s.handle}</span>
                    </a>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
