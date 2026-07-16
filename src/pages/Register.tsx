import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, Lock, ArrowRight, Eye, EyeOff,
  AlertCircle, CheckCircle, GraduationCap,
  FlaskConical, Briefcase,
} from "lucide-react";
import logo from "@/assets/logo.png";

// ─── Role definitions ─────────────────────────────────────────────────────────

const ROLES = [
  {
    value: "researcher",
    label: "Researcher",
    icon: FlaskConical,
    desc: "Independent or institutional researchers",
  },
  {
    value: "academic",
    label: "Academic / Lecturer",
    icon: GraduationCap,
    desc: "University faculty, professors & lecturers",
  },
  {
    value: "professional",
    label: "Professional",
    icon: Briefcase,
    desc: "Industry professionals & policy practitioners",
  },
];

type Step = "details" | "role";

export default function Register() {
  const navigate = useNavigate();
  const [step,         setStep]        = useState<Step>("details");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState("");
  const [success,      setSuccess]      = useState(false);
  const [activeRole,   setActiveRole]   = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email:    "",
    password: "",
    confirm:  "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  // ── Step 1 → Step 2 ────────────────────────────────────────────────────────
  const handleDetailsNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setStep("role");
  };

  // ── Final submit (called when role card is clicked) ────────────────────────
  const handleRoleSubmit = async (role: string) => {
    setActiveRole(role);
    setError("");
    setIsLoading(true);

    try {
      const body = {
        username: formData.username.trim(),
        email:    formData.email.trim().toLowerCase(),
        password: formData.password,
        role,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sch-register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed. Please try again.");
        setIsLoading(false);
        setActiveRole("");
        return;
      }

      localStorage.setItem("as_token", data.token);
      localStorage.setItem("as_user",  JSON.stringify(data.user));

      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);

    } catch {
      setError("Unable to connect to the server. Please try again.");
      setIsLoading(false);
      setActiveRole("");
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background)" }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
            <CheckCircle size={32} style={{ color: "#22c55e" }} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "Georgia, serif", color: "var(--foreground)", margin: "0 0 0.5rem" }}>
            Account Created!
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{
        minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "2rem 1rem",
        background: "var(--background)", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "-120px", right: "-120px", width: 400, height: 400, borderRadius: "50%", background: "var(--accent)", opacity: 0.04, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: 300, height: 300, borderRadius: "50%", background: "var(--primary)", opacity: 0.06, pointerEvents: "none" }} />

        {/* Card */}
        <div style={{
          width: "100%", maxWidth: 480,
          background: "var(--card, #fff)", border: "1px solid var(--border, #e5e7eb)",
          borderRadius: 20, padding: "2.5rem 2rem",
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)", position: "relative", zIndex: 1,
        }}>

          {/* Logo + heading */}
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <Link to="/">
              <img src={logo} alt="Afrika Scholar" style={{ height: 44, margin: "0 auto 1rem", display: "block" }} />
            </Link>

            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              {(["details", "role"] as Step[]).map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "0.75rem", fontWeight: 800,
                    background: step === s
                      ? "var(--accent)"
                      : (i === 0 && step === "role") ? "#381b92" : "#f3f4f6",
                    color: (step === s || (i === 0 && step === "role")) ? "#fff" : "var(--muted-foreground)",
                    transition: "all 0.2s",
                  }}>
                    {i === 0 && step === "role" ? <CheckCircle size={13} /> : i + 1}
                  </div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 600, color: step === s ? "var(--foreground)" : "var(--muted-foreground)" }}>
                    {s === "details" ? "Your Details" : "Choose Role"}
                  </span>
                  {i === 0 && (
                    <div style={{ width: 32, height: 1.5, background: step === "role" ? "#381b92" : "#e5e7eb", borderRadius: 2, transition: "background 0.3s" }} />
                  )}
                </div>
              ))}
            </div>

            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, fontFamily: "Georgia, serif", color: "var(--foreground)", margin: "0 0 0.3rem" }}>
              {step === "details"
                ? <>Create your <span style={{ color: "var(--accent)" }}>Account</span></>
                : <>What best <span style={{ color: "var(--accent)" }}>describes you?</span></>}
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
              {step === "details"
                ? "Join Afrika Scholar Today"
                : "Tap a role to complete your registration"}
            </p>
          </div>

          {/* ── STEP 1: Details ─────────────────────────────────────────── */}
          {step === "details" && (
            <>
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
                  <AlertCircle size={15} style={{ color: "#ef4444", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.83rem", color: "#ef4444" }}>{error}</span>
                </div>
              )}

              <form onSubmit={handleDetailsNext} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Full Name */}
                <div>
                  <label style={labelStyle}>FULL NAME</label>
                  <div style={inputWrap}>
                    <User size={15} style={iconStyle} />
                    <input
                      type="text" placeholder="Your full name"
                      value={formData.username}
                      onChange={e => handleChange("username", e.target.value)}
                      required minLength={3} style={inputInner}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>EMAIL ADDRESS</label>
                  <div style={inputWrap}>
                    <Mail size={15} style={iconStyle} />
                    <input
                      type="email" placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => handleChange("email", e.target.value)}
                      required style={inputInner}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>
                    PASSWORD{" "}
                    <span style={{ fontWeight: 400, color: "var(--muted-foreground)", textTransform: "none", fontSize: "0.7rem" }}>
                      (min. 6 characters)
                    </span>
                  </label>
                  <div style={inputWrap}>
                    <Lock size={15} style={iconStyle} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={e => handleChange("password", e.target.value)}
                      required minLength={6}
                      style={{ ...inputInner, paddingRight: "2.5rem" }}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={eyeBtn}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={labelStyle}>CONFIRM PASSWORD</label>
                  <div style={inputWrap}>
                    <Lock size={15} style={iconStyle} />
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={formData.confirm}
                      onChange={e => handleChange("confirm", e.target.value)}
                      required minLength={6}
                      style={{ ...inputInner, paddingRight: "2.5rem" }}
                    />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} style={eyeBtn}>
                      {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", cursor: "pointer" }}>
                  <input type="checkbox" required style={{ marginTop: 3, width: 15, height: 15, accentColor: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)", lineHeight: 1.5 }}>
                    I agree to the{" "}
                    <Link to="/terms" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
                    {" "}and{" "}
                    <Link to="/privacy" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
                  </span>
                </label>

                {/* Next button */}
                <button
                  type="submit"
                  style={{
                    marginTop: "0.25rem", width: "100%", padding: "0.85rem",
                    borderRadius: 10, border: "none", color: "#fff",
                    fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "0.5rem", background: "#381b92", transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Continue <ArrowRight size={17} />
                </button>
              </form>

              {/* Sign in link */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0 1rem" }}>
                <div style={{ flex: 1, height: 1, background: "var(--border, #e5e7eb)" }} />
                <span style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", whiteSpace: "nowrap" }}>Already have an account?</span>
                <div style={{ flex: 1, height: 1, background: "var(--border, #e5e7eb)" }} />
              </div>
              <Link
                to="/login"
                style={{ display: "block", textAlign: "center", padding: "0.75rem", borderRadius: 10, border: "1.5px solid var(--border, #e5e7eb)", fontSize: "0.875rem", fontWeight: 600, color: "var(--foreground)", textDecoration: "none", transition: "border-color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border, #e5e7eb)")}
              >
                Sign In Instead
              </Link>
            </>
          )}

          {/* ── STEP 2: Role Picker ──────────────────────────────────────── */}
          {step === "role" && (
            <>
              {/* Back */}
              <button
                onClick={() => { setStep("details"); setError(""); setActiveRole(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "var(--muted-foreground)", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "1.25rem" }}
              >
                ← Back
              </button>

              {/* Error */}
              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 8, padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
                  <AlertCircle size={15} style={{ color: "#ef4444", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.83rem", color: "#ef4444" }}>{error}</span>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {ROLES.map(({ value, label, icon: Icon, desc }) => {
                  const isActive = activeRole === value && isLoading;
                  return (
                    <button
                      key={value}
                      onClick={() => !isLoading && handleRoleSubmit(value)}
                      disabled={isLoading}
                      style={{
                        display: "flex", alignItems: "center", gap: "1rem",
                        padding: "1rem 1.1rem", borderRadius: 14,
                        cursor: isLoading ? "not-allowed" : "pointer",
                        border: isActive
                          ? "2px solid var(--accent)"
                          : "2px solid var(--border, #e5e7eb)",
                        background: isActive ? "rgba(234,88,12,0.04)" : "var(--card, #fff)",
                        textAlign: "left", transition: "all 0.15s", width: "100%",
                        opacity: isLoading && !isActive ? 0.45 : 1,
                      }}
                      onMouseEnter={e => {
                        if (!isLoading) {
                          e.currentTarget.style.borderColor = "rgba(234,88,12,0.5)";
                          e.currentTarget.style.background = "rgba(234,88,12,0.03)";
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "var(--border, #e5e7eb)";
                          e.currentTarget.style.background = "var(--card, #fff)";
                        }
                      }}
                    >
                      <div style={{
                        width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isActive ? "rgba(234,88,12,0.12)" : "#f3f4f6",
                        transition: "background 0.15s",
                      }}>
                        {isActive ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"
                            style={{ animation: "spin 0.8s linear infinite" }}>
                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                          </svg>
                        ) : (
                          <Icon size={22} style={{ color: "#6b7280" }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--foreground)", margin: 0, lineHeight: 1.2 }}>
                          {label}
                        </p>
                        <p style={{ fontSize: "0.78rem", color: "var(--muted-foreground)", margin: "0.25rem 0 0", lineHeight: 1.4 }}>
                          {desc}
                        </p>
                      </div>
                      <ArrowRight size={16} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.7rem", fontWeight: 700,
  letterSpacing: "0.08em", color: "var(--muted-foreground)",
  marginBottom: "0.4rem", textTransform: "uppercase",
};

const inputWrap: React.CSSProperties = {
  position: "relative", display: "flex", alignItems: "center",
};

const iconStyle: React.CSSProperties = {
  position: "absolute", left: "0.875rem",
  color: "var(--muted-foreground)", pointerEvents: "none", flexShrink: 0,
};

const inputInner: React.CSSProperties = {
  width: "100%", borderRadius: 10,
  border: "1px solid black", borderStyle: "solid",
  background: "var(--background, #fff)",
  padding: "0.75rem 0.875rem 0.75rem 2.5rem",
  fontSize: "0.875rem", color: "var(--foreground)",
  outline: "none", fontFamily: "inherit",
  boxSizing: "border-box", transition: "border-color 0.15s",
};

const eyeBtn: React.CSSProperties = {
  position: "absolute", right: "0.875rem",
  background: "none", border: "none", cursor: "pointer",
  color: "var(--muted-foreground)", padding: 0,
  display: "flex", alignItems: "center",
};
