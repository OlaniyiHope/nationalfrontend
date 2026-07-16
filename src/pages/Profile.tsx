// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   User, Mail, Phone, MapPin, Building2, Globe,
//   BookOpen, FileText, Edit3, Save, X, Camera,
//   ChevronRight, CheckCircle, Clock, RefreshCw,
//   GraduationCap, Award, ExternalLink, PenLine,
//   Eye, Settings, LayoutDashboard, Search,
// } from "lucide-react";
// import { Layout } from "@/components/layout";
// import { useAuth } from "@/context/AuthContext";

// // mockProfile removed — real data comes from AuthContext + localStorage below

// const stats = [
//   { icon: FileText,    label: "Submissions",  value: 6  },
//   { icon: BookOpen,    label: "Published",    value: 2  },
//   { icon: Eye,         label: "Citations",    value: 47 },
//   { icon: RefreshCw,   label: "Under Review", value: 2  },
// ];

// // ─── Shared styles ────────────────────────────────────────────────────────────

// const inputStyle: React.CSSProperties = {
//   width: "100%", borderRadius: 8,
//   border: "1.5px solid #e5e7eb", background: "#fff",
//   padding: "0.65rem 0.875rem", fontSize: "0.875rem",
//   color: "var(--foreground)", outline: "none",
//   fontFamily: "inherit", boxSizing: "border-box",
//   transition: "border-color 0.15s",
// };

