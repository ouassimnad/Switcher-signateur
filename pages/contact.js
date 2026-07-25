import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EmailIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

export default function Contact() {
  const containerStyle = {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
    maxWidth: 1000,
    margin: "0 auto",
    padding: "24px 16px",
  };



  const contactItems = [
    {
      Icon: EmailIcon,
      label: "البريد الإلكتروني",
      value: "contact@developpement.online",
      href: "mailto:contact@developpement.online",
      color: "#ea4335",
      bg: "#fef2f2",
    },
    {
      Icon: WhatsAppIcon,
      label: "واتساب",
      value: "0563413607",
      href: "https://wa.me/213563413607",
      color: "#25d366",
      bg: "#f0fdf4",
    },
    {
      Icon: PhoneIcon,
      label: "الهاتف",
      value: "0549023407",
      href: "tel:+213549023407",
      color: "#4285f4",
      bg: "#eff6ff",
    },
    {
      Icon: FacebookIcon,
      label: "فيسبوك",
      value: "صفحتنا على فيسبوك",
      href: "https://www.facebook.com/profile.php?id=100001825922593",
      color: "#1877f2",
      bg: "#eff6ff",
    },
    {
      Icon: InstagramIcon,
      label: "إنستغرام",
      value: "@ne__dev",
      href: "https://www.instagram.com/ne__dev?igsh=MXdzbTdmbWxmdXhidQ==",
      color: "#e4405f",
      bg: "#fef2f2",
    },
  ];

  return (
    <div style={containerStyle}>
      <Head>
        <title>تواصل معنا - Email Signature</title>
      </Head>
      <style>{`
        * { box-sizing: border-box; }
        
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .animate-header { animation: fadeInDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-section { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.1s; }
        .animate-section-2 { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s; }

        .section { margin-bottom: 28px; padding: 32px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f3f4f6; }
        .section:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        
        .section-title { font-size: 22px; font-weight: 600; margin-bottom: 20px; color: #1f2937; position: relative; padding-bottom: 8px; }
        .section-title::after { content: ''; position: absolute; bottom: 0; right: 0; width: 60px; height: 4px; background: linear-gradient(90deg, #4285f4, #ea4335); border-radius: 4px; }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 24px;
        }
        @media (max-width: 600px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          padding: 28px 20px;
          background: #fafafa;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .contact-card:hover {
          background: #ffffff;
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          border-color: transparent;
        }
        .contact-card:hover .contact-icon-wrap {
          transform: scale(1.1);
        }
        .contact-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }
        .contact-label {
          font-size: 13px;
          font-weight: 500;
          color: #9ca3af;
          letter-spacing: 0.3px;
        }
        .contact-value {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          direction: ltr;
        }
        .contact-card-full {
          grid-column: 1 / -1;
        }
      `}</style>

      <Header />

      <div className="section animate-section">
        <h2 className="section-title">تواصل معنا</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#4b5563', marginBottom: '8px' }}>
          يسعدنا تواصلك معنا! سواء كان لديك استفسار، اقتراح، أو تحتاج إلى مساعدة، لا تتردد في التواصل عبر أي من الوسائل التالية.
        </p>

        <div className="contact-grid">
          {contactItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-card ${index === 0 ? 'contact-card-full' : ''}`}
            >
              <div className="contact-icon-wrap" style={{ background: item.bg, color: item.color }}>
                <item.Icon />
              </div>
              <div className="contact-label">{item.label}</div>
              <div className="contact-value">{item.value}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="section animate-section-2" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.8' }}>
          ⏰ ساعات العمل: من الأحد إلى الخميس، 9:00 صباحاً - 5:00 مساءً
        </p>
        <p style={{ fontSize: '14px', color: '#9ca3af', marginTop: '8px' }}>
          سنقوم بالرد عليك في أقرب وقت ممكن 💙
        </p>
      </div>
      <Footer />
    </div>
  );
}
