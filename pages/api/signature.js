import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// POST /api/signature
// body: { html: string }
// Sets the given HTML as the active Gmail signature for the signed-in user's
// primary sendAs alias.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.accessToken) {
    return res.status(401).json({ error: "غير مسجل الدخول" });
  }
  if (session.error === "RefreshAccessTokenError") {
    return res.status(401).json({ error: "الجلسة انتهت، سجل الدخول من جديد" });
  }

  const { html } = req.body;
  if (!html) {
    return res.status(400).json({ error: "ماكانش توقيع (html) فالطلب" });
  }

  try {
    console.log("🔍 Starting signature update process...");
    
    // 1. Find the user's primary sendAs alias (their own Gmail address)
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs",
      { 
        headers: { Authorization: `Bearer ${session.accessToken}` },
        method: "GET"
      }
    );
    
    if (!listRes.ok) {
      const errorData = await listRes.json();
      console.error("❌ Failed to fetch sendAs list:", errorData);
      return res.status(listRes.status).json({ error: errorData });
    }

    const listData = await listRes.json();
    console.log("✅ SendAs list fetched:", listData.sendAs?.length || 0, "addresses");

    const primary = (listData.sendAs || []).find((s) => s.isPrimary);
    if (!primary) {
      console.error("❌ No primary sendAs address found");
      return res.status(404).json({ error: "ما لقيتش الإيميل الأساسي" });
    }

    console.log("📧 Primary email:", primary.sendAsEmail);

    // 2. Patch the signature for that alias
    const patchRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${encodeURIComponent(
        primary.sendAsEmail
      )}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          signature: html,
          displayName: primary.displayName,
          replyToAddress: primary.replyToAddress
        }),
      }
    );
    
    if (!patchRes.ok) {
      const errorData = await patchRes.json();
      console.error("❌ Failed to patch signature:", errorData);
      return res.status(patchRes.status).json({ error: errorData });
    }

    const patchData = await patchRes.json();
    console.log("✅ Signature updated successfully");

    return res.status(200).json({ 
      ok: true, 
      email: primary.sendAsEmail,
      message: "تم تحديث التوقيع بنجاح"
    });
  } catch (err) {
    console.error("💥 Server error:", err);
    return res.status(500).json({ 
      error: "خطأ فالسيرفر",
      details: err.message
    });
  }
}
