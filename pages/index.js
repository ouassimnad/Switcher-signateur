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
  marginBottom: "10px",
  border: "1.5px solid #e5e7eb",
  borderRadius: "6px",
  fontSize: "13px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  backgroundColor: "#ffffff",
  transition: "all 0.2s ease",
};

const LABEL_STYLE = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#374151",
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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "16px",
    width: "100%",
  };

  if (!loaded) {
    return (
      <div style={containerStyle}>
        <p style={{ color: "#6b7280", textAlign: "center" }}>⏳ جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }

        .animate-header { animation: fadeInDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-section-1 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.1s; }
        .animate-section-2 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }
        .animate-section-3 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.3s; }
        .animate-preview { opacity: 0; animation: popIn 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }

        button { cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); font-family: inherit; }
        button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        button:active:not(:disabled) { transform: translateY(0); }
        button:disabled { opacity: 0.6; cursor: not-allowed; }
        
        input, textarea { font-family: inherit; transition: all 0.2s ease; }
        input:focus, textarea:focus { outline: none; border-color: #667eea !important; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
        
        .section { 
          margin-bottom: 16px; 
          padding: 16px; 
          background: #ffffff; 
          border-radius: 8px; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.05); 
          border: 1px solid #f3f4f6;
          transition: all 0.3s ease;
        }
        .section:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        
        .section-title { 
          font-size: 14px; 
          font-weight: 700; 
          margin: 0 0 12px 0;
          color: #1f2937; 
          position: relative; 
          padding-bottom: 8px; 
        }
        .section-title::after { 
          content: ''; 
          position: absolute; 
          bottom: 0; 
          left: 0; 
          width: 35px; 
          height: 2px; 
          background: linear-gradient(90deg, #667eea, #764ba2); 
          border-radius: 2px; 
        }
        [dir="rtl"] .section-title::after { right: 0; left: auto; }
        
        .preview-container { 
          border: 1.5px solid #e5e7eb; 
          border-radius: 8px; 
          padding: 16px; 
          background: #fafafa; 
          min-height: 350px; 
          max-height: 550px;
          overflow: auto; 
          transition: all 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .preview-container:hover { background: #fff; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        
        .form-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 12px 10px; 
        }

        .main-layout { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 16px; 
        }

        .button-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .preset-gifs {
          display: flex;
          gap: 8px;
          margin-top: 4px;
          margin-bottom: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
          flex-wrap: wrap;
        }

        .preset-gif-item {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          cursor: pointer;
          border: 2.5px solid #a78bfa;
          transition: all 0.2s ease;
          padding: 3px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .preset-gif-item:hover {
          border-color: #8b5cf6;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
          background: #f5f3ff;
        }

        .preset-gif-item.active {
          border-color: #8b5cf6;
          background: #ede9fe;
        }

        @media (max-width: 1024px) {
          .main-layout { 
            grid-template-columns: 1fr; 
            gap: 12px;
          }
          
          .form-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .button-grid {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }

        @media (max-width: 768px) {
          .section {
            padding: 12px;
            margin-bottom: 12px;
          }

          .form-grid { 
            grid-template-columns: 1fr; 
            gap: 10px;
          }

          .main-layout { 
            grid-template-columns: 1fr; 
            gap: 12px;
          }

          .preview-container {
            min-height: 300px;
            max-height: 450px;
            padding: 12px;
          }

          .section-title {
            font-size: 13px;
            margin-bottom: 10px;
            padding-bottom: 6px;
          }

          .button-grid {
            grid-template-columns: 1fr;
            gap: 6px;
          }
        }

        @media (max-width: 480px) {
          .section {
            padding: 10px;
            margin-bottom: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .preview-container {
            min-height: 250px;
            max-height: 350px;
            padding: 10px;
          }

          .section-title {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .preset-gifs {
            gap: 6px;
          }

          .preset-gif-item {
            width: 36px;
            height: 36px;
            border-radius: 10px;
          }
        }
      `}</style>

      <Header />

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <p style={{ color: "#6b7280", fontSize: "14px" }}>⏳ جاري التحميل...</p>
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
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
          border: "1px solid #f3f4f6",
          marginTop: "20px"
        }} className="animate-section-1">
          
          <div style={{
            width: "70px",
            height: "70px",
            background: "#f0f4ff",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            boxShadow: "0 4px 20px rgba(102, 126, 234, 0.1)"
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" width="40" height="40" />
          </div>

          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#111827", margin: "0 0 12px 0", letterSpacing: "-0.02em" }}>
            مرحباً بك في Email Signature
          </h2>
          
          <p style={{ color: "#4b5563", fontSize: "14px", marginBottom: "32px", maxWidth: "480px", lineHeight: "1.6" }}>
            أنشئ توقيعاً احترافياً لبريدك الإلكتروني واربطه مباشرة بحساب Gmail الخاص بك بنقرة واحدة.
          </p>

          <button 
            onClick={() => signIn("google")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "12px 28px",
              fontSize: "14px",
              fontFamily: "'Inter', 'Segoe UI', sans-serif",
              fontWeight: "600",
              background: "#1f1f1f",
              color: "#ffffff",
              border: "1px solid #3c4043",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
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
            <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              <div className="button-grid">
                <button onClick={() => handleDirectionChange("rtl")} style={{ ...FIELD_STYLE, border: direction === "rtl" ? "2px solid #667eea" : "1.5px solid #e5e7eb", background: direction === "rtl" ? "#f0f4ff" : "#fff" }}>RTL</button>
                <button onClick={() => handleDirectionChange("ltr")} style={{ ...FIELD_STYLE, border: direction === "ltr" ? "2px solid #667eea" : "1.5px solid #e5e7eb", background: direction === "ltr" ? "#f0f4ff" : "#fff" }}>LTR</button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="section animate-section-1">
              <h3 className="section-title">البيانات الشخصية</h3>
              
              <div className="form-grid">
                <div>
                  <label style={LABEL_STYLE}>الاسم</label>
                  <input style={FIELD_STYLE} value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="أحمد محمد" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>الوظيفة</label>
                  <input style={FIELD_STYLE} value={data.title} onChange={(e) => update("title", e.target.value)} placeholder="مهندس برمجيات" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>الهاتف</label>
                  <input style={FIELD_STYLE} value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+213 563413607" type="tel" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>البريد</label>
                  <input style={FIELD_STYLE} value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="email@example.com" type="email" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>الموقع</label>
                  <input style={FIELD_STYLE} value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="example.com" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>اللوغو</label>
                  <input style={FIELD_STYLE} value={data.logoUrl} onChange={(e) => update("logoUrl", e.target.value)} placeholder="https://..." />
                </div>
              </div>

              <label style={LABEL_STYLE}>صورة GIF</label>
              <input style={FIELD_STYLE} value={data.dotUrl} onChange={(e) => update("dotUrl", e.target.value)} placeholder="https://..." />
              <div className="preset-gifs">
                {PRESET_GIFS.map((gif) => (
                  <button
                    key={gif.id}
                    onClick={() => update("dotUrl", gif.url)}
                    className={`preset-gif-item ${data.dotUrl === gif.url ? 'active' : ''}`}
                    title={gif.id}
                  >
                    <img src={gif.url} alt={gif.id} width={20} height={20} style={{ display: "block" }} />
                  </button>
                ))}
                <button 
                  onClick={() => update("dotUrl", "")} 
                  className="preset-gif-item"
                  style={{ 
                    borderStyle: "dashed",
                    background: data.dotUrl === "" ? "#ede9fe" : "#fff",
                    fontWeight: "bold"
                  }}
                  title="إزالة"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div className="section animate-section-2">
              <h3 className="section-title">التواصل (اختياري)</h3>
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
                  <input style={FIELD_STYLE} value={data.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="https://..." />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Snapchat</label>
                  <input style={FIELD_STYLE} value={data.snapchat} onChange={(e) => update("snapchat", e.target.value)} placeholder="username" />
                </div>
                <div>
                  <label style={LABEL_STYLE}>TikTok</label>
                  <input style={FIELD_STYLE} value={data.tiktok} onChange={(e) => update("tiktok", e.target.value)} placeholder="username" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Preview & Actions */}
          <div className="animate-preview">
            <div className="section">
              <h3 className="section-title">📋 المعاينة</h3>
              <div className="preview-container">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>

            {/* Template Selection */}
            <div className="section animate-section-3">
              <h3 className="section-title">التصميم</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                {TEMPLATES.map((t) => (
                  <button 
                    key={t.id} 
                    onClick={() => handleTemplateChange(t.id)} 
                    style={{ 
                      ...FIELD_STYLE, 
                      border: templateId === t.id ? "2px solid #667eea" : "1.5px solid #e5e7eb", 
                      background: templateId === t.id ? "#f0f4ff" : "#fff", 
                      fontWeight: templateId === t.id ? "600" : "500",
                      color: templateId === t.id ? "#667eea" : "#6b7280",
                      marginTop: 0,
                      marginBottom: 0,
                      padding: "8px 10px",
                      fontSize: "11px"
                    }}
                  >
                    {t.label}
                  </button>
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
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  background: busy ? "#d1d5db" : "#667eea",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: busy ? "not-allowed" : "pointer",
                  opacity: busy ? 0.6 : 1,
                  marginBottom: "8px",
                  transition: "all 0.3s ease"
                }}
              >
                {busy ? "⏳ جاري..." : "🚀 تفعيل"}
              </button>

              <button
                onClick={clearData}
                style={{
                  width: "100%",
                  padding: "10px 16px",
                  fontSize: "12px",
                  fontWeight: "500",
                  background: "#fef2f2",
                  color: "#dc2626",
                  border: "1.5px solid #fecaca",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              >
                🗑️ حذف
              </button>

              {message && (
                <p style={{
                  marginTop: "10px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  background: message.ok ? "#f0fdf4" : "#fef2f2",
                  color: message.ok ? "#059669" : "#dc2626",
                  fontSize: "12px",
                  textAlign: "center",
                  border: `1.5px solid ${message.ok ? "#bbf7d0" : "#fecaca"}`,
                  fontWeight: "500",
                  margin: 0
                }}>
                  {message.text}
                </p>
              )}

              <p style={{
                marginTop: "10px",
                fontSize: "11px",
                color: "#6b7280",
                padding: "8px 10px",
                background: "#f9fafb",
                borderRadius: "6px",
                textAlign: "center",
                border: "1px solid #f3f4f6",
                fontWeight: "500",
                margin: 0
              }}>
                💾 حفظ تلقائي
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