// const labelStyle: React.CSSProperties = {
//   display: "block", fontSize: "0.72rem", fontWeight: 700,
//   letterSpacing: "0.06em", textTransform: "uppercase",
//   color: "var(--muted-foreground)", marginBottom: "0.375rem",
// };

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function SectionCard({ title, children, onEdit, editing }: {
//   title: string; children: React.ReactNode;
//   onEdit?: () => void; editing?: boolean;
// }) {
//   return (
//     <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: "1.25rem" }}>
//       <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
//         <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{title}</h3>
//         {onEdit && (
//           <button
//             onClick={onEdit}
//             style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: editing ? "var(--accent)" : "var(--muted-foreground)", padding: "0.25rem 0.5rem", borderRadius: 6, transition: "color 0.12s" }}
//           >
//             {editing ? <><X size={13} /> Cancel</> : <><Edit3 size={13} /> Edit</>}
//           </button>
//         )}
//       </div>
//       <div style={{ padding: "1.25rem" }}>{children}</div>
//     </div>
//   );
// }

// function FGrid({ children }: { children: React.ReactNode }) {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1rem" }}>
//       {children}
//     </div>
//   );
// }

// function Field({ label, value, editing, field, onChange, icon: Icon }: {
//   label: string; value: string; editing: boolean;
//   field: string; onChange: (f: string, v: string) => void;
//   icon?: React.ElementType;
// }) {
//   return (
//     <div>
//       <label style={labelStyle}>{label}</label>
//       {editing ? (
//         <input style={inputStyle} value={value} onChange={e => onChange(field, e.target.value)}
//           onFocus={e => (e.target.style.borderColor = "var(--accent)")}
//           onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
//         />
//       ) : (
//         <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: value ? "var(--foreground)" : "var(--muted-foreground)", padding: "0.5rem 0" }}>
//           {Icon && <Icon size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />}
//           {value || <span style={{ fontStyle: "italic" }}>Not set</span>}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function Profile() {
//   const { user } = useAuth();

//   // Merge auth user data with any extra profile fields saved locally
//   const savedExtra = (() => {
//     try { return JSON.parse(localStorage.getItem("as_profile_extra") || "{}"); }
//     catch { return {}; }
//   })();

//   const [profile, setProfile] = useState({
//     username:          user?.username     || "",
//     displayName:       savedExtra.displayName  || user?.username || "",
//     email:             user?.email        || "",
//     phone:             savedExtra.phone        || "",
 
//     title:             savedExtra.title        || "",
//     institution:       savedExtra.institution  || "",
//     department:        savedExtra.department   || "",
//     country:           savedExtra.country      || "",
//     city:              savedExtra.city         || "",
//     website:           savedExtra.website      || "",
//     orcid:             savedExtra.orcid        || "",
//     bio:               savedExtra.bio          || "",
//     researchInterests: savedExtra.researchInterests || [],

//   });
//   const [editingBasic, setEditingBasic]   = useState(false);
//   const [editingAbout, setEditingAbout]   = useState(false);
//   const [editingContact, setEditingContact] = useState(false);
//   const [saved, setSaved]           = useState(false);
//   const [newInterest, setNewInterest] = useState("");

//   const handleChange = (field: string, value: string) =>
//     setProfile(prev => ({ ...prev, [field]: value }));

//   const handleSave = () => {
//     // Persist all editable extra fields (not username/email/role — those come from auth)
//     const extra = {
//       displayName:       profile.displayName,
//       phone:             profile.phone,
//       title:             profile.title,
//       institution:       profile.institution,
//       department:        profile.department,
//       country:           profile.country,
//       city:              profile.city,
//       website:           profile.website,
//       orcid:             profile.orcid,
//       bio:               profile.bio,
//       researchInterests: profile.researchInterests,
//     };
//     localStorage.setItem("as_profile_extra", JSON.stringify(extra));
//     setEditingBasic(false);
//     setEditingAbout(false);
//     setEditingContact(false);
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2500);
//   };

//   const addInterest = () => {
//     if (newInterest.trim() && !profile.researchInterests.includes(newInterest.trim())) {
//       setProfile(prev => ({ ...prev, researchInterests: [...prev.researchInterests, newInterest.trim()] }));
//       setNewInterest("");
//     }
//   };

//   const removeInterest = (tag: string) =>
//     setProfile(prev => ({ ...prev, researchInterests: prev.researchInterests.filter(r => r !== tag) }));

//   return (
//     <Layout>
//       <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>

//         {/* ── Sidebar ──────────────────────────────────────────────────────── */}
//         <aside style={{ width: 240, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "#fafafa", padding: "1.5rem 0" }} className="hidden md:block">
//           <div style={{ padding: "0 1.25rem", marginBottom: "0.5rem" }}>
//             <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
//               Dashboard
//             </p>
//           </div>
//           {[
//             { icon: LayoutDashboard, label: "Dashboard",          to: "/dashboard" },
//             { icon: User,            label: "My Profile",         to: "/dashboard/profile",      active: true },
//             { icon: FileText,        label: "Submissions",        to: "/dashboard/submissions",  count: 5 },
//             { icon: Eye,             label: "Peer Review",        to: "/dashboard/peer-review",  count: 4 },
//             { icon: RefreshCw,       label: "Revisions",          to: "/dashboard/revisions",    count: 2 },
//             { icon: BookOpen,        label: "Published",          to: "/dashboard/published",    count: 2 },
//             { icon: Search,          label: "Calls for Papers",   to: "/publishing/calls",       count: 2 },
//             { icon: Settings,        label: "Settings",           to: "/dashboard/settings" },
//           ].map(({ icon: Icon, label, to, count, active }: any) => (
//             <Link key={to} to={to} style={{
//               display: "flex", alignItems: "center", justifyContent: "space-between",
//               padding: "0.6rem 1.25rem", margin: "0.1rem 0.5rem", borderRadius: 8,
//               fontSize: "0.85rem", fontWeight: active ? 700 : 500,
//               color: active ? "#fff" : "var(--foreground)",
//               background: active ? "var(--accent)" : "none",
//               textDecoration: "none", transition: "background 0.12s",
//             }}
//               onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(234,88,12,0.06)"; }}
//               onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
//             >
//               <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
//                 <Icon size={15} style={{ opacity: active ? 1 : 0.6 }} /> {label}
//               </span>
//               {count !== undefined && (
//                 <span style={{ fontSize: "0.7rem", fontWeight: 800, minWidth: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "var(--primary)", color: "#fff" }}>
//                   {count}
//                 </span>
//               )}
//             </Link>
//           ))}
//         </aside>

//         {/* ── Main ─────────────────────────────────────────────────────────── */}
//         <main style={{ flex: 1, padding: "2rem", maxWidth: "calc(100% - 240px)", overflowX: "hidden" }}>

//           {/* Breadcrumb */}
//           <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
//             <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Dashboard</span>
//             <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
//             <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>My Profile</span>
//           </div>

//           {/* Save toast */}
//           {saved && (
//             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "0.65rem 1rem", marginBottom: "1.25rem" }}>
//               <CheckCircle size={15} style={{ color: "#16a34a" }} />
//               <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#16a34a" }}>Profile saved successfully.</span>
//             </div>
//           )}

//           {/* Profile hero card */}
//           <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: "1.25rem" }}>
//             {/* Banner */}
//             <div style={{ height: 80, background: "linear-gradient(135deg, var(--primary) 0%, #381b92 100%)", position: "relative" }}>
//               <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
//                 <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
//                   <defs><pattern id="p-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.5" fill="white" /></pattern></defs>
//                   <rect width="100" height="100" fill="url(#p-dots)" />
//                 </svg>
//               </div>
//             </div>

//             <div style={{ padding: "0 1.5rem 1.5rem", position: "relative" }}>
//               {/* Avatar */}
//               <div style={{ position: "relative", display: "inline-block", marginTop: -36 }}>
//                 <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#381b92", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 800, border: "3px solid #fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
//                   {profile.displayName.split(" ").map(n => n[0]).join("").slice(0, 2)}
//                 </div>
//                 <button style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--accent)", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
//                   <Camera size={10} style={{ color: "#fff" }} />
//                 </button>
//               </div>

//               <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
//                 <div>
//                   <h1 style={{ fontSize: "1.25rem", fontWeight: 800, fontFamily: "Georgia, serif", color: "var(--foreground)", margin: "0 0 0.2rem" }}>
//                     {profile.displayName}
//                   </h1>
//                   <p style={{ fontSize: "0.83rem", color: "var(--muted-foreground)", margin: "0 0 0.5rem" }}>
//                     {profile.title} · {profile.institution}
//                   </p>
//                   <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    
                  
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleSave}
//                   style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}
//                   onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
//                   onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
//                 >
//                   <Save size={14} /> Save Changes
//                 </button>
//               </div>

