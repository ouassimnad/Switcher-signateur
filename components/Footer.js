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
        .social-icons {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }
        @media (max-width: 768px) {
          .social-icons {
            justify-content: center;
          }
        }
        .social-icons a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f3f4f6;
          color: #4b5563;
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-icons a:hover {
          background: #4285f4;
          color: #ffffff;
          transform: translateY(-2px);
        }
      `}</style>
      
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div>
            <div className="logo-container">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" width="24" height="24" style={{ background: "#f3f4f6", padding: "4px", borderRadius: "6px" }} />
              <h3 className="footer-title" style={{ margin: 0 }}>Email Signature</h3>
            </div>
            <p className="footer-text">
              منصتك الأولى لإنشاء تواقيع بريد إلكتروني احترافية ومتوافقة تماماً مع حسابات Gmail الخاصة بك بخطوات بسيطة وبأكثر من قالب عصري.
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
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {currentYear} Email Signature. جميع الحقوق محفوظة.</div>
          <div style={{ marginTop: '8px', fontSize: '13px' }}>
            Developed by <a href="https://www.instagram.com/ne__dev?igsh=MXdzbTdmbWxmdXhidQ==" target="_blank" rel="noopener noreferrer" style={{ color: '#4285f4', textDecoration: 'none', fontWeight: '600' }}>Ne__dev</a>
          </div>
        </div>
      </footer>
    </>
  );
}
