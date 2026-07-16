// ─── Open Calls Data ─────────────────────────────────────────────────────────
// This is the single source of truth for all open calls.
// Replace with API fetch when backend is ready.

export interface OpenCall {
  call_id: string;
  journal_id: string;
  journal_name: string;
  special_issue_title: string;
  description: string;
  deadline: string; // ISO date string e.g. "2026-06-30"
  topic_tags: string[];
  status: "open" | "closed";
  guidelines_url?: string;
}

export const openCalls: OpenCall[] = [
  {
    call_id: "AJES2026",
    journal_id: "AJES",
    journal_name: "African Journal of Environmental Science",
    special_issue_title: "Climate Resilience & Adaptation in Sub-Saharan Africa",
    description:
      "We invite original research, review articles, and case studies examining community-led adaptation strategies, policy frameworks, and ecosystem-based approaches to climate resilience across Sub-Saharan Africa.",
    deadline: "2026-06-30",
    topic_tags: ["Climate Change", "Adaptation", "Environmental Policy", "Ecosystem Services"],
    status: "open",
    guidelines_url: "/publishing/guidelines/AJES2026",
  },
  {
    call_id: "AJDI2026SI",
    journal_id: "AJDI",
    journal_name: "African Studies in Digital Innovation",
    special_issue_title: "AI, EdTech & the Future of African Higher Education",
    description:
      "This special issue explores how artificial intelligence and educational technology are reshaping African universities — from curriculum design and student outcomes to institutional governance and digital infrastructure.",
    deadline: "2026-08-15",
    topic_tags: ["AI in Education", "EdTech", "Higher Education", "Digital Transformation"],
    status: "open",
    guidelines_url: "/publishing/guidelines/AJDI2026SI",
  },
  {
    call_id: "JAPHUR2026",
    journal_id: "JAPHR",
    journal_name: "Journal of African Public Health Research",
    special_issue_title: "One Health: Zoonotic Diseases & Pandemic Preparedness",
    description:
      "Submissions are invited for interdisciplinary research at the human-animal-environment interface, with emphasis on zoonotic disease surveillance, outbreak response, and health systems strengthening across Africa.",
    deadline: "2026-05-31",
    topic_tags: ["One Health", "Zoonotic Diseases", "Pandemic Preparedness", "Epidemiology"],
    status: "open",
    guidelines_url: "/publishing/guidelines/JAPHUR2026",
  },
  {
    call_id: "AJFE2025",
    journal_id: "AJFE",
    journal_name: "African Journal of Finance & Economics",
    special_issue_title: "Fintech, DeFi & Financial Inclusion in Emerging African Markets",
    description:
      "This issue focuses on the economic impact of decentralised finance, mobile money, and regulatory sandboxes on financial inclusion in Africa's emerging markets.",
    deadline: "2025-12-31",
    topic_tags: ["Fintech", "DeFi", "Financial Inclusion", "Mobile Money", "Regulation"],
    status: "closed",
    guidelines_url: "/publishing/guidelines/AJFE2025",
  },
  {
    call_id: "JDHA2026",
    journal_id: "JDHA",
    journal_name: "Journal of Digital Health in Africa",
    special_issue_title: "AI-Powered Diagnostics & Telemedicine Across Africa",
    description:
      "We welcome submissions examining AI-driven diagnostic tools, telemedicine deployment challenges, and digital therapeutics within African health systems, particularly in rural and underserved contexts.",
    deadline: "2026-09-30",
    topic_tags: ["AI Diagnostics", "Telemedicine", "Digital Health", "Rural Healthcare"],
    status: "open",
    guidelines_url: "/publishing/guidelines/JDHA2026",
  },
  {
    call_id: "AJAR2026",
    journal_id: "AJAR",
    journal_name: "African Journal of Agricultural Research",
    special_issue_title: "Agri-Tech, Food Systems & Sustainable Development Goals",
    description:
      "Original and review research on agricultural technology adoption, food system transformation, and SDG alignment are invited, with particular attention to smallholder farmer inclusion and policy innovation.",
    deadline: "2026-07-31",
    topic_tags: ["Agri-Tech", "Food Security", "SDGs", "Smallholder Farmers", "Policy"],
    status: "open",
    guidelines_url: "/publishing/guidelines/AJAR2026",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCallById(call_id: string): OpenCall | undefined {
  return openCalls.find(c => c.call_id === call_id);
}

export function isCallExpired(deadline: string): boolean {
  return new Date(deadline) < new Date();
}

export function formatDeadline(deadline: string): string {
  return new Date(deadline).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}