//               {/* Stats */}
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #f3f4f6" }}>
//                 {stats.map(({ icon: Icon, label, value }) => (
//                   <div key={label} style={{ textAlign: "center" }}>
//                     <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--foreground)" }}>{value}</div>
//                     <div style={{ fontSize: "0.7rem", color: "var(--muted-foreground)", marginTop: 1 }}>{label}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Basic Info */}
//           <SectionCard title="Basic Information" onEdit={() => setEditingBasic(v => !v)} editing={editingBasic}>
//             <FGrid>
//               <Field label="Display Name"  value={profile.displayName}  field="displayName"  editing={editingBasic} onChange={handleChange} icon={User} />
//               <Field label="Username"      value={profile.username}      field="username"      editing={editingBasic} onChange={handleChange} icon={User} />
//               <Field label="Title / Role"  value={profile.title}         field="title"         editing={editingBasic} onChange={handleChange} icon={GraduationCap} />
//               <Field label="Institution"   value={profile.institution}   field="institution"   editing={editingBasic} onChange={handleChange} icon={Building2} />
//               <Field label="Department"    value={profile.department}    field="department"    editing={editingBasic} onChange={handleChange} icon={Building2} />
//               <Field label="Country"       value={profile.country}       field="country"       editing={editingBasic} onChange={handleChange} icon={MapPin} />
//             </FGrid>
//           </SectionCard>

//           {/* Contact */}
//           <SectionCard title="Contact Details" onEdit={() => setEditingContact(v => !v)} editing={editingContact}>
//             <FGrid>
//               <Field label="Email"    value={profile.email}   field="email"   editing={editingContact} onChange={handleChange} icon={Mail} />
//               <Field label="Phone"    value={profile.phone}   field="phone"   editing={editingContact} onChange={handleChange} icon={Phone} />
//               <Field label="City"     value={profile.city}    field="city"    editing={editingContact} onChange={handleChange} icon={MapPin} />
//               <Field label="Website"  value={profile.website} field="website" editing={editingContact} onChange={handleChange} icon={Globe} />
//               <div style={{ gridColumn: "1 / -1" }}>
//                 <Field label="ORCID iD" value={profile.orcid} field="orcid" editing={editingContact} onChange={handleChange} icon={Award} />
//                 {!editingContact && profile.orcid && (
//                   <a href={`https://orcid.org/${profile.orcid}`} target="_blank" rel="noopener noreferrer"
//                     style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--accent)", textDecoration: "none", marginTop: "0.25rem" }}>
//                     <ExternalLink size={11} /> View ORCID Profile
//                   </a>
//                 )}
//               </div>
//             </FGrid>
//           </SectionCard>

