import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import {
  FileText, UserCheck, KeyRound, Layers, Copyright,
  ShieldX, Brain, Users, CreditCard, Lock,
  Landmark, UserX, AlertTriangle, Bell, Mail,
  ChevronRight, Scale,
} from "lucide-react";
import networkImage from "@/assets/network-collaboration.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const lastUpdated = "March 2026";

const sections = [
  { id: "introduction",     label: "Welcome to AfrikaScholar",         icon: FileText },
  { id: "eligibility",      label: "Eligibility",                      icon: UserCheck },
  { id: "accounts",         label: "Account Registration",             icon: KeyRound },
  { id: "services",         label: "Platform Services",                icon: Layers },
  { id: "user-content",     label: "Ownership of User Content",        icon: Copyright },
  { id: "prohibited",       label: "Prohibited Activities",            icon: ShieldX },
  { id: "ai-disclaimer",    label: "AI-Generated Content",             icon: Brain },
  { id: "community",        label: "Community Guidelines",             icon: Users },
  { id: "credits",          label: "Credits & Subscriptions",          icon: CreditCard },
  { id: "privacy",          label: "Privacy & Data Handling",          icon: Lock },
  { id: "ip",               label: "Intellectual Property",            icon: Landmark },
  { id: "termination",      label: "Account Termination",              icon: UserX },
  { id: "liability",        label: "Limitation of Liability",          icon: AlertTriangle },
  { id: "changes",          label: "Updates to Terms",                 icon: Bell },
  { id: "contact",          label: "Contact Information",              icon: Mail },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ id, num, icon: Icon, title }: {
  id: string; num: number; icon: React.ElementType; title: string;
}) {
  return (
    <div id={id} style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem", paddingTop: "0.5rem" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} style={{ color: "var(--accent)" }} />
      </div>
      <div>
        <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: 2 }}>
          Section {num}
        </div>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--foreground)", margin: 0, fontFamily: "Georgia, serif" }}>
          {title}
        </h2>
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0.75rem 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map(item => (
        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
          <span style={{ marginTop: "0.45rem", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function XList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0.75rem 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {items.map(item => (
        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
          <span style={{ marginTop: "0.2rem", width: 18, height: 18, borderRadius: "50%", border: "1.5px solid #ef4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldX size={10} style={{ color: "#ef4444" }} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", margin: "1.25rem 0 0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{ width: 3, height: 14, background: "var(--accent)", borderRadius: 2, display: "inline-block", flexShrink: 0 }} />
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", lineHeight: 1.75, margin: "0.5rem 0" }}>
      {children}
    </p>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--card, #fff)", border: "1px solid var(--border, #e5e7eb)", borderRadius: 14, padding: "1.75rem", marginBottom: "1.25rem" }}>
      {children}
    </div>
  );
}

function InfoBox({ children, variant = "neutral" }: { children: React.ReactNode; variant?: "neutral" | "warning" | "success" }) {
  const colors = {
    neutral:  { bg: "rgba(234,88,12,0.05)",   border: "rgba(234,88,12,0.15)" },
    warning:  { bg: "rgba(239,68,68,0.05)",   border: "rgba(239,68,68,0.2)"  },
    success:  { bg: "rgba(34,197,94,0.05)",   border: "rgba(34,197,94,0.2)"  },
  }[variant];
  return (
    <div style={{ marginTop: "1rem", background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 10, padding: "0.875rem 1rem", fontSize: "0.82rem", color: "var(--muted-foreground)", lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Terms() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[500px]">
        <div className="absolute inset-0">
          <img src={networkImage} alt="AfrikaScholar Terms" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="tos-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary-foreground" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#tos-grid)" />
          </svg>
        </div>
        <div className="container-section relative py-24 md:py-32 text-primary-foreground">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
            <Link to="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>Home</Link>
            <ChevronRight size={13} />
            <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>Terms of Service</span>
          </nav>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Scale size={16} style={{ color: "var(--accent)" }} />
              <p className="text-sm uppercase tracking-wider font-semibold" style={{ color: "var(--accent)" }}>
                Legal
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
              Terms of Service
            </h1>
            <p className="text-lg mb-4 max-w-2xl" style={{ color: "rgba(255,255,255,0.8)" }}>
              These Terms govern your use of AfrikaScholar's research publishing, AI tools, data services, and academic collaboration platform.
            </p>
            <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.5)" }}>
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="container-section" style={{ padding: "2.5rem var(--container-padding, 1.5rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2.5rem", maxWidth: 1100, margin: "0 auto" }} className="tos-layout">

          {/* Sidebar TOC */}
          <aside className="hidden lg:block">
            <div style={{ position: "sticky", top: 88, background: "var(--card, #fff)", border: "1px solid var(--border, #e5e7eb)", borderRadius: 14, padding: "1.25rem" }}>
              <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-foreground)", marginBottom: "0.875rem", paddingLeft: "0.5rem" }}>
                Contents
              </p>
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} style={{
                    display: "flex", alignItems: "center", gap: "0.625rem",
                    padding: "0.45rem 0.625rem", borderRadius: 8, fontSize: "0.8rem",
                    color: "var(--muted-foreground)", textDecoration: "none", transition: "all 0.15s",
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(234,88,12,0.06)"; el.style.color = "var(--accent)"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "none"; el.style.color = "var(--muted-foreground)"; }}
                  >
                    <s.icon size={13} style={{ flexShrink: 0 }} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* 1 — Introduction */}
            <SectionCard>
              <SectionHeading id="introduction" num={1} icon={FileText} title="Welcome to AfrikaScholar" />
              <Body>
                AfrikaScholar is a research intelligence and academic publishing platform designed to help researchers generate papers, publish scholarship, analyze datasets, build research instruments, and collaborate with other academics.
              </Body>
              <Body>
                By accessing or using AfrikaScholar, you agree to comply with these Terms of Service.
              </Body>
              <InfoBox variant="warning">
                <strong style={{ color: "var(--foreground)" }}>Important:</strong> If you do not agree to these terms, you must discontinue use of the platform.
              </InfoBox>
            </SectionCard>

            {/* 2 — Eligibility */}
            <SectionCard>
              <SectionHeading id="eligibility" num={2} icon={UserCheck} title="Eligibility to Use the Platform" />
              <Body>
                Users must be at least 18 years old or have authorization from a supervising institution to use the platform. AfrikaScholar is intended for:
              </Body>
              <BulletList items={["Researchers", "Academics", "Students", "Policy analysts", "Institutions", "Research organizations"]} />
              <Body>Users agree to provide accurate registration information.</Body>
            </SectionCard>

            {/* 3 — Accounts */}
            <SectionCard>
              <SectionHeading id="accounts" num={3} icon={KeyRound} title="Account Registration" />
              <Body>To access certain features, users must create an account. Users are responsible for:</Body>
              <BulletList items={["Maintaining the confidentiality of their login credentials", "All activities conducted through their account"]} />
              <InfoBox>
                AfrikaScholar reserves the right to suspend accounts that violate these Terms.
              </InfoBox>
            </SectionCard>

            {/* 4 — Services */}
            <SectionCard>
              <SectionHeading id="services" num={4} icon={Layers} title="Services Provided by AfrikaScholar" />
              <Body>AfrikaScholar provides several integrated services, including:</Body>

              <SubHeading>Research Paper Generation</SubHeading>
              <Body>AI-assisted tools that help generate structured academic manuscripts. These tools assist researchers but do not replace academic judgment. Users remain responsible for verifying accuracy.</Body>

              <SubHeading>Dataset Exploration and Analysis</SubHeading>
              <Body>Users may upload or analyze datasets through the platform. Analytics tools may generate:</Body>
              <BulletList items={["Visualizations", "Statistical summaries", "Data insights"]} />
              <Body>Users must ensure they have the legal right to upload and analyze the data.</Body>

              <SubHeading>Research Instrument Studio</SubHeading>
              <Body>AfrikaScholar allows users to create interactive research tools, including:</Body>
              <BulletList items={["Survey interfaces", "Statistical calculators", "Experimental tools", "Policy models", "Simulation models"]} />
              <Body>Users are responsible for validating the scientific integrity of these instruments.</Body>

              <SubHeading>AI Slide Builder</SubHeading>
              <Body>The platform can generate academic presentation slides from research topics, outlines, or prompts. Slides may be exported as presentation files.</Body>

              <SubHeading>Research Intelligence Hub</SubHeading>
              <Body>AfrikaScholar provides AI-powered research insights, including:</Body>
              <BulletList items={["Journal recommendations", "Conference alerts", "Stakeholder discovery", "Research gap detection", "Trend analysis"]} />
              <InfoBox>These insights are informational and may not guarantee publication success.</InfoBox>

              <SubHeading>Community Collaboration</SubHeading>
              <Body>Researchers may interact through posts, likes, comments, connections, and direct messages. Users must maintain professional conduct within the community.</Body>
            </SectionCard>

            {/* 5 — User Content */}
            <SectionCard>
              <SectionHeading id="user-content" num={5} icon={Copyright} title="Ownership of User Content" />
              <Body>Users retain ownership of the content they create, including:</Body>
              <BulletList items={["Research papers", "Datasets", "Research instruments", "Presentations", "Community posts"]} />
              <InfoBox variant="neutral">
                By publishing or sharing content on the platform, users grant AfrikaScholar a <strong style={{ color: "var(--foreground)" }}>limited license</strong> to display and distribute that content within the platform.
              </InfoBox>
            </SectionCard>

            {/* 6 — Prohibited */}
            <SectionCard>
              <SectionHeading id="prohibited" num={6} icon={ShieldX} title="Prohibited Activities" />
              <Body>Users may not use the platform to:</Body>
              <XList items={[
                "Submit plagiarized research",
                "Upload illegal or harmful content",
                "Distribute copyrighted material without permission",
                "Harass or abuse other users",
                "Manipulate platform analytics or AI outputs",
                "Attempt to reverse-engineer platform systems",
              ]} />
              <InfoBox variant="warning">
                <strong style={{ color: "var(--foreground)" }}>Accounts violating these rules may be suspended or permanently terminated.</strong>
              </InfoBox>
            </SectionCard>

            {/* 7 — AI Disclaimer */}
            <SectionCard>
              <SectionHeading id="ai-disclaimer" num={7} icon={Brain} title="AI-Generated Content" />
              <Body>AfrikaScholar uses artificial intelligence to assist with:</Body>
              <BulletList items={["Research writing", "Data analysis", "Presentation creation", "Instrument design"]} />
              <InfoBox variant="warning">
                <strong style={{ color: "var(--foreground)" }}>AI outputs may contain errors.</strong> Users must review all AI-generated material before publication. AfrikaScholar is not responsible for academic inaccuracies in AI-generated content.
              </InfoBox>
            </SectionCard>

            {/* 8 — Community */}
            <SectionCard>
              <SectionHeading id="community" num={8} icon={Users} title="Research Community Guidelines" />
              <Body>Users interacting in the community must:</Body>
              <BulletList items={["Maintain academic professionalism", "Avoid harassment or abusive behavior", "Respect intellectual property"]} />
              <Body>Users may report inappropriate content. AfrikaScholar reserves the right to remove harmful posts and take action against accounts that breach community standards.</Body>
            </SectionCard>

            {/* 9 — Credits */}
            <SectionCard>
              <SectionHeading id="credits" num={9} icon={CreditCard} title="Credits and Subscription Plans" />
              <Body>Certain features use a credit-based system. Examples include:</Body>
              <BulletList items={["Paper generation credits", "Dataset generation credits", "Analysis credits", "Instrument generation credits"]} />
              <Body>Credits may be included in subscription plans. Unused credits may expire depending on plan terms.</Body>
            </SectionCard>

            {/* 10 — Privacy */}
            <SectionCard>
              <SectionHeading id="privacy" num={10} icon={Lock} title="Privacy and Data Handling" />
              <Body>AfrikaScholar processes user data in accordance with its Privacy Policy. This may include account information, research content, and platform usage analytics. AfrikaScholar takes reasonable measures to protect user data.</Body>
              <div style={{ marginTop: "1rem" }}>
                <Link to="/privacy" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                  <Lock size={14} /> Read our full Privacy Policy →
                </Link>
              </div>
            </SectionCard>

            {/* 11 — IP */}
            <SectionCard>
              <SectionHeading id="ip" num={11} icon={Landmark} title="Platform Ownership" />
              <Body>All software, interface design, and platform infrastructure are owned by AfrikaScholar. Users may not copy or reproduce platform technology without prior written permission.</Body>
            </SectionCard>

            {/* 12 — Termination */}
            <SectionCard>
              <SectionHeading id="termination" num={12} icon={UserX} title="Account Suspension or Termination" />
              <Body>AfrikaScholar may suspend or terminate accounts that violate these Terms. Users may also delete their account at any time through platform settings.</Body>
              <InfoBox variant="warning">
                Account deletion may result in the permanent loss of stored research tools, outputs, and content. This action cannot be reversed.
              </InfoBox>
            </SectionCard>

            {/* 13 — Liability */}
            <SectionCard>
              <SectionHeading id="liability" num={13} icon={AlertTriangle} title="Platform Liability" />
              <Body>AfrikaScholar is provided on an "as available" basis. The platform does not guarantee:</Body>
              <BulletList items={["Publication outcomes", "Research accuracy", "Platform availability at all times"]} />
              <InfoBox variant="warning">
                <strong style={{ color: "var(--foreground)" }}>AfrikaScholar is not liable</strong> for damages resulting from misuse of the platform, academic errors in AI-generated content, or service interruptions.
              </InfoBox>
            </SectionCard>

            {/* 14 — Changes */}
            <SectionCard>
              <SectionHeading id="changes" num={14} icon={Bell} title="Updates to These Terms" />
              <Body>AfrikaScholar may update these Terms periodically to reflect changes in platform features, legal requirements, or operational practices.</Body>
              <Body>Users will be notified of significant changes via email or platform notification. Continued use of the platform after such updates constitutes acceptance of the revised Terms.</Body>
            </SectionCard>

            {/* 15 — Contact */}
            <SectionCard>
              <SectionHeading id="contact" num={15} icon={Mail} title="Contact Information" />
              <Body>For legal or platform questions regarding these Terms, please contact our team:</Body>
              <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href="mailto:support@afrikascholar.org" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>
                  <Mail size={15} /> support@afrikascholar.org
                </a>
              </div>
              <Body>We aim to respond to all legal inquiries within 5 business days.</Body>
            </SectionCard>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .tos-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </Layout>
  );
}
