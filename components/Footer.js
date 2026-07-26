import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        .footer-wrapper {
          margin-top: 60px;
          padding: 40px 32px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.03);
          border: 1px solid #f3f4f6;
          border-top: 4px solid #4285f4;
          direction: rtl;
          font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
        }
        .footer-content {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 32px;
          margin-bottom: 32px;
        }
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-text-ltr {
            text-align: center !important;
          }
          .logo-container {
            justify-content: center !important;
          }
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          justify-content: flex-start;
        }
        .footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
        }
        .footer-text {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
        }
        .footer-text-ltr {
          direction: ltr;
          text-align: right;
        }
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          color: #4b5563;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .footer-links a:hover {
          color: #4285f4;
          transform: translateX(-4px);
        }
        .footer-bottom {
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 14px;
          color: #9ca3af;
        }
        .social-icons-container {
          display: inline-flex;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-top: 16px;
        }
        .social-icons {
          display: flex;
          gap: 12px;
        }
        @media (max-width: 768px) {
          .social-icons-container {
            justify-content: center;
            width: 100%;
          }
        }
        .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #ffffff;
          color: #4b5563;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
        }
        .social-icons a:hover {
          background: #4285f4;
          color: #ffffff;
          border-color: #4285f4;
          transform: translateY(-2px);
        }
      `}</style>
      
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div>
            <div className="logo-container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" width="24" height="24" style={{ background: "#f3f4f6", padding: "4px", borderRadius: "4px" }} />
              <h3 className="footer-title" style={{ margin: 0 }}>Email Signature</h3>
            </div>
            <p className="footer-text">
              منصتك الأولى لإنشاء تواقيع بريد إلكتروني احترافية ومتوافقة تماماً مع حسابات Gmail الخاصة بك بخطوات بسيطة وسهلة.
            </p>
          </div>
          
          <div>
            <h3 className="footer-title">روابط سريعة</h3>
            <ul className="footer-links">
              <li><Link href="/">الرئيسية</Link></li>
              <li><Link href="/about">عن الموقع</Link></li>
              <li><Link href="/contact">تواصل معنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="footer-title">تواصل معنا</h3>
            <p className="footer-text footer-text-ltr">
              contact@developpement.online
            </p>
            <p className="footer-text footer-text-ltr" style={{ marginTop: '8px' }}>
              +213 549 023 407
            </p>
            
            <div className="social-icons-container">
              <div className="social-icons">
                <a href="https://www.facebook.com/profile.php?id=100001825922593" target="_blank" rel="noopener noreferrer" title="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/ne__dev?igsh=MXdzbTdmbWxmdXhidQ==" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="https://wa.me/213563413607" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.78-1.48-1.694-1.653-1.992-.173-.299-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.711.228 1.36.196 1.871.119.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-3.183 0-6.185 1.313-8.433 3.558C3.313 10.996 2 13.998 2 17.181c0 .885.115 1.745.332 2.576l.035.148.588 2.153 2.236.58c.74.18 1.499.272 2.27.272h.004c3.183 0 6.185-1.313 8.433-3.558 2.248-2.245 3.561-5.247 3.561-8.43 0-2.054-.4-4.051-1.193-5.959-.793-1.907-1.926-3.612-3.328-5.014-1.402-1.402-3.107-2.535-5.014-3.328C13.232 2.4 11.235 2 9.181 2m8.342 13.472c-.149 1.339-.671 2.583-1.447 3.554-.776.971-1.79 1.747-2.972 2.247-1.182.5-2.455.759-3.771.759-1.008 0-1.99-.108-2.931-.32L3.74 21.74l.594-2.173c-.238-.931-.363-1.905-.363-2.904 0-2.631 1.032-5.107 2.91-6.985C7.76 6.778 10.236 5.746 12.867 5.746c2.631 0 5.107 1.032 6.985 2.91 1.878 1.878 2.91 4.354 2.91 6.985 0 1.316-.259 2.589-.759 3.771"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {currentYear} Email Signature. جميع الحقوق محفوظة.</div>
          <div style={{ marginTop: '8px', fontSize: '13px' }}>
            Developed by <a href="https://www.instagram.com/ne__dev?igsh=MXdzbTdmbWxmdXhidQ==" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4', textDecoration: 'none', fontWeight: '600' }}>Ne Dev</a>
          </div>
        </div>
      </footer>
    </>
  );
}
