import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { TEMPLATES, buildSignatureHtml } from "../lib/templates";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const PRESET_GIFS = [
  { id: "green_dot", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f7e2/512.gif" },
  { id: "fire", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f525/512.gif" },
  { id: "sparkles", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif" },
  { id: "lightning", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/26a1/512.gif" },
  { id: "check", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/2705/512.gif" },
  { id: "laptop", url: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f4bb/512.gif" },
];

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
    snapchat: "",
    tiktok: "",
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
        snapchat: "",
        tiktok: "",
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
        
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }

        .animate-header { animation: fadeInDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-section-1 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.1s; }
        .animate-section-2 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }
        .animate-section-3 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.3s; }
        .animate-preview { opacity: 0; animation: popIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }

        button { cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        button:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 8px 16px rgba(0,0,0,0.1); }
        button:active:not(:disabled) { transform: translateY(-1px); }
        button:disabled { opacity: 0.6; }
        
        input { font-family: inherit; transition: all 0.2s ease; }
        input:focus { outline: none; border-color: #667eea !important; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2); transform: translateY(-1px); }
        
        .section { margin-bottom: 28px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f3f4f6; }
        .section:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        
        .section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #1f2937; position: relative; padding-bottom: 8px; }
        .section-title::after { content: ''; position: absolute; bottom: 0; left: 0; width: 40px; height: 3px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 3px; }
        [dir="rtl"] .section-title::after { right: 0; left: auto; }
        .preview-container { border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background: #fafafa; min-height: 400px; overflow: auto; transition: all 0.3s ease; display: flex; justify-content: center; }
        .preview-container:hover { background: #fff; box-shadow: inset 0 0 0 1px #e5e7eb, 0 10px 30px rgba(0,0,0,0.05); }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }
        .main-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        @media (max-width: 800px) {
          .main-layout { grid-template-columns: 1fr; }
        }
      `}</style>

      <Header />

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ color: "#6b7280" }}>⏳ جاري التحميل...</p>
        </div>
      )}

      {!session && status !== "loading" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          textAlign: "center",
          padding: "40px 20px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
          border: "1px solid #f3f4f6",
          marginTop: "40px"
        }} className="animate-section-1">
          
          <div style={{
            width: "80px",
            height: "80px",
            background: "#ffffff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" width="48" height="48" />
          </div>

          <h2 style={{ fontSize: "32px", fontWeight: "700", color: "#111827", margin: "0 0 16px 0", letterSpacing: "-0.02em" }}>
            مرحباً بك في Email Signature
          </h2>
          
          <p style={{ color: "#4b5563", fontSize: "18px", marginBottom: "40px", maxWidth: "540px", lineHeight: "1.6" }}>
            أنشئ توقيعاً احترافياً لبريدك الإلكتروني واربطه مباشرة بحساب Gmail الخاص بك بنقرة واحدة.
          </p>

          <button 
            onClick={() => signIn("google")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 28px",
              fontSize: "15px",
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: "500",
              background: "#1f1f1f",
              color: "#ffffff",
              border: "1px solid #3c4043",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => { 
              e.currentTarget.style.background = "#2a2a2a"; 
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)"; 
            }}
            onMouseOut={(e) => { 
              e.currentTarget.style.background = "#1f1f1f"; 
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none"; 
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>
      )}

      {session && (
        <div className="main-layout">
          
          {/* Left Column - Controls */}
          <div>
            {/* Direction Toggle */}
            <div className="section animate-section-1">
              <h3 className="section-title">اتجاه النص</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={() => handleDirectionChange("rtl")} style={{ ...FIELD_STYLE, border: direction === "rtl" ? "2px solid #667eea" : "1px solid #e5e7eb", background: direction === "rtl" ? "#f0f4ff" : "#fff", fontWeight: direction === "rtl" ? "600" : "500", color: direction === "rtl" ? "#667eea" : "#6b7280" }}>🇸🇦 RTL (عربي)</button>
                <button onClick={() => handleDirectionChange("ltr")} style={{ ...FIELD_STYLE, border: direction === "ltr" ? "2px solid #667eea" : "1px solid #e5e7eb", background: direction === "ltr" ? "#f0f4ff" : "#fff", fontWeight: direction === "ltr" ? "600" : "500", color: direction === "ltr" ? "#667eea" : "#6b7280" }}>🇬🇧 LTR (English)</button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="section animate-section-1">
              <h3 className="section-title">معلوماتك الشخصية</h3>
              
              <div className="form-grid">
                <div>
                  <label style={LABEL_STYLE}>الاسم الكامل</label>
                  <input style={FIELD_STYLE} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="مثال: أحمد محمد" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>المسمى الوظيفي</label>
                  <input style={FIELD_STYLE} value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="مثال: مهندس برمجيات" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>رقم الهاتف</label>
                  <input style={FIELD_STYLE} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+213 5XX XX XX XX" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>البريد الإلكتروني</label>
                  <input style={FIELD_STYLE} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>الموقع</label>
                  <input style={FIELD_STYLE} value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="example.com" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>رابط اللوغو (https://...)</label>
                  <input style={FIELD_STYLE} value={data.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} placeholder="https://example.com/logo.png" />
                  <p style={{ fontSize: 11, color: "#9ca3af", margin: "-8px 0 12px 0" }}>ℹ️ يجب أن يكون مستضافاً (HTTPS)</p>
                </div>
              </div>

              <label style={LABEL_STYLE}>رابط GIF متحرك (اختياري)</label>
              <input style={FIELD_STYLE} value={data.dotUrl} onChange={(e) => update("dotUrl", e.target.value)} placeholder="https://example.com/dot.gif" />
              <div style={{ display: "flex", gap: "10px", marginTop: "-4px", marginBottom: "16px", overflowX: "auto", paddingBottom: "4px" }}>
                {PRESET_GIFS.map((gif) => (
                  <img key={gif.id} src={gif.url} alt={gif.id} width={28} height={28} style={{ cursor: "pointer", borderRadius: "50%", border: data.dotUrl === gif.url ? "2px solid #667eea" : "2px solid transparent", padding: "2px", transition: "all 0.2s" }} onClick={() => update("dotUrl", gif.url)} title="اختر هذا الـ GIF" />
                ))}
                <button onClick={() => update("dotUrl", "")} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px dashed #ccc", background: "#fff", color: "#888", fontSize: 18, lineHeight: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }} title="إزالة الـ GIF">&times;</button>
              </div>
            </div>

            {/* Social Media */}
            <div className="section animate-section-2">
              <h3 className="section-title">وسائل التواصل (اختياري)</h3>
              <div className="form-grid">
                <div>
                  <label style={LABEL_STYLE}>Instagram</label>
                  <input style={FIELD_STYLE} value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@username" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>LinkedIn</label>
                  <input style={FIELD_STYLE} value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="username" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Twitter</label>
                  <input style={FIELD_STYLE} value={data.twitter} onChange={(e) => update("twitter", e.target.value)} placeholder="@username" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Facebook</label>
                  <input style={FIELD_STYLE} value={data.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="https://facebook.com/..." />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Snapchat</label>
                  <input style={FIELD_STYLE} value={data.snapchat} onChange={(e) => update("snapchat", e.target.value)} placeholder="اسم المستخدم أو رابط" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>TikTok</label>
                  <input style={FIELD_STYLE} value={data.tiktok} onChange={(e) => update("tiktok", e.target.value)} placeholder="اسم المستخدم أو رابط" />
                </div>
              </div>
            </div>




          </div>

          {/* Right Column - Preview & Actions */}
          <div className="animate-preview">
            <div className="section">
              <h3 className="section-title">📋 معاينة التوقيع</h3>
              <div className="preview-container">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>

            {/* Template Selection */}
            <div className="section animate-section-3">
              <h3 className="section-title">اختر التصميم</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => handleTemplateChange(t.id)} style={{ ...FIELD_STYLE, border: templateId === t.id ? "2px solid #667eea" : "1px solid #e5e7eb", background: templateId === t.id ? "#f0f4ff" : "#fff", fontWeight: templateId === t.id ? "600" : "500", color: templateId === t.id ? "#667eea" : "#6b7280" }}>{t.label}</button>
                ))}
              </div>
            </div>

            {/* Activation Button */}
            <div className="section animate-section-3">
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
        </div>
      )}
      <Footer />
    </div>
  );
}
