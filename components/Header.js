import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header({ isRtl }) {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "الرئيسية", href: "#" },
    { label: "عن الموقع", href: "#" },
    { label: "التوقيعات", href: "#" },
    { label: "تواصل معنا", href: "#" },
  ];

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    flexDirection: isRtl ? "row-reverse" : "row",
    gap: 24,
    position: "relative",
    zIndex: 100,
    flexWrap: "wrap",
  };

  const logoStyle = {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: 12,
    margin: 0,
  };

  const navContainerStyle = {
    display: "flex",
    gap: 24,
    alignItems: "center",
    flexDirection: isRtl ? "row-reverse" : "row",
    flex: 1,
    justifyContent: "flex-end",
  };

  const navLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: "500",
    padding: "8px 0",
    borderBottom: "2px solid transparent",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "inline-block",
  };

  const hamburgerStyle = {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  };

  const hamburgerBarStyle = {
    width: 24,
    height: 2.5,
    background: "#fff",
    borderRadius: 2,
    transition: "all 0.3s ease",
  };

  const mobileMenuStyle = {
    display: mobileMenuOpen ? "flex" : "none",
    flexDirection: "column",
    position: "absolute",
    top: "100%",
    [isRtl ? "right" : "left"]: 0,
    width: "100%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "16px 24px",
    gap: 12,
    boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
    zIndex: 99,
  };

  const mobileLinkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: "500",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  };

  const sessionContainerStyle = {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexDirection: isRtl ? "row-reverse" : "row",
  };

  const logoutButtonStyle = {
    fontSize: 12,
    padding: "6px 12px",
    background: "#fff",
    color: "#667eea",
    border: "none",
    borderRadius: 4,
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const signInButtonStyle = {
    fontSize: 12,
    padding: "6px 12px",
    background: "#fff",
    color: "#667eea",
    border: "none",
    borderRadius: 4,
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const emailStyle = {
    fontSize: 12,
    color: "#fff",
    display: "none",
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .hamburger-button {
            display: flex !important;
          }
          .nav-container {
            display: none !important;
          }
          .header-wrapper {
            flex-wrap: nowrap !important;
          }
          .email-display {
            display: none !important;
          }
          .session-container-mobile {
            display: flex !important;
          }
          .session-container-desktop {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .session-container-mobile {
            display: none !important;
          }
          .session-container-desktop {
            display: flex !important;
          }
        }

        .nav-link {
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: #fff;
          transition: width 0.3s ease;
          ${isRtl ? 'right: 0;' : 'left: 0;'}
        }

        .nav-link:hover::after {
          width: 100%;
        }

        button {
          transition: all 0.3s ease;
        }

        .logout-btn:hover, .signin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .logout-btn:active, .signin-btn:active {
          transform: translateY(0);
        }
      `}</style>

      <header style={headerStyle} className="header-wrapper">
        <a href="/" style={logoStyle} title="الرئيسية">
          <span>✨</span>
          <span style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1 }}>
            <span style={{ fontSize: 20 }}>مبدّل</span>
            <span style={{ fontSize: 14, fontWeight: "400", opacity: 0.9 }}>التوقيعات</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div style={navContainerStyle} className="nav-container">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              style={navLinkStyle}
              className="nav-link"
              onMouseEnter={(e) => {
                e.target.style.color = "#fff";
                e.target.style.borderBottomColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#fff";
                e.target.style.borderBottomColor = "transparent";
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Desktop Session */}
          {status !== "loading" && (
            <div style={sessionContainerStyle} className="session-container-desktop">
              {session ? (
                <>
                  <span style={emailStyle} className="email-display">
                    {session.user.email}
                  </span>
                  <button
                    onClick={() => signOut()}
                    style={logoutButtonStyle}
                    className="logout-btn"
                    onMouseEnter={(e) => {
                      e.target.style.background = "#f0f4ff";
                      e.target.style.color = "#667eea";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#fff";
                      e.target.style.color = "#667eea";
                    }}
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  style={signInButtonStyle}
                  className="signin-btn"
                  onMouseEnter={(e) => {
                    e.target.style.background = "#f0f4ff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fff";
                  }}
                >
                  🔐 دخول
                </button>
              )}
            </div>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          style={hamburgerStyle}
          className="hamburger-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="تبديل القائمة"
        >
          <span
            style={{
              ...hamburgerBarStyle,
              transform: mobileMenuOpen ? "rotate(45deg) translateY(12px)" : "none",
            }}
          />
          <span
            style={{
              ...hamburgerBarStyle,
              opacity: mobileMenuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...hamburgerBarStyle,
              transform: mobileMenuOpen ? "rotate(-45deg) translateY(-12px)" : "none",
            }}
          />
        </button>

        {/* Mobile Session Icon */}
        {status !== "loading" && (
          <div style={sessionContainerStyle} className="session-container-mobile">
            {session ? (
              <button
                onClick={() => signOut()}
                style={{ ...signInButtonStyle, padding: "8px 16px", fontSize: 13 }}
                className="logout-btn"
              >
                خروج
              </button>
            ) : (
              <button
                onClick={() => signIn("google")}
                style={{ ...signInButtonStyle, padding: "8px 16px", fontSize: 13 }}
                className="signin-btn"
              >
                دخول
              </button>
            )}
          </div>
        )}

        {/* Mobile Menu */}
        <div style={mobileMenuStyle}>
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              style={mobileLinkStyle}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {session && (
            <div style={{ paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", margin: "8px 0" }}>
                {session.user.email}
              </p>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