//           {/* About / Bio */}
//           <SectionCard title="About & Bio" onEdit={() => setEditingAbout(v => !v)} editing={editingAbout}>
//             <div>
//               <label style={labelStyle}>Bio</label>
//               {editingAbout ? (
//                 <textarea
//                   style={{ ...inputStyle, minHeight: 120, resize: "vertical" } as React.CSSProperties}
//                   value={profile.bio}
//                   onChange={e => handleChange("bio", e.target.value)}
//                   rows={5}
//                   onFocus={e => (e.target.style.borderColor = "var(--accent)")}
//                   onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
//                 />
//               ) : (
//                 <p style={{ fontSize: "0.875rem", color: "var(--foreground)", lineHeight: 1.7, margin: "0.5rem 0 1.25rem" }}>
//                   {profile.bio || <span style={{ fontStyle: "italic", color: "var(--muted-foreground)" }}>No bio added yet.</span>}
//                 </p>
//               )}

//               {/* Research interests */}
//               <label style={{ ...labelStyle, marginTop: "1rem" }}>Research Interests</label>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: editingAbout ? "0.75rem" : 0 }}>
//                 {profile.researchInterests.map(tag => (
//                   <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.2)", color: "var(--accent)", borderRadius: 999, padding: "0.25rem 0.75rem", fontSize: "0.78rem", fontWeight: 600 }}>
//                     {tag}
//                     {editingAbout && (
//                       <button onClick={() => removeInterest(tag)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", padding: 0, display: "flex", alignItems: "center", marginLeft: 2 }}>
//                         <X size={11} />
//                       </button>
//                     )}
//                   </span>
//                 ))}
//               </div>
//               {editingAbout && (
//                 <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
//                   <input
//                     style={{ ...inputStyle, flex: 1, maxWidth: 260 }}
//                     placeholder="Add a research interest..."
//                     value={newInterest}
//                     onChange={e => setNewInterest(e.target.value)}
//                     onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addInterest(); } }}
//                     onFocus={e => (e.target.style.borderColor = "var(--accent)")}
//                     onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
//                   />
//                   <button onClick={addInterest} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem 1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer" }}>
//                     Add
//                   </button>
//                 </div>
//               )}
//             </div>
//           </SectionCard>

//         </main>
//       </div>
//     </Layout>
//   );
// }
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, Mail, Phone, MapPin, Building2, Globe,
  BookOpen, FileText, Edit3, Save, X, Camera,
  ChevronRight, CheckCircle, RefreshCw,
  GraduationCap, Award, ExternalLink,
  Eye, Settings, LayoutDashboard, Search, Menu,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { icon: FileText,  label: "Submissions",  value: 6  },
  { icon: BookOpen,  label: "Published",    value: 2  },
  { icon: Eye,       label: "Citations",    value: 47 },
  { icon: RefreshCw, label: "Under Review", value: 2  },
];

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",        to: "/dashboard" },
  { icon: User,            label: "My Profile",       to: "/dashboard/profile",     active: true },
  { icon: FileText,        label: "Submissions",      to: "/dashboard/submissions", count: 5 },
  { icon: Eye,             label: "Peer Review",      to: "/dashboard/peer-review", count: 4 },
  { icon: RefreshCw,       label: "Revisions",        to: "/dashboard/revisions",   count: 2 },
  { icon: BookOpen,        label: "Published",        to: "/dashboard/published",   count: 2 },
  { icon: Search,          label: "Calls for Papers", to: "/publishing/calls",      count: 2 },
  { icon: Settings,        label: "Settings",         to: "/dashboard/settings" },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

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

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ title, children, onEdit, editing }: {
  title: string; children: React.ReactNode;
  onEdit?: () => void; editing?: boolean;
}) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.875rem 1rem", borderBottom: "1px solid #f3f4f6", background: "#fafafa" }}>
        <h3 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--foreground)", margin: 0 }}>{title}</h3>
        {onEdit && (
          <button
            onClick={onEdit}
            style={{ display: "flex", alignItems: "center", gap: "0.375rem", background: "none", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: editing ? "var(--accent)" : "var(--muted-foreground)", padding: "0.25rem 0.5rem", borderRadius: 6, transition: "color 0.12s" }}
          >
            {editing ? <><X size={13} /> Cancel</> : <><Edit3 size={13} /> Edit</>}
          </button>
        )}
      </div>
      <div style={{ padding: "1rem" }}>{children}</div>
    </div>
  );
}

function FGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))", gap: "0.875rem" }}>
      {children}
    </div>
  );
}

