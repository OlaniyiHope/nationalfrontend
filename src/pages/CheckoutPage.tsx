import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, CreditCard, ShieldCheck, BookOpen,
  CheckCircle, Loader2, Lock, User, Mail,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { publications } from "@/data/publications";
import { useAuth } from "@/context/AuthContext";

// ─── Load Paystack inline script ─────────────────────────────────────────────

function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).PaystackPop) { resolve(); return; }
    if (document.getElementById("paystack-js")) { resolve(); return; }
    const s = document.createElement("script");
    s.id  = "paystack-js";
    s.src = "https://js.paystack.co/v1/inline.js";
    s.onload  = () => resolve();
    s.onerror = () => reject(new Error("Could not load Paystack"));
    document.body.appendChild(s);
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user }  = useAuth();

  const pubId = searchParams.get("id");
  const publication = publications.find((p) => p.id === pubId) || publications[0];

  const [step,    setStep]    = useState<"review" | "paying" | "success" | "error">("review");
  const [errMsg,  setErrMsg]  = useState("");

  // Guard: must be logged in
  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/checkout?id=${pubId}`)}`);
    }
  }, [user]);

  // ── Launch Paystack popup ──────────────────────────────────────────────────
const handlePay = async () => {
  if (!user) return;
  try {
    setStep("paying");
    setErrMsg("");

    await loadPaystack();

    // 1. Initialize on backend
    const initRes = await fetch("/api/sch-initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("as_token")}`,
      },
      body: JSON.stringify({
        email: user.email,
        articleId: publication.id,
        articleTitle: publication.title,
      }),
    });

    const initData = await initRes.json();

    if (!initData.success) {
      if (initData.alreadyPaid) { setStep("success"); return; }
      throw new Error(initData.message || "Initialization failed");
    }

    // 2. Open Paystack popup
    const handler = (window as any).PaystackPop.setup({
      key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email:    user.email,
      amount:   150000, // ₦1,500 in kobo
      currency: "NGN",
      ref:      initData.data.reference,
      metadata: { articleId: publication.id, articleTitle: publication.title },

      onClose: () => {
        setStep("review");
      },

      // ✅ NOT async — use .then() instead of await
      callback: (response: { reference: string }) => {
        fetch(`/api/sch/verify/${response.reference}`)
          .then(r => r.json())
          .then(verData => {
            if (verData.success) {
              setStep("success");
            } else {
              setErrMsg(verData.message || "Verification failed");
              setStep("error");
            }
          })
          .catch(() => {
            setErrMsg("Could not verify payment. Please refresh.");
            setStep("error");
          });
      },
    });

    handler.openIframe();

  } catch (e: any) {
    setErrMsg(e.message || "Something went wrong");
    setStep("error");
  }
};

  // ─── Success screen ──────────────────────────────────────────────────────

  if (step === "success") {
    return (
      <Layout>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#f0fdf4", border: "2px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircle size={36} style={{ color: "#16a34a" }} />
            </div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#111827", fontFamily: "Georgia, serif", margin: "0 0 0.5rem" }}>
              Payment Successful!
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
              You now have full access to:
            </p>
            <p style={{ fontWeight: 700, color: "#111827", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.5 }}>
              {publication.title}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Link
                to={`/article-preview?id=${pubId}`}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#381b92", color: "#fff", borderRadius: 10, padding: "0.875rem 1.5rem", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", transition: "opacity 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                <BookOpen size={18} /> Read Full Article
              </Link>
              <Link
                to="/publications"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "0.875rem 1.5rem", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}
              >
                Back to Publications
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ─── Main checkout page ──────────────────────────────────────────────────

  return (
    <Layout>
      <div style={{ background: "#f9fafb", minHeight: "calc(100vh - 64px)", padding: "2.5rem 1rem" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          {/* Back link */}
          <Link
            to={`/article-preview?id=${pubId}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 600, color: "#374151", textDecoration: "none", marginBottom: "1.75rem" }}
          >
            <ArrowLeft size={15} /> Back to Article
          </Link>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#111827", fontFamily: "Georgia, serif", marginBottom: "1.75rem" }}>
            Complete Your Purchase
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: "1.5rem", alignItems: "start" }}>

            {/* ── Left: account + payment ─────────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* Account info */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem" }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1f2937", margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <User size={15} style={{ color: "#381b92" }} /> Account
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#381b92", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", flexShrink: 0 }}>
                    {user?.username?.slice(0, 2).toUpperCase() || "??"}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: "#111827", margin: 0, fontSize: "0.9rem" }}>{user?.username}</p>
                    <p style={{ color: "#6b7280", margin: 0, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                      <Mail size={11} /> {user?.email}
                    </p>
                  </div>
                  <Link to="/login" style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#ea580c", fontWeight: 600, textDecoration: "none" }}>
                    Not you?
                  </Link>
                </div>
              </div>

              {/* Payment method */}
              <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem" }}>
                <h2 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1f2937", margin: "0 0 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <CreditCard size={15} style={{ color: "#381b92" }} /> Payment
                </h2>
                <div style={{ background: "#f9fafb", border: "1.5px dashed #d1d5db", borderRadius: 10, padding: "1.25rem", textAlign: "center", color: "#6b7280", fontSize: "0.85rem" }}>
                  <Lock size={18} style={{ margin: "0 auto 0.5rem", display: "block", color: "#9ca3af" }} />
                  Paystack secure checkout — card, bank transfer & mobile money accepted
                </div>
              </div>

              {/* Error box */}
              {step === "error" && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "0.875rem 1rem", fontSize: "0.83rem", color: "#dc2626" }}>
                  ⚠️ {errMsg || "Payment failed. Please try again."}
                </div>
              )}

              {/* Pay button */}
              <button
                onClick={handlePay}
                disabled={step === "paying"}
                style={{ width: "100%", padding: "1rem", borderRadius: 12, border: "none", background: step === "paying" ? "#e5e7eb" : "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)", color: step === "paying" ? "#9ca3af" : "#fff", fontSize: "1rem", fontWeight: 800, cursor: step === "paying" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem", boxShadow: step === "paying" ? "none" : "0 4px 20px rgba(234,88,12,0.35)", transition: "opacity 0.15s" }}
                onMouseEnter={e => { if (step !== "paying") e.currentTarget.style.opacity = "0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                {step === "paying"
                  ? <><Loader2 size={18} style={{ animation: "spin 0.8s linear infinite" }} /> Opening secure payment...</>
                  : <><Lock size={18} /> Pay ₦15,000 Securely</>
                }
              </button>

              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#9ca3af", margin: "-0.5rem 0 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
                <ShieldCheck size={12} /> 256-bit SSL encryption · Powered by Paystack
              </p>
            </div>

            {/* ── Right: order summary ─────────────────────────────────── */}
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "1.5rem", position: "sticky", top: "1.5rem" }}>
              <h2 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.07em", margin: "0 0 1rem" }}>
                Order Summary
              </h2>

              {/* Article */}
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", paddingBottom: "1rem", borderBottom: "1px solid #f3f4f6", marginBottom: "1rem" }}>
                <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(56,27,146,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <BookOpen size={18} style={{ color: "#381b92" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "0.83rem", fontWeight: 700, color: "#111827", margin: "0 0 0.2rem", lineHeight: 1.4 }}>{publication.title}</p>
                  <p style={{ fontSize: "0.72rem", color: "#6b7280", margin: 0 }}>{publication.authors?.join(", ")}</p>
                </div>
              </div>

              {/* Line items */}
              {[
                { label: "Article access", value: "₦15,000" },
                { label: "Tax",            value: "₦0.00" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                  <span>{label}</span><span>{value}</span>
                </div>
              ))}

              <div style={{ borderTop: "1.5px solid #e5e7eb", marginTop: "0.75rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1rem", color: "#111827" }}>
                <span>Total</span><span style={{ color: "#ea580c" }}>₦15,000</span>
              </div>

              {/* What you get */}
              <div style={{ marginTop: "1.25rem", background: "#f9fafb", borderRadius: 10, padding: "0.875rem" }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9ca3af", margin: "0 0 0.625rem" }}>
                  What's included
                </p>
                {[
                  "Full article access",
                  "PDF download",
                  "Cite & reference tools",
                  "Permanent access",
                ].map(item => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", fontSize: "0.8rem", color: "#374151" }}>
                    <CheckCircle size={13} style={{ color: "#16a34a", flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </Layout>
  );
}
