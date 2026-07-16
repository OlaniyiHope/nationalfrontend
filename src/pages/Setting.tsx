import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Settings, User, Mail, Lock, Bell, Shield, Eye,
  EyeOff, FileText, BookOpen, RefreshCw, Search,
  LayoutDashboard, ChevronRight, Save, CheckCircle,
  Smartphone, Globe, Trash2, LogOut, AlertTriangle,
  Moon, Sun, Monitor, Menu, X, BarChart2,
  ToggleLeft, ToggleRight, Key, Download,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",        to: "/dashboard" },
  { icon: User,            label: "My Profile",       to: "/dashboard/profile" },
  { icon: FileText,        label: "Submissions",      to: "/dashboard/submissions",  count: 5 },
  { icon: Eye,             label: "Peer Review",      to: "/dashboard/peer-review",  count: 4 },
  { icon: RefreshCw,       label: "Revisions",        to: "/dashboard/revisions",    count: 2 },
  { icon: BookOpen,        label: "Published",        to: "/dashboard/published",    count: 2 },
  { icon: BarChart2,       label: "Metrics",          to: "/dashboard/metrics" },
  { icon: Search,          label: "Calls for Papers", to: "/publishing/calls",       count: 2 },
  { icon: Settings,        label: "Settings",         to: "/dashboard/settings",     active: true },
];

// ─── Settings Sections ────────────────────────────────────────────────────────

const SETTING_TABS = [
  { key: "account",       label: "Account",        icon: User },
  { key: "security",      label: "Security",       icon: Lock },
  { key: "notifications", label: "Notifications",  icon: Bell },
  { key: "privacy",       label: "Privacy",        icon: Shield },
  { key: "appearance",    label: "Appearance",     icon: Monitor },
  { key: "danger",        label: "Danger Zone",    icon: AlertTriangle },
];

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%", borderRadius: 8,
  border: "1.5px solid #e5e7eb", background: "#fff",
  padding: "0.65rem 0.875rem", fontSize: "0.875rem",
  color: "var(--foreground)", outline: "none",
  fontFamily: "inherit", boxSizing: "border-box",
  transition: "border-color 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", fontWeight: 700,
  letterSpacing: "0.06em", textTransform: "uppercase",
  color: "var(--muted-foreground)", marginBottom: "0.375rem",
};

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer",
        background: checked ? "var(--accent)" : "#d1d5db",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
        padding: 0,
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({ title, description, children }: {
  title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: "1rem" }}>
      <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{title}</h3>
        {description && <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>{description}</p>}
      </div>
      <div style={{ padding: "1.25rem" }}>{children}</div>
    </div>
  );
}

// ─── Setting Row (toggle) ─────────────────────────────────────────────────────

