import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight, ArrowLeft, CheckCircle, ShieldCheck,
  BookOpen, Eye, RefreshCw, FileText, Scale,
  Users, Globe, AlertCircle, ChevronDown,
} from "lucide-react";
import { useJournal } from "@/context/JournalContext";
import StepIndicator from "@/components/StepIndicator";

// ─── Data ─────────────────────────────────────────────────────────────────────

const reviewTypes = [
  { value: "double-blind", label: "Double-Blind Review", desc: "Neither authors nor reviewers know each other's identity. Most common in academic publishing." },
  { value: "single-blind", label: "Single-Blind Review", desc: "Reviewers know the author's identity but authors do not know reviewers." },
  { value: "open",         label: "Open Peer Review",   desc: "Both authors and reviewers are known to each other. Promotes transparency." },
];

const licenseOptions = [
  { value: "cc-by",        label: "CC BY 4.0",        desc: "Most permissive. Allows reuse with attribution." },
  { value: "cc-by-nc",     label: "CC BY-NC 4.0",     desc: "Allows reuse for non-commercial purposes with attribution." },
  { value: "cc-by-nd",     label: "CC BY-ND 4.0",     desc: "Allows redistribution but no derivatives." },
  { value: "cc-by-nc-nd",  label: "CC BY-NC-ND 4.0",  desc: "Most restrictive CC license. Non-commercial, no derivatives." },
];

const referencingStyles = ["APA 7th", "MLA 9th", "Chicago 17th", "Harvard", "Vancouver", "IEEE"];

const embargoOptions = ["No Embargo", "3 Months", "6 Months", "12 Months"];

const retractableReasons = [
  "Data fabrication or falsification",
  "Plagiarism",
  "Duplicate publication",
  "Authorship disputes",
  "Ethical violations",
];

