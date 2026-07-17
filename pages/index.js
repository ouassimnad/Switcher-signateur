import { useState, useEffect } from "react";
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
  fontFamily: "inherit",
};

const LABEL_STYLE = {
  fontSize: "13px",
  fontWeight: "500",
  color: "#333",
  marginBottom: "4px",
  display: "block",
};

const STORAGE_KEY = "signature_data";
const TEMPLATE_KEY = "signature_template";
const DIRECTION_KEY = "signature_direction";

export default function Home() {
  const { data: session, status } = useSession();

  const [templateId, setTemplateId] = useState("luxury-gold");
  const [direction, setDirection] = useState("rtl");
  const [data, setData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    facebook: "",
    logoUrl: "",
    dotUrl: "",
  });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // تحميل البيانات من localStorage عند تحميل الصفحة
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedTemplate = localStorage.getItem(TEMPLATE_KEY);
      const savedDirection = localStorage.getItem(DIRECTION_KEY);

      if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (e) {
          console.error("Error parsing saved data:", e);
        }
      }

      if (savedTemplate) {
        setTemplateId(savedTemplate);
      }

      if (savedDirection) {
        setDirection(savedDirection);
      }

      setLoaded(true);
    }
  }, []);

  function update(field, value) {
    setData((d) => {
      const newData = { ...d, [field]: value };
      // حفظ البيانات فوراً في localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      }
      return newData;
    });
  }

  function handleTemplateChange(id) {
    setTemplateId(id);
    if (typeof window !== "undefined") {
      localStorage.setItem(TEMPLATE_KEY, id);
    }
  }

  function handleDirectionChange(dir) {
    setDirection(dir);
    if (typeof window !== "undefined") {
      localStorage.setItem(DIRECTION_KEY, dir);
    }
  }

  const html = buildSignatureHtml(templateId, data, direction);
  const isRtl = direction === "rtl";

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
      setMessage({ ok: true, text: `✅ تم تفعيل التوقيع على ${json.email}` });
      // البيانات محفوظة تلقائياً
    } catch (err) {
      setMessage({ ok: false, text: "❌ خطأ: " + err.message });
    } finally {
      setBusy(false);
    }
  }

  function clearData() {
    if (confirm("هل تريد حذف جميع البيانات المحفوظة؟")) {
      setData({
        name: "",
        title: "",
        phone: "",
        email: "",
        website: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        facebook: "",
        logoUrl: "",
        dotUrl: "",
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TEMPLATE_KEY);
        localStorage.removeItem(DIRECTION_KEY);
      }
      setTemplateId("luxury-gold");
      setDirection("rtl");
      setMessage({ ok: true, text: "✅ تم حذف البيانات بنجاح" });
    }
  }

  const containerStyle = {
    direction: isRtl ? "rtl" : "ltr",
    fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
    maxWidth: 1000,
    margin: "0 auto",
    padding: "24px 16px",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexDirection: isRtl ? "row-reverse" : "row",
    gap: 16,
  };

  if (!loaded) {
    return (
      <div style={containerStyle}>
        <p style={{ color: "#6b7280" }}>⏳ جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>{`
        * { box-sizing: border-box; }
        button { cursor: pointer; transition: all 0.2s; }
        button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        button:disabled { opacity: 0.6; }
        input, textarea { font-family: inherit; }
        .section { margin-bottom: 28px; }
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #1f2937; }
        .template-btn { padding: "8px 14px"; border-radius: "20px"; border: "1px solid #e5e7eb"; background: "#fff"; font-size: "13px"; transition: "all 0.2s"; }
        .success { color: #059669; }
        .error { color: #dc2626; }
      `}</style>

      <div style={headerStyle}>
        <h1 style={{ fontSize: 26, margin: 0, color: "#1f2937" }}>✨ مبدّل التوقيعات</h1>
        {session && (
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexDirection: isRtl ? "row-reverse" : "row" }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              {session.user.email}
            </span>
            <button 
              onClick={() => signOut()} 
              style={{
                fontSize: 12,
                padding: "6px 12px",
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
              }}
            >
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ color: "#6b7280" }}>⏳ جاري التحميل...</p>
        </div>
      )}

      {!session && status !== "loading" && (
        <div style={{
          background: "#f0f9ff",
          border: "1px solid #bfdbfe",
          borderRadius: 8,
          padding: 20,
          textAlign: "center",
        }}>
          <p style={{ color: "#1e40af", marginBottom: 16 }}>
            📧 سجل الدخول بحساب Google لربط توقيعك على Gmail
          </p>
          <button 
            onClick={() => signIn("google")}
            style={{
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: "500",
              background: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            🔐 تسجيل الدخول بـ Google
          </button>
        </div>
      )}

      {session && (
        <div style={{ display: "grid", gridTemplateColumns: isRtl ? "1fr 1fr" : "1fr 1fr", gap: 28 }}>
          
          {/* Left Column - Controls */}
          <div>
            {/* Template Selection */}
            <div className="section">
              <h3 className="section-title">اختر التصميم</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTemplateChange(t.id)}
                    style={{
                      ...FIELD_STYLE,
                      border: templateId === t.id ? "2px solid #667eea" : "1px solid #e5e7eb",
                      background: templateId === t.id ? "#f0f4ff" : "#fff",
                      fontWeight: templateId === t.id ? "600" : "500",
                      color: templateId === t.id ? "#667eea" : "#6b7280",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction Toggle */}
            <div className="section">
              <h3 className="section-title">اتجاه النص</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button
                  onClick={() => handleDirectionChange("rtl")}
                  style={{
                    ...FIELD_STYLE,
                    border: direction === "rtl" ? "2px solid #667eea" : "1px solid #e5e7eb",
                    background: direction === "rtl" ? "#f0f4ff" : "#fff",
                    fontWeight: direction === "rtl" ? "600" : "500",
                    color: direction === "rtl" ? "#667eea" : "#6b7280",
                  }}
                >
                  🇸🇦 RTL (عربي)
                </button>
                <button
                  onClick={() => handleDirectionChange("ltr")}
                  style={{
                    ...FIELD_STYLE,
                    border: direction === "ltr" ? "2px solid #667eea" : "1px solid #e5e7eb",
                    background: direction === "ltr" ? "#f0f4ff" : "#fff",
                    fontWeight: direction === "ltr" ? "600" : "500",
                    color: direction === "ltr" ? "#667eea" : "#6b7280",
                  }}
                >
                  🇬🇧 LTR (English)
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="section">
              <h3 className="section-title">معلوماتك الشخصية</h3>

              <label style={LABEL_STYLE}>الاسم الكامل</label>
              <input
                style={FIELD_STYLE}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="مثال: أحمد محمد"
              />

              <label style={LABEL_STYLE}>المسمى الوظيفي</label>
              <input
                style={FIELD_STYLE}
                value={data.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="مثال: مهندس برمجيات"
              />

              <label style={LABEL_STYLE}>رقم الهاتف</label>
              <input
                style={FIELD_STYLE}
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+213 5XX XX XX XX"
              />

              <label style={LABEL_STYLE}>البريد الإلكتروني</label>
              <input
                style={FIELD_STYLE}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="your@email.com"
                type="email"
              />

              <label style={LABEL_STYLE}>الموقع</label>
              <input
                style={FIELD_STYLE}
                value={data.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="example.com"
              />

              <label style={LABEL_STYLE}>رابط اللوغو (https://...)</label>
              <input
                style={FIELD_STYLE}
                value={data.logoUrl}
                onChange={(e) => update("logoUrl", e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 12px 0" }}>
                ℹ️ يجب أن يكون مستضافاً (HTTPS)
              </p>

              <label style={LABEL_STYLE}>رابط GIF متحرك (اختياري)</label>
              <input
                style={FIELD_STYLE}
                value={data.dotUrl}
                onChange={(e) => update("dotUrl", e.target.value)}
                placeholder="https://example.com/dot.gif"
              />
            </div>

            {/* Social Media */}
            <div className="section">
              <h3 className="section-title">وسائل التواصل (اختياري)</h3>

              <label style={LABEL_STYLE}>Instagram</label>
              <input
                style={FIELD_STYLE}
                value={data.instagram}
                onChange={(e) => update("instagram", e.target.value)}
                placeholder="@username"
              />

              <label style={LABEL_STYLE}>LinkedIn</label>
              <input
                style={FIELD_STYLE}
                value={data.linkedin}
                onChange={(e) => update("linkedin", e.target.value)}
                placeholder="username"
              />

              <label style={LABEL_STYLE}>Twitter</label>
              <input
                style={FIELD_STYLE}
                value={data.twitter}
                onChange={(e) => update("twitter", e.target.value)}
                placeholder="@username"
              />

              <label style={LABEL_STYLE}>Facebook</label>
              <input
                style={FIELD_STYLE}
                value={data.facebook}
                onChange={(e) => update("facebook", e.target.value)}
                placeholder="username"
              />
            </div>

            {/* Activation Button */}
            <div className="section">
              <button
                onClick={activate}
                disabled={busy}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  fontSize: 14,
                  fontWeight: "600",
                  background: busy ? "#d1d5db" : "#667eea",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: busy ? "not-allowed" : "pointer",
                  opacity: busy ? 0.6 : 1,
                  marginBottom: "10px",
                }}
              >
                {busy ? "⏳ جاري التفعيل..." : "🚀 تفعيل على Gmail"}
              </button>

              <button
                onClick={clearData}
                style={{
                  width: "100%",
                  padding: "10px 24px",
                  fontSize: 13,
                  fontWeight: "500",
                  background: "#f3f4f6",
                  color: "#dc2626",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
              >
                🗑️ حذف البيانات المحفوظة
              </button>

              {message && (
                <p style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  borderRadius: 6,
                  background: message.ok ? "#f0fdf4" : "#fef2f2",
                  color: message.ok ? "#059669" : "#dc2626",
                  fontSize: 12,
                  textAlign: "center",
                  border: `1px solid ${message.ok ? "#bbf7d0" : "#fecaca"}`,
                }}>
                  {message.text}
                </p>
              )}

              <p style={{
                marginTop: 16,
                fontSize: 11,
                color: "#6b7280",
                padding: "12px",
                background: "#f9fafb",
                borderRadius: 4,
                textAlign: "center",
              }}>
                💾 البيانات تُحفظ تلقائياً أثناء الكتابة
              </p>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div>
            <div className="section">
              <h3 className="section-title">📋 معاينة التوقيع</h3>
              <div style={{
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: 20,
                background: "#fafafa",
                minHeight: 400,
                overflow: "auto",
              }}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