function Field({ label, value, editing, field, onChange, icon: Icon }: {
  label: string; value: string; editing: boolean;
  field: string; onChange: (f: string, v: string) => void;
  icon?: React.ElementType;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {editing ? (
        <input
          style={inputStyle}
          value={value}
          onChange={e => onChange(field, e.target.value)}
          onFocus={e => (e.target.style.borderColor = "var(--accent)")}
          onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
        />
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: value ? "var(--foreground)" : "var(--muted-foreground)", padding: "0.4rem 0", wordBreak: "break-word", minWidth: 0 }}>
          {Icon && <Icon size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />}
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
            {value || <span style={{ fontStyle: "italic" }}>Not set</span>}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────

function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 40, backdropFilter: "blur(2px)" }}
      />
      {/* Drawer */}
      <div style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 260,
        background: "#fff", zIndex: 50, boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1rem", borderBottom: "1px solid #f3f4f6" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)", margin: 0 }}>
            Dashboard
          </p>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={18} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
        <nav style={{ padding: "0.5rem" }}>
          {NAV_ITEMS.map(({ icon: Icon, label, to, count, active }: any) => (
            <Link
              key={to} to={to} onClick={onClose}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.65rem 1rem", margin: "0.1rem 0", borderRadius: 8,
                fontSize: "0.875rem", fontWeight: active ? 700 : 500,
                color: active ? "#fff" : "var(--foreground)",
                background: active ? "var(--accent)" : "none",
                textDecoration: "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Icon size={15} style={{ opacity: active ? 1 : 0.6 }} /> {label}
              </span>
              {count !== undefined && (
                <span style={{ fontSize: "0.7rem", fontWeight: 800, minWidth: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "var(--primary)", color: "#fff" }}>
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function Profile() {
  const { user } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const savedExtra = (() => {
    try { return JSON.parse(localStorage.getItem("as_profile_extra") || "{}"); }
    catch { return {}; }
  })();

  const [profile, setProfile] = useState({
    username:          user?.username          || "",
    displayName:       savedExtra.displayName  || user?.username || "",
    email:             user?.email             || "",
    phone:             savedExtra.phone        || "",
    title:             savedExtra.title        || "",
    institution:       savedExtra.institution  || "",
    department:        savedExtra.department   || "",
    country:           savedExtra.country      || "",
    city:              savedExtra.city         || "",
    website:           savedExtra.website      || "",
    orcid:             savedExtra.orcid        || "",
    bio:               savedExtra.bio          || "",
    researchInterests: savedExtra.researchInterests || [],
  });

  const [editingBasic,   setEditingBasic]   = useState(false);
  const [editingAbout,   setEditingAbout]   = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [saved,          setSaved]          = useState(false);
  const [newInterest,    setNewInterest]    = useState("");

  const handleChange = (field: string, value: string) =>
    setProfile(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const extra = {
      displayName:       profile.displayName,
      phone:             profile.phone,
      title:             profile.title,
      institution:       profile.institution,
      department:        profile.department,
      country:           profile.country,
      city:              profile.city,
      website:           profile.website,
      orcid:             profile.orcid,
      bio:               profile.bio,
      researchInterests: profile.researchInterests,
    };
    localStorage.setItem("as_profile_extra", JSON.stringify(extra));
    setEditingBasic(false);
    setEditingAbout(false);
    setEditingContact(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.researchInterests.includes(newInterest.trim())) {
      setProfile(prev => ({ ...prev, researchInterests: [...prev.researchInterests, newInterest.trim()] }));
      setNewInterest("");
    }
  };

  const removeInterest = (tag: string) =>
    setProfile(prev => ({ ...prev, researchInterests: prev.researchInterests.filter(r => r !== tag) }));

  const initials = profile.displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2) || "?";

  return (
    <Layout>
      {/* ── Mobile Nav Drawer ───────────────────────────────────────────── */}
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)", position: "relative" }}>

        {/* ── Desktop Sidebar ──────────────────────────────────────────────── */}
        <aside
          className="hidden md:flex"
          style={{ width: 240, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "#fafafa", padding: "1.5rem 0", flexDirection: "column" }}
        >
          <div style={{ padding: "0 1.25rem", marginBottom: "0.5rem" }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}>
              Dashboard
            </p>
          </div>
          {NAV_ITEMS.map(({ icon: Icon, label, to, count, active }: any) => (
            <Link
              key={to} to={to}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.6rem 1.25rem", margin: "0.1rem 0.5rem", borderRadius: 8,
                fontSize: "0.85rem", fontWeight: active ? 700 : 500,
                color: active ? "#fff" : "var(--foreground)",
                background: active ? "var(--accent)" : "none",
                textDecoration: "none", transition: "background 0.12s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(234,88,12,0.06)"; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = "none"; }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                <Icon size={15} style={{ opacity: active ? 1 : 0.6 }} /> {label}
              </span>
              {count !== undefined && (
                <span style={{ fontSize: "0.7rem", fontWeight: 800, minWidth: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.25)" : "var(--primary)", color: "#fff" }}>
                  {count}
                </span>
              )}
            </Link>
          ))}
        </aside>

        {/* ── Main ─────────────────────────────────────────────────────────── */}
        <main style={{ flex: 1, minWidth: 0, padding: "1.25rem", overflowX: "hidden" }}>

          {/* Mobile top bar */}
          <div
            className="flex md:hidden"
            style={{ alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}
          >
            <button
              onClick={() => setMobileNavOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "0.5rem 0.75rem", cursor: "pointer", fontSize: "0.83rem", fontWeight: 600, color: "var(--foreground)" }}
            >
              <Menu size={16} /> Menu
            </button>
            <button
              onClick={handleSave}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.5rem 0.875rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer" }}
            >
              <Save size={13} /> Save
            </button>
          </div>

          {/* Desktop breadcrumb */}
          <div
            className="hidden md:flex"
            style={{ alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>Dashboard</span>
            <ChevronRight size={12} style={{ color: "var(--muted-foreground)" }} />
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--foreground)" }}>My Profile</span>
          </div>

          {/* Save toast */}
          {saved && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: "0.65rem 1rem", marginBottom: "1rem" }}>
              <CheckCircle size={15} style={{ color: "#16a34a" }} />
              <span style={{ fontSize: "0.83rem", fontWeight: 600, color: "#16a34a" }}>Profile saved successfully.</span>
            </div>
          )}

          {/* ── Profile Hero Card ─────────────────────────────────────────── */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", marginBottom: "1rem" }}>
            {/* Banner */}
            <div style={{ height: 72, background: "linear-gradient(135deg, var(--primary) 0%, #381b92 100%)", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.08 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs><pattern id="p-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.5" fill="white" /></pattern></defs>
                  <rect width="100" height="100" fill="url(#p-dots)" />
                </svg>
              </div>
            </div>

            <div style={{ padding: "0 1rem 1.25rem", position: "relative" }}>
              {/* Avatar row */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginTop: -32 }}>
                <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#381b92", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 800, border: "3px solid #fff", boxShadow: "0 2px 12px rgba(0,0,0,0.15)", userSelect: "none" }}>
                    {initials}
                  </div>
                  <button style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--accent)", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Camera size={10} style={{ color: "#fff" }} />
                  </button>
                </div>

                {/* Desktop-only Save button in hero */}
                <button
                  onClick={handleSave}
                  className="hidden md:flex"
                  style={{ alignItems: "center", gap: "0.5rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.55rem 1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer", transition: "opacity 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>

              {/* Name / title */}
              <div style={{ marginTop: "0.75rem" }}>
                <h1 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", fontWeight: 800, fontFamily: "Georgia, serif", color: "var(--foreground)", margin: "0 0 0.2rem", lineHeight: 1.2 }}>
                  {profile.displayName || <span style={{ color: "var(--muted-foreground)", fontStyle: "italic" }}>Your Name</span>}
                </h1>
                <p style={{ fontSize: "0.82rem", color: "var(--muted-foreground)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {[profile.title, profile.institution].filter(Boolean).join(" · ") || <span style={{ fontStyle: "italic" }}>No title or institution set</span>}
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f3f4f6" }}>
                {stats.map(({ label, value }) => (
                  <div key={label} style={{ textAlign: "center", padding: "0.25rem 0" }}>
                    <div style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", fontWeight: 800, color: "var(--foreground)" }}>{value}</div>
                    <div style={{ fontSize: "clamp(0.6rem, 2vw, 0.7rem)", color: "var(--muted-foreground)", marginTop: 1, lineHeight: 1.2 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Basic Info ────────────────────────────────────────────────── */}
          <SectionCard title="Basic Information" onEdit={() => setEditingBasic(v => !v)} editing={editingBasic}>
            <FGrid>
              <Field label="Display Name" value={profile.displayName} field="displayName" editing={editingBasic} onChange={handleChange} icon={User} />
              <Field label="Username"     value={profile.username}    field="username"    editing={editingBasic} onChange={handleChange} icon={User} />
              <Field label="Title / Role" value={profile.title}       field="title"       editing={editingBasic} onChange={handleChange} icon={GraduationCap} />
              <Field label="Institution"  value={profile.institution} field="institution" editing={editingBasic} onChange={handleChange} icon={Building2} />
              <Field label="Department"   value={profile.department}  field="department"  editing={editingBasic} onChange={handleChange} icon={Building2} />
              <Field label="Country"      value={profile.country}     field="country"     editing={editingBasic} onChange={handleChange} icon={MapPin} />
            </FGrid>
          </SectionCard>

          {/* ── Contact ───────────────────────────────────────────────────── */}
          <SectionCard title="Contact Details" onEdit={() => setEditingContact(v => !v)} editing={editingContact}>
            <FGrid>
              <Field label="Email"   value={profile.email}   field="email"   editing={editingContact} onChange={handleChange} icon={Mail} />
              <Field label="Phone"   value={profile.phone}   field="phone"   editing={editingContact} onChange={handleChange} icon={Phone} />
              <Field label="City"    value={profile.city}    field="city"    editing={editingContact} onChange={handleChange} icon={MapPin} />
              <Field label="Website" value={profile.website} field="website" editing={editingContact} onChange={handleChange} icon={Globe} />
              <div style={{ gridColumn: "1 / -1" }}>
                <Field label="ORCID iD" value={profile.orcid} field="orcid" editing={editingContact} onChange={handleChange} icon={Award} />
                {!editingContact && profile.orcid && (
                  <a
                    href={`https://orcid.org/${profile.orcid}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--accent)", textDecoration: "none", marginTop: "0.25rem" }}
                  >
                    <ExternalLink size={11} /> View ORCID Profile
                  </a>
                )}
              </div>
            </FGrid>
          </SectionCard>

          {/* ── About / Bio ───────────────────────────────────────────────── */}
          <SectionCard title="About & Bio" onEdit={() => setEditingAbout(v => !v)} editing={editingAbout}>
            <div>
              <label style={labelStyle}>Bio</label>
              {editingAbout ? (
                <textarea
                  style={{ ...inputStyle, minHeight: 100, resize: "vertical" } as React.CSSProperties}
                  value={profile.bio}
                  onChange={e => handleChange("bio", e.target.value)}
                  rows={4}
                  onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                />
              ) : (
                <p style={{ fontSize: "0.875rem", color: profile.bio ? "var(--foreground)" : "var(--muted-foreground)", lineHeight: 1.7, margin: "0.4rem 0 1rem", fontStyle: profile.bio ? "normal" : "italic" }}>
                  {profile.bio || "No bio added yet."}
                </p>
              )}

              <label style={{ ...labelStyle, marginTop: "0.75rem" }}>Research Interests</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: editingAbout ? "0.75rem" : 0 }}>
                {profile.researchInterests.length === 0 && !editingAbout && (
                  <span style={{ fontSize: "0.82rem", color: "var(--muted-foreground)", fontStyle: "italic" }}>None added yet.</span>
                )}
                {profile.researchInterests.map((tag: string) => (
                  <span
                    key={tag}
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "rgba(234,88,12,0.08)", border: "1px solid rgba(234,88,12,0.2)", color: "var(--accent)", borderRadius: 999, padding: "0.2rem 0.65rem", fontSize: "0.78rem", fontWeight: 600 }}
                  >
                    {tag}
                    {editingAbout && (
                      <button onClick={() => removeInterest(tag)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent)", padding: 0, display: "flex", alignItems: "center", marginLeft: 2, lineHeight: 1 }}>
                        <X size={11} />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {editingAbout && (
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  <input
                    style={{ ...inputStyle, flex: "1 1 160px", minWidth: 0, maxWidth: "100%" }}
                    placeholder="Add a research interest..."
                    value={newInterest}
                    onChange={e => setNewInterest(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addInterest(); } }}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                  <button
                    onClick={addInterest}
                    style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "0.65rem 1rem", fontSize: "0.83rem", fontWeight: 700, cursor: "pointer", flexShrink: 0 }}
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Bottom spacing for mobile */}
          <div style={{ height: "1rem" }} />
        </main>
      </div>
    </Layout>
  );
}
