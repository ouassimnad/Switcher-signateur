import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const containerStyle = {
    direction: "rtl",
    fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif",
    maxWidth: 1000,
    margin: "0 auto",
    padding: "24px 16px",
  };



  return (
    <div style={containerStyle}>
      <Head>
        <title>عن الموقع - Email Signature</title>
      </Head>
      <style>{`
        * { box-sizing: border-box; }
        
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .animate-header { animation: fadeInDown 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-section { opacity: 0; animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.1s; }

        .section { margin-bottom: 28px; padding: 32px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f3f4f6; }
        .section:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        
        .section-title { font-size: 22px; font-weight: 600; margin-bottom: 20px; color: #1f2937; position: relative; padding-bottom: 8px; }
        .section-title::after { content: ''; position: absolute; bottom: 0; right: 0; width: 60px; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2); border-radius: 4px; }
        
        .text-content { font-size: 16px; line-height: 1.8; color: #4b5563; }
        .feature-list { list-style: none; padding: 0; margin-top: 20px; }
        .feature-list li { margin-bottom: 12px; padding-right: 28px; position: relative; }
        .feature-list li::before { content: '✨'; position: absolute; right: 0; top: 0; }
        
        .back-link {
          display: inline-block;
          padding: 8px 16px;
          background: #f3f4f6;
          color: #374151;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }
        .back-link:hover {
          background: #e5e7eb;
          color: #1f2937;
        }
      `}</style>

      <Header />

      <div className="section animate-section">
        <h2 className="section-title">من نحن</h2>
        <div className="text-content">
          <p>
            أهلاً بك في <strong>Email Signature</strong>، الأداة الأسهل والأسرع لإنشاء وإدارة توقيعات البريد الإلكتروني الاحترافية لحسابات Gmail الخاصة بك.
          </p>
          <p>
            تم تصميم هذه المنصة لمساعدة الأفراد والشركات على ترك انطباع احترافي ودائم في كل رسالة بريد إلكتروني يرسلونها، من خلال قوالب عصرية وسهلة التخصيص.
          </p>
          
          <h3 style={{ marginTop: '32px', color: '#1f2937' }}>ماذا نقدم؟</h3>
          <ul className="feature-list">
            <li><strong>تكامل سلس مع Gmail:</strong> يمكنك تحديث توقيعك مباشرة بضغطة زر وبدون الحاجة لنسخ ولصق الأكواد المعقدة.</li>
            <li><strong>قوالب احترافية:</strong> مجموعة متنوعة من التصاميم الجاهزة التي تناسب كافة التخصصات والاحتياجات.</li>
            <li><strong>دعم اللغتين:</strong> إمكانية تصميم توقيعك باللغة العربية (من اليمين لليسار) أو الإنجليزية (من اليسار لليمين).</li>
            <li><strong>تخصيص كامل:</strong> أضف صورتك الشخصية، روابط حسابات التواصل الاجتماعي، ومختلف وسائل الاتصال الخاصة بك بسهولة.</li>
            <li><strong>حفظ تلقائي:</strong> نقوم بحفظ بياناتك محلياً لكي لا تفقدها وتتمكن من التعديل عليها في أي وقت.</li>
          </ul>

          <h3 style={{ marginTop: '32px', color: '#1f2937' }}>رؤيتنا</h3>
          <p>
            نسعى لتبسيط عملية إنشاء التوقيعات الرقمية وجعلها في متناول الجميع، إيماناً منا بأن الهوية البصرية الموحدة والاحترافية تعزز من موثوقية التواصل الرقمي وتدعم بناء العلاقات المهنية الناجحة.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
