import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    padding: "16px 24px",
    background: "#4285f4",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    borderTop: "4px solid #ea4335",
    borderRight: "4px solid #fff59d",
    borderLeft: "4px solid #34a853",
    borderBottom: "4px solid #ff69b4",
    gap: 16,
    direction: "rtl",
    position: "relative",
  };

  return (
    <>
      <style>{`
        .desktop-nav { display: flex; gap: 16px; margin-right: 20px; }
        .desktop-nav a { text-decoration: none; color: rgba(255,255,255,0.8); font-weight: 500; font-size: 15px; transition: opacity 0.2s; }
        .desktop-nav a:hover { opacity: 1; color: #ffffff; }
        
        .mobile-menu-btn { display: none; background: none; border: none; color: white; cursor: pointer; padding: 4px; font-size: 26px; line-height: 1; }
        
        .sidebar { position: fixed; top: 0; right: -280px; width: 280px; height: 100vh; background: white; z-index: 1000; transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: -4px 0 15px rgba(0,0,0,0.1); padding: 24px; display: flex; flex-direction: column; gap: 16px; }
        .sidebar.open { right: 0; }
        
        .sidebar-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; visibility: hidden; transition: all 0.3s ease; backdrop-filter: blur(2px); }
        .sidebar-overlay.open { opacity: 1; visibility: visible; }
        
        .sidebar-link { text-decoration: none; color: #4b5563; font-weight: 600; font-size: 16px; padding: 12px 16px; border-radius: 8px; transition: all 0.2s; background: #f9fafb; display: block; }
        .sidebar-link:hover { background: #f3f4f6; color: #1f2937; transform: translateX(-4px); }
        
        .close-btn { background: none; border: none; font-size: 24px; cursor: pointer; align-self: flex-start; margin-bottom: 10px; color: #6b7280; padding: 8px; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .close-btn:hover { background: #f3f4f6; color: #1f2937; }
        
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .header-content { flex-direction: row !important; justify-content: space-between; width: 100%; }
          .user-info-desktop { display: none !important; }
        }
      `}</style>

      <div style={headerStyle} className="animate-header header-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexGrow: 1 }}>
          <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)}>☰</button>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" width="28" height="28" style={{ background: "#fff", padding: "4px", borderRadius: "6px" }} />
            <h1 style={{ fontSize: 22, margin: 0, color: "#ffffff", fontWeight: "700" }}>Email Signature</h1>
          </div>
          <nav className="desktop-nav">
            <Link href="/">الرئيسية</Link>
            <Link href="/about">عن الموقع</Link>
            <Link href="/contact">تواصل معنا</Link>
          </nav>
        </div>

        {session && (
          <div className="user-info-desktop" style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
              {session.user.email}
            </span>
            <button 
              onClick={() => signOut()} 
              style={{
                fontSize: 13,
                fontWeight: "500",
                padding: "8px 16px",
                background: "#fef2f2",
                color: "#ea4335",
                border: "1px solid #fca5a5",
                borderRadius: 6,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`} dir="rtl">
        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
          <Link href="/" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>الرئيسية</Link>
          <Link href="/about" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>عن الموقع</Link>
          <Link href="/contact" className="sidebar-link" onClick={() => setIsSidebarOpen(false)}>تواصل معنا</Link>
        </div>

        {session && (
          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee' }}>
            <p style={{ fontSize: 14, color: "#4b5563", marginBottom: 16, fontWeight: "500", textAlign: "center" }}>{session.user.email}</p>
            <button 
              onClick={() => signOut()} 
              style={{
                width: '100%',
                fontSize: 15,
                fontWeight: "600",
                padding: "12px",
                background: "#fef2f2",
                color: "#ea4335",
                border: "1px solid #fca5a5",
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              تسجيل الخروج
            </button>
          </div>
        )}
      </div>
    </>
  );
}
