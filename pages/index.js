import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { TEMPLATES, buildSignatureHtml } from "../lib/templates";

const FIELD_STYLE = {
  width: "100%",
  padding: "10px 12px",
  marginTop: "4px",
  marginBottom: "12px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "14px",
  boxSizing: "border-box",
};

export default function Home() {
  const { data: session, status } = useSession();

  const [templateId, setTemplateId] = useState("gold-minimal");
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    logoUrl: "",
    dotUrl: "",
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  function update(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  const html = buildSignatureHtml(templateId, data);

  async function activate() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error?.error?.message || JSON.stringify(json.error) || "خطأ");
      setMessage({ ok: true, text: `تفعّل التوقيع على ${json.email} ✅` });
    } catch (err) {
      setMessage({ ok: false, text: "وقع خطأ: " + err.message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div dir="rtl" style={{ fontFamily: "Tahoma, Arial, sans-serif", maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 22 }}>مبدّل توقيعات Gmail</h1>

      {status === "loading" && <p>...جاري التحميل</p>}

      {!session && (
        <div>
          <p style={{ color: "#555" }}>سجل الدخول بحساب Google باش تربط Gmail تاعك.</p>
          <button onClick={() => signIn("google")} style={{ padding: "10px 18px", fontSize: 14, cursor: "pointer" }}>
            تسجيل الدخول بـ Google
          </button>
        </div>
      )}

      {session && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 13, color: "#555" }}>مسجل كـ {session.user.email}</span>
            <button onClick={() => signOut()} style={{ fontSize: 12, cursor: "pointer" }}>تسجيل الخروج</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>

            {/* Template picker */}
            <div>
              <h3 style={{ fontSize: 15, marginBottom: 8 }}>اختار التصميم</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplateId(t.id)}
                    style={{
                      padding: "8px 14px",
                      borderRadius: 20,
                      border: templateId === t.id ? "2px solid #b08d4f" : "1px solid #ccc",
                      background: templateId === t.id ? "#faf6ec" : "#fff",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <h3 style={{ fontSize: 15, marginBottom: 8 }}>معلوماتك</h3>
              <label>الاسم الكامل</label>
              <input style={FIELD_STYLE} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="مثال: ندير بن..." />

              <label>المسمى / الخدمة</label>
              <input style={FIELD_STYLE} value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="مطوّر ومصمم مواقع" />

              <label>الهاتف</label>
              <input style={FIELD_STYLE} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+213 5XX XX XX XX" />

              <label>الإيميل</label>
              <input style={FIELD_STYLE} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="votre@email.com" />

              <label>الموقع</label>
              <input style={FIELD_STYLE} value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="votresite.com" />

              <label>انستغرام (اختياري)</label>
              <input style={FIELD_STYLE} value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@votrecompte" />

              <label>رابط اللوغو (https://...) — اختياري</label>
              <input style={FIELD_STYLE} value={data.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} placeholder="https://.../logo.png" />
              <p style={{ fontSize: 11, color: "#888", marginTop: -8 }}>
                لازم يكون رابط مستضاف (مثلاً من موقعك أو Vercel) باش يبان عند لي يستقبل الإيميل منك.
              </p>

              <label>رابط GIF متحرك (اختياري)</label>
              <input style={FIELD_STYLE} value={data.dotUrl} onChange={(e) => update("dotUrl", e.target.value)} placeholder="https://.../status-dot.gif" />
            </div>

            {/* Preview */}
            <div>
              <h3 style={{ fontSize: 15, marginBottom: 8 }}>معاينة</h3>
              <div style={{ border: "1px solid #e4e0d6", padding: 20, background: "#fff" }}
                   dangerouslySetInnerHTML={{ __html: html }} />
            </div>

            <div>
              <button
                onClick={activate}
                disabled={busy}
                style={{
                  padding: "12px 24px",
                  fontSize: 14,
                  background: "#b08d4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: busy ? "default" : "pointer",
                  opacity: busy ? 0.6 : 1,
                }}
              >
                {busy ? "...جاري التفعيل" : "تفعيل هذا التوقيع على Gmail"}
              </button>
              {message && (
                <p style={{ marginTop: 10, color: message.ok ? "#2e7d32" : "#c62828", fontSize: 13 }}>
                  {message.text}
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