function SettingRow({ label, description, checked, onChange }: {
  label: string; description?: string; checked: boolean; onChange: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid #f9fafb" }}>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>{label}</p>
        {description && <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0.15rem 0 0" }}>{description}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// ─── Mobile Nav Drawer ────────────────────────────────────────────────────────

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40, backdropFilter: "blur(2px)" }} />
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 260, background: "#fff", zIndex: 50, boxShadow: "4px 0 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)", margin: 0 }}>Dashboard</p>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
        <nav style={{ padding: "0.5rem" }}>
          {NAV_ITEMS.map(({ icon: Icon, label, to, count, active }: any) => (
            <Link key={to} to={to} onClick={onClose} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.65rem 1rem", margin: "0.1rem 0", borderRadius: 8, fontSize: "0.875rem", fontWeight: active ? 700 : 500, color: active ? "#fff" : "var(--foreground)", background: active ? "var(--accent)" : "none", textDecoration: "none" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Icon size={15} style={{ opacity: active ? 1 : 0.6 }} /> {label}
              </span>
              {count !== undefined && count > 0 && (
                <span style={{ fontSize: "0.7rem", fontWeight: 800, minWidth: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "#381b92", color: "#fff" }}>
                  {count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  // Account fields
  const [email, setEmail] = useState(user?.email || "");
  const [displayName, setDisplayName] = useState(user?.username || "");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("Africa/Lagos");

  // Notification toggles
  const [notifs, setNotifs] = useState({
    emailSubmission:  true,
    emailReview:      true,
    emailRevision:    true,
    emailAccepted:    true,
    emailNewsletter:  false,
    browserPush:      false,
    reviewReminders:  true,
    deadlineAlerts:   true,
  });

  // Privacy toggles
  const [privacy, setPrivacy] = useState({
    publicProfile:    true,
    showEmail:        false,
    showInstitution:  true,
    showPublications: true,
    indexSearch:      true,
    shareMetrics:     false,
  });

  const toggleNotif = (key: keyof typeof notifs) =>
    setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

  const togglePrivacy = (key: keyof typeof privacy) =>
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Layout>
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>

        {/* ── Desktop Sidebar ───────────────────────────────────────────── */}
        <aside className="hidden md:flex" style={{ width: 240, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "#fafafa", padding: "1.5rem 0", flexDirection: "column" }}>
          <div style={{ padding: "0 1.25rem", marginBottom: "0.5rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>Dashboard</p>
          </div>
          {NAV_ITEMS.map(({ icon: Icon, label, to, count, active }: any) => (
            <Link key={to} to={to} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1.25rem", margin: "0.1rem 0.5rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: active ? 700 : 500, color: active ? "#fff" : "var(--foreground)", background: active ? "var(--accent)" : "none", textDecoration: "none", transition: "background 0.12s" }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(234,88,12,0.06)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Icon size={15} style={{ opacity: active ? 1 : 0.6 }} />{label}
              </span>
              {count !== undefined && count > 0 && (
                <span style={{ fontSize: "0.7rem", fontWeight: 800, minWidth: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "#381b92", color: "#fff" }}>
                  {count}
                </span>
              )}
            </Link>
          ))}
        </aside>

        {/* ── Main ─────────────────────────────────────────────────────── */}
        <main style={{ flex: 1, minWidth: 0, padding: "1.25rem", background: "#f9fafb", overflowX: "hidden" }}>

          {/* Mobile top bar */}
          <div className="flex md:hidden" style={{ alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <button onClick={() => setMobileNavOpen(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.5rem 0.75rem", cursor: "pointer", fontSize: "0.83rem", fontWeight: 600, color: "var(--foreground)" }}>
              <Menu size={16} /> Menu
            </button>
            <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 0.875rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>
              <Save size={13} /> Save
            </button>
          </div>

          {/* Breadcrumb (desktop) */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Dashboard</span>
            <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>Settings</span>
          </div>

          {/* Page header */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div>
              <h1 style={{ fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 800, fontFamily: "Georgia, serif", color: "var(--foreground)", margin: "0 0 0.2rem" }}>
                Settings
              </h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
                Manage your account, privacy, and preferences
              </p>
            </div>
            <button onClick={handleSave} className="hidden md:flex" style={{ alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <Save size={14} /> Save Changes
            </button>
          </div>

          {/* Saved toast */}
          {saved && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "0.65rem 1rem", marginBottom: "1rem" }}>
              <CheckCircle size={15} style={{ color: "#16a34a" }} />
              <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#16a34a" }}>Settings saved successfully.</span>
            </div>
          )}

          {/* Settings tabs + content */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* Tab sidebar */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", flexShrink: 0, width: "100%" }} className="md:w-auto" >
              {/* On mobile: horizontal scrolling tabs */}
              <div className="flex md:hidden" style={{ overflowX: "auto", scrollbarWidth: "none", borderBottom: "1px solid #f3f4f6" }}>
                {SETTING_TABS.map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.65rem 0.875rem", fontSize: "0.78rem", fontWeight: 600, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, color: activeTab === key ? "var(--accent)" : "var(--muted-foreground)", borderBottom: activeTab === key ? "2px solid var(--accent)" : "2px solid transparent" }}>
                    <Icon size={13} />{label}
                  </button>
                ))}
              </div>

              {/* On desktop: vertical tab list */}
              <div className="hidden md:flex" style={{ flexDirection: "column", width: 200, padding: "0.5rem" }}>
                {SETTING_TABS.map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => setActiveTab(key)} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.6rem 0.875rem", borderRadius: 8, fontSize: "0.85rem", fontWeight: activeTab === key ? 700 : 500, background: activeTab === key ? "rgba(234,88,12,0.08)" : "none", color: activeTab === key ? "var(--accent)" : "var(--foreground)", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.12s", width: "100%" }}>
                    <Icon size={15} style={{ opacity: activeTab === key ? 1 : 0.5, flexShrink: 0 }} />
                    {label}
                    {key === "danger" && <AlertTriangle size={12} style={{ color: "#dc2626", marginLeft: "auto" }} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* ── ACCOUNT ─────────────────────────────────────────── */}
              {activeTab === "account" && (
                <>
                  <SectionCard title="Profile Information" description="Update your basic account details">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "1rem" }}>
                      <div>
                        <label style={labelStyle}>Display Name</label>
                        <input style={inputStyle} value={displayName} onChange={e => setDisplayName(e.target.value)}
                          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                          onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address</label>
                        <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} type="email"
                          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                          onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
                      </div>
                      <div>
                        <label style={labelStyle}>Language</label>
                        <select style={{ ...inputStyle, cursor: "pointer" }} value={language} onChange={e => setLanguage(e.target.value)}>
                          <option value="en">English</option>
                          <option value="fr">French</option>
                          <option value="ar">Arabic</option>
                          <option value="sw">Swahili</option>
                          <option value="pt">Portuguese</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Timezone</label>
                        <select style={{ ...inputStyle, cursor: "pointer" }} value={timezone} onChange={e => setTimezone(e.target.value)}>
                          <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                          <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                          <option value="Africa/Cairo">Africa/Cairo (EET)</option>
                          <option value="Africa/Johannesburg">Africa/Johannesburg (SAST)</option>
                          <option value="UTC">UTC</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                        </select>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Linked Accounts" description="Connect your academic identifiers">
                    {[
                      { label: "ORCID iD", placeholder: "0000-0000-0000-0000", icon: Globe, hint: "Your Open Researcher and Contributor ID" },
                      { label: "Google Scholar", placeholder: "Profile URL or ID", icon: Search, hint: "Link your Google Scholar profile" },
                      { label: "ResearchGate", placeholder: "Profile URL", icon: Globe, hint: "Connect your ResearchGate profile" },
                    ].map(({ label, placeholder, icon: Icon, hint }) => (
                      <div key={label} style={{ marginBottom: "1rem" }}>
                        <label style={labelStyle}>{label}</label>
                        <div style={{ position: "relative" }}>
                          <Icon size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--muted-foreground)", pointerEvents: "none" }} />
                          <input
                            style={{ ...inputStyle, paddingLeft: "2.25rem" }}
                            placeholder={placeholder}
                            onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                            onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                          />
                        </div>
                        <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", margin: "0.25rem 0 0" }}>{hint}</p>
                      </div>
                    ))}
                  </SectionCard>

                  <SectionCard title="Data Export" description="Download a copy of your account data">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Export all data</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>Download your profile, submissions, and reviews as a ZIP archive</p>
                      </div>
                      <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.55rem 1rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)", cursor: "pointer" }}>
                        <Download size={14} /> Request Export
                      </button>
                    </div>
                  </SectionCard>
                </>
              )}

              {/* ── SECURITY ────────────────────────────────────────── */}
              {activeTab === "security" && (
                <>
                  <SectionCard title="Change Password" description="Update your password regularly to keep your account secure">
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 440 }}>
                      <div>
                        <label style={labelStyle}>Current Password</label>
                        <div style={{ position: "relative" }}>
                          <input
                            style={inputStyle}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter current password"
                            onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                            onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                          />
                          <button onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0, display: "flex" }}>
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>New Password</label>
                        <div style={{ position: "relative" }}>
                          <input
                            style={inputStyle}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                            onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                          />
                          <button onClick={() => setShowNewPassword(v => !v)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-foreground)", padding: 0, display: "flex" }}>
                            {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label style={labelStyle}>Confirm New Password</label>
                        <input style={inputStyle} type="password" placeholder="Confirm new password"
                          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                          onBlur={e => (e.target.style.borderColor = "#e5e7eb")} />
                      </div>
                      <button style={{ alignSelf: "flex-start", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer" }}>
                        Update Password
                      </button>
                    </div>
                  </SectionCard>

                  <SectionCard title="Two-Factor Authentication" description="Add an extra layer of security to your account">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1rem" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Authenticator App</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>Use an app like Google Authenticator or Authy</p>
                      </div>
                      <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#381b92", color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <Smartphone size={14} /> Enable 2FA
                      </button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>Backup Codes</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0.2rem 0 0" }}>Generate one-time backup codes for account recovery</p>
                      </div>
                      <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.55rem 1rem", fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)", cursor: "pointer", whiteSpace: "nowrap" }}>
                        <Key size={14} /> Generate Codes
                      </button>
                    </div>
                  </SectionCard>

                  <SectionCard title="Active Sessions" description="Manage devices that are currently logged in">
                    {[
                      { device: "Chrome on Windows", location: "Lagos, Nigeria", time: "Active now", current: true },
                      { device: "Safari on iPhone", location: "Lagos, Nigeria", time: "2 hours ago", current: false },
                      { device: "Firefox on macOS", location: "Abuja, Nigeria", time: "3 days ago", current: false },
                    ].map(({ device, location, time, current }) => (
                      <div key={device} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid #f9fafb", gap: "0.75rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: current ? "rgba(234,88,12,0.08)" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Monitor size={16} style={{ color: current ? "var(--accent)" : "var(--muted-foreground)" }} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", margin: 0 }}>
                              {device} {current && <span style={{ fontSize: "0.68rem", background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 4, padding: "0.1rem 0.4rem", marginLeft: 4 }}>Current</span>}
                            </p>
                            <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", margin: "0.1rem 0 0" }}>{location} · {time}</p>
                          </div>
                        </div>
                        {!current && (
                          <button style={{ fontSize: "0.75rem", fontWeight: 600, color: "#dc2626", background: "none", border: "1px solid #fecaca", borderRadius: 6, padding: "0.3rem 0.625rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                            Revoke
                          </button>
                        )}
                      </div>
                    ))}
                    <button style={{ marginTop: "0.75rem", fontSize: "0.78rem", fontWeight: 600, color: "#dc2626", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.3rem", padding: 0 }}>
                      <LogOut size={13} /> Sign out all other sessions
                    </button>
                  </SectionCard>
                </>
              )}

              {/* ── NOTIFICATIONS ───────────────────────────────────── */}
              {activeTab === "notifications" && (
                <>
                  <SectionCard title="Email Notifications" description="Choose which emails you want to receive">
                    <SettingRow label="Submission Updates" description="Confirmations and status changes for your submissions" checked={notifs.emailSubmission} onChange={() => toggleNotif("emailSubmission")} />
                    <SettingRow label="Review Assignments" description="When you are assigned as a peer reviewer" checked={notifs.emailReview} onChange={() => toggleNotif("emailReview")} />
                    <SettingRow label="Revision Requests" description="When editors request changes to your manuscript" checked={notifs.emailRevision} onChange={() => toggleNotif("emailRevision")} />
                    <SettingRow label="Acceptance & Publication" description="When your paper is accepted or published" checked={notifs.emailAccepted} onChange={() => toggleNotif("emailAccepted")} />
                    <SettingRow label="Newsletter & Announcements" description="Updates about new journals, calls for papers, and platform news" checked={notifs.emailNewsletter} onChange={() => toggleNotif("emailNewsletter")} />
                  </SectionCard>

                  <SectionCard title="In-App & Push" description="Real-time alerts within the platform">
                    <SettingRow label="Browser Push Notifications" description="Receive notifications even when not on the site" checked={notifs.browserPush} onChange={() => toggleNotif("browserPush")} />
                    <SettingRow label="Review Deadline Reminders" description="Alerts 7 and 3 days before review deadlines" checked={notifs.reviewReminders} onChange={() => toggleNotif("reviewReminders")} />
                    <SettingRow label="Submission Deadline Alerts" description="Reminders for calls for papers you are tracking" checked={notifs.deadlineAlerts} onChange={() => toggleNotif("deadlineAlerts")} />
                  </SectionCard>
                </>
              )}

              {/* ── PRIVACY ─────────────────────────────────────────── */}
              {activeTab === "privacy" && (
                <>
                  <SectionCard title="Profile Visibility" description="Control who can see your information">
                    <SettingRow label="Public Profile" description="Allow anyone to view your researcher profile" checked={privacy.publicProfile} onChange={() => togglePrivacy("publicProfile")} />
                    <SettingRow label="Show Email Address" description="Display your email on your public profile" checked={privacy.showEmail} onChange={() => togglePrivacy("showEmail")} />
                    <SettingRow label="Show Institution" description="Display your institution and department publicly" checked={privacy.showInstitution} onChange={() => togglePrivacy("showInstitution")} />
                    <SettingRow label="Show Publications" description="Make your publications list visible to other users" checked={privacy.showPublications} onChange={() => togglePrivacy("showPublications")} />
                  </SectionCard>

                  <SectionCard title="Discovery & Analytics" description="Control how you appear in search and metrics">
                    <SettingRow label="Appear in Search Results" description="Allow your profile to be indexed by search engines" checked={privacy.indexSearch} onChange={() => togglePrivacy("indexSearch")} />
                    <SettingRow label="Share Usage Metrics" description="Contribute anonymised usage data to improve the platform" checked={privacy.shareMetrics} onChange={() => togglePrivacy("shareMetrics")} />
                  </SectionCard>
                </>
              )}

              {/* ── APPEARANCE ──────────────────────────────────────── */}
              {activeTab === "appearance" && (
                <>
                  <SectionCard title="Theme" description="Choose your preferred colour scheme">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 140px), 1fr))", gap: "0.75rem" }}>
                      {([
                        { key: "light",  label: "Light",  icon: Sun },
                        { key: "dark",   label: "Dark",   icon: Moon },
                        { key: "system", label: "System", icon: Monitor },
                      ] as const).map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                            padding: "1.25rem 0.75rem", borderRadius: 10, cursor: "pointer",
                            border: theme === key ? "2px solid var(--accent)" : "2px solid #e5e7eb",
                            background: theme === key ? "rgba(234,88,12,0.04)" : "#fff",
                            transition: "all 0.15s",
                          }}
                        >
                          <Icon size={22} style={{ color: theme === key ? "var(--accent)" : "var(--muted-foreground)" }} />
                          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: theme === key ? "var(--accent)" : "var(--foreground)" }}>{label}</span>
                        </button>
                      ))}
                    </div>
                  </SectionCard>

                  <SectionCard title="Display Density" description="Adjust how compact the interface looks">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 140px), 1fr))", gap: "0.75rem" }}>
                      {["Comfortable", "Compact", "Spacious"].map((d, i) => (
                        <button
                          key={d}
                          style={{
                            padding: "0.875rem 0.75rem", borderRadius: 10, cursor: "pointer",
                            border: i === 0 ? "2px solid var(--accent)" : "2px solid #e5e7eb",
                            background: i === 0 ? "rgba(234,88,12,0.04)" : "#fff",
                            fontSize: "0.82rem", fontWeight: 700,
                            color: i === 0 ? "var(--accent)" : "var(--foreground)",
                          }}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </SectionCard>
                </>
              )}

              {/* ── DANGER ZONE ─────────────────────────────────────── */}
              {activeTab === "danger" && (
                <>
                  <SectionCard title="Danger Zone" description="Irreversible actions — proceed with caution">
                    {/* Deactivate */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", padding: "1rem 0", borderBottom: "1px solid #fee2e2" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>Deactivate Account</p>
                        <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0.25rem 0 0", maxWidth: 400 }}>
                          Temporarily disable your account. Your profile and submissions will be hidden but your data will be preserved.
                        </p>
                      </div>
                      <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "none", border: "1px solid #f87171", color: "#dc2626", borderRadius: 8, padding: "0.55rem 1rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                        <EyeOff size={14} /> Deactivate
                      </button>
                    </div>

                    {/* Delete */}
                    <div style={{ paddingTop: "1rem" }}>
                      <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#dc2626", margin: "0 0 0.25rem" }}>Delete Account</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", margin: "0 0 1rem", maxWidth: 440 }}>
                        Permanently delete your account and all associated data — including submissions, reviews, and publications. This action <strong>cannot be undone</strong>.
                      </p>

                      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.875rem" }}>
                          <AlertTriangle size={15} style={{ color: "#dc2626", flexShrink: 0, marginTop: 2 }} />
                          <p style={{ fontSize: "0.78rem", color: "#dc2626", margin: 0 }}>
                            To confirm, type <strong>DELETE</strong> in the box below.
                          </p>
                        </div>
                        <input
                          style={{ ...inputStyle, border: "1.5px solid #fca5a5", maxWidth: 260, marginBottom: "0.75rem" }}
                          placeholder="Type DELETE to confirm"
                          value={deleteConfirm}
                          onChange={e => setDeleteConfirm(e.target.value)}
                          onFocus={e => (e.target.style.borderColor = "#dc2626")}
                          onBlur={e => (e.target.style.borderColor = "#fca5a5")}
                        />
                        <br />
                        <button
                          disabled={deleteConfirm !== "DELETE"}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: deleteConfirm === "DELETE" ? "#dc2626" : "#fca5a5", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.1rem", fontSize: "0.83rem", fontWeight: 700, cursor: deleteConfirm === "DELETE" ? "pointer" : "not-allowed", transition: "background 0.15s" }}
                        >
                          <Trash2 size={14} /> Delete My Account
                        </button>
                      </div>
                    </div>
                  </SectionCard>
                </>
              )}

            </div>
          </div>

          <div style={{ height: "1rem" }} />
        </main>
      </div>
    </Layout>
  );
}
