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
    // 1. Find the user's primary sendAs alias (their own Gmail address)
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs",
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const listData = await listRes.json();
    if (!listRes.ok) {
      return res.status(listRes.status).json({ error: listData });
    }

    const primary = (listData.sendAs || []).find((s) => s.isPrimary);
    if (!primary) {
      return res.status(404).json({ error: "ما لقيتش الإيميل الأساسي" });
    }

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
        body: JSON.stringify({ signature: html }),
      }
    );
    const patchData = await patchRes.json();
    if (!patchRes.ok) {
      return res.status(patchRes.status).json({ error: patchData });
    }

    return res.status(200).json({ ok: true, email: primary.sendAsEmail });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "خطأ فالسيرفر" });
  }
}