// ─── Shared Styles ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 8,
  border: "1.5px solid #d1d5db",
  background: "#fff",
  padding: "0.65rem 0.875rem",
  fontSize: "0.875rem",
  color: "var(--foreground)",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "var(--foreground)",
  marginBottom: "0.375rem",
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function PolicySection({ icon: Icon, title, children }: {
  icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function RadioOption({ value, label, desc, selected, onChange }: {
  value: string; label: string; desc: string; selected: boolean; onChange: () => void;
}) {
  return (
    <label style={{
      display: "flex", alignItems: "flex-start", gap: "0.875rem", cursor: "pointer",
      background: selected ? "rgba(234,88,12,0.05)" : "#fff",
      border: `1.5px solid ${selected ? "var(--accent)" : "#e5e7eb"}`,
      borderRadius: 10, padding: "0.875rem 1rem", transition: "all 0.15s",
    }}>
      <input type="radio" checked={selected} onChange={onChange}
        style={{ marginTop: 3, accentColor: "var(--accent)", flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)" }}>{label}</div>
        <div style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", marginTop: 2, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </label>
  );
}

function CheckOption({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label style={{
      display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer",
      background: checked ? "rgba(234,88,12,0.04)" : "#f9fafb",
      border: `1.5px solid ${checked ? "var(--accent)" : "#e5e7eb"}`,
      borderRadius: 8, padding: "0.65rem 0.875rem", transition: "all 0.15s",
    }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ width: 15, height: 15, accentColor: "var(--accent)", flexShrink: 0 }} />
      <span style={{ fontSize: "0.83rem", color: "var(--foreground)" }}>{label}</span>
    </label>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Policies() {
  const { setState } = useJournal();
  const navigate = useNavigate();

  const [reviewType, setReviewType]     = useState("double-blind");
  const [license, setLicense]           = useState("cc-by");
  const [embargo, setEmbargo]           = useState("No Embargo");
  const [refStyle, setRefStyle]         = useState("APA 7th");
  const [plagiarismTool, setPlagiarismTool] = useState(true);
  const [aiDisclosure, setAiDisclosure] = useState(true);
  const [dataSharing, setDataSharing]   = useState(false);
  const [retractReasons, setRetractReasons] = useState<string[]>([
    "Data fabrication or falsification", "Plagiarism",
  ]);
  const [authorGuidelines, setAuthorGuidelines] = useState(
    "Manuscripts must be original, unpublished work. Maximum 8,000 words excluding references. All submissions must follow the selected referencing style."
  );
  const [ethicsStatement, setEthicsStatement] = useState(
    "All research involving human participants must include an ethics approval statement. Authors must declare any conflicts of interest."
  );

  const toggleRetract = (val: string) =>
    setRetractReasons(prev => prev.includes(val) ? prev.filter(r => r !== val) : [...prev, val]);

  const handleContinue = () => {
    setState(prev => ({
      ...prev,
      policiesComplete: true,
      policies: { reviewType, license, embargo, refStyle, plagiarismTool, aiDisclosure, dataSharing, retractReasons, authorGuidelines, ethicsStatement },
    }));
    navigate("/submit-journal"); // adjust to your next step route
  };

  return (
    <Layout>
      <div className="py-8">
        <StepIndicator current={3} />

        <div className="mx-auto max-w-3xl space-y-6 px-4 mt-10">

          {/* Header */}
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-primary">
              Journal Policies
            </h1>
            <p className="mt-2 text-muted-foreground">
              Define the editorial standards, publishing policies, and author requirements for your journal.
            </p>
          </div>

          {/* 1 — Peer Review */}
          <PolicySection icon={Eye} title="Peer Review Policy">
            <p className="text-sm text-muted-foreground">
              Select the peer review model your journal will follow.
            </p>
            <div className="space-y-3">
              {reviewTypes.map(rt => (
                <RadioOption key={rt.value} {...rt}
                  selected={reviewType === rt.value}
                  onChange={() => setReviewType(rt.value)} />
              ))}
            </div>
          </PolicySection>

          {/* 2 — Open Access & Licensing */}
          <PolicySection icon={Globe} title="Open Access & Licensing">
            <p className="text-sm text-muted-foreground">
              All journals on Afrika Scholar are open access. Select the Creative Commons license for published articles.
            </p>
            <div className="space-y-3">
              {licenseOptions.map(l => (
                <RadioOption key={l.value} {...l}
                  selected={license === l.value}
                  onChange={() => setLicense(l.value)} />
              ))}
            </div>

            <div style={{ marginTop: "0.5rem" }}>
              <label style={labelStyle}>Embargo Period</label>
              <select style={inputStyle} value={embargo} onChange={e => setEmbargo(e.target.value)}>
                {embargoOptions.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </PolicySection>

          {/* 3 — Publication Ethics */}
          <PolicySection icon={ShieldCheck} title="Publication Ethics">
            <div className="space-y-3">
              <CheckOption
                label="Require plagiarism screening for all submissions"
                checked={plagiarismTool}
                onChange={() => setPlagiarismTool(v => !v)}
              />
              <CheckOption
                label="Require AI-assistance disclosure from authors"
                checked={aiDisclosure}
                onChange={() => setAiDisclosure(v => !v)}
              />
              <CheckOption
                label="Require data sharing / open data statement"
                checked={dataSharing}
                onChange={() => setDataSharing(v => !v)}
              />
            </div>

            <div>
              <label style={labelStyle}>Ethics & Conflict of Interest Statement</label>
              <textarea
                style={{ ...inputStyle, minHeight: 100, resize: "vertical" } as React.CSSProperties}
                value={ethicsStatement}
                onChange={e => setEthicsStatement(e.target.value)}
                rows={4}
              />
            </div>
          </PolicySection>

          {/* 4 — Retraction Policy */}
          <PolicySection icon={RefreshCw} title="Retraction & Correction Policy">
            <p className="text-sm text-muted-foreground">
              Select the grounds on which your journal may retract a published article.
            </p>
            <div className="space-y-2">
              {retractableReasons.map(r => (
                <CheckOption key={r} label={r}
                  checked={retractReasons.includes(r)}
                  onChange={() => toggleRetract(r)} />
              ))}
            </div>
            <div style={{ background: "rgba(234,88,12,0.05)", border: "1px solid rgba(234,88,12,0.15)", borderRadius: 8, padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--foreground)" }}>Note:</strong> Corrections and expressions of concern will follow COPE retraction guidelines regardless of the reasons selected above.
            </div>
          </PolicySection>

          {/* 5 — Author Guidelines */}
          <PolicySection icon={FileText} title="Author Guidelines">
            <div className="space-y-4">
              <div>
                <label style={labelStyle}>Referencing Style</label>
                <select style={inputStyle} value={refStyle} onChange={e => setRefStyle(e.target.value)}>
                  {referencingStyles.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Author Submission Guidelines</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" } as React.CSSProperties}
                  value={authorGuidelines}
                  onChange={e => setAuthorGuidelines(e.target.value)}
                  rows={5}
                  placeholder="Describe word limits, formatting requirements, required sections, file formats..."
                />
              </div>
            </div>
          </PolicySection>

          {/* 6 — Copyright */}
          <PolicySection icon={Scale} title="Copyright Policy">
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 10, padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                <CheckCircle size={18} style={{ color: "#22c55e", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.25rem" }}>
                    Authors retain copyright
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.6 }}>
                    In line with Afrika Scholar's open access policy, authors retain copyright of their published work under the selected Creative Commons license. Afrika Scholar is granted a non-exclusive license to host and distribute the article.
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Summary badge */}
          <div style={{ background: "var(--primary)", borderRadius: 14, padding: "1.25rem 1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
              <CheckCircle size={16} style={{ color: "var(--accent)" }} />
              <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)" }}>
                Policy Summary
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
              {[
                { label: "Review Type",    value: reviewTypes.find(r => r.value === reviewType)?.label ?? "" },
                { label: "License",        value: license.toUpperCase() },
                { label: "Embargo",        value: embargo },
                { label: "Referencing",    value: refStyle },
                { label: "Plagiarism Check", value: plagiarismTool ? "Required" : "Optional" },
                { label: "AI Disclosure",  value: aiDisclosure ? "Required" : "Optional" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-2 pb-8">
            <Button type="button" variant="outline" onClick={() => navigate("/governance")} className="px-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleContinue} className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
              Continue Setup <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
}
