// Professional email signature templates
// 3-column layout: Logo | Text | Social Icons
// Automatically adapts to RTL/LTR via dir attribute

function safe(v, fallback = "") {
  return v && v.trim() ? v.trim() : fallback;
}

export const TEMPLATES = [
  { id: "modern-gradient", label: "☕ كريمي وبني", lang: "both" },
  { id: "professional-light", label: "💼 احترافي فاتح", lang: "both" },
  { id: "minimalist-dark", label: "🖤 بسيط داكن", lang: "both" },
  { id: "luxury-gold", label: "🌸 وردي وبنفسجي", lang: "both" },
  { id: "professional-card", label: "🎴 بطاقة احترافية", lang: "both" },
];

const SOCIAL_ICONS = {
  instagram: {
    icon: "https://cdn.simpleicons.org/instagram/FFFFFF",
    iconDark: "https://cdn.simpleicons.org/instagram/E4405F",
    bg: "#E4405F",
    url: (h) => `https://instagram.com/${h.replace("@", "")}`,
  },
  linkedin: {
    icon: "https://cdn.simpleicons.org/linkedin/FFFFFF",
    iconDark: "https://cdn.simpleicons.org/linkedin/0A66C2",
    bg: "#0A66C2",
    url: (h) => `https://linkedin.com/in/${h.replace("@", "")}`,
  },
  twitter: {
    icon: "https://cdn.simpleicons.org/x/FFFFFF",
    iconDark: "https://cdn.simpleicons.org/x/000000",
    bg: "#000000",
    url: (h) => `https://twitter.com/${h.replace("@", "")}`,
  },
  facebook: {
    icon: "https://cdn.simpleicons.org/facebook/FFFFFF",
    iconDark: "https://cdn.simpleicons.org/facebook/1877F2",
    bg: "#1877F2",
    url: (h) => `https://facebook.com/${h.replace("@", "")}`,
  },
  snapchat: {
    icon: "https://cdn.simpleicons.org/snapchat/000000",
    iconDark: "https://cdn.simpleicons.org/snapchat/000000",
    bg: "#FFFC00",
    url: (h) => `https://snapchat.com/add/${h.replace("@", "")}`,
  },
  tiktok: {
    icon: "https://cdn.simpleicons.org/tiktok/FFFFFF",
    iconDark: "https://cdn.simpleicons.org/tiktok/000000",
    bg: "#000000",
    url: (h) => `https://tiktok.com/@${h.replace("@", "")}`,
  },
};

function buildSocialColumn(data, mode = "filled", size = 28, gap = 6) {
  const entries = [];
  if (data.instagram) entries.push({ key: "instagram", handle: data.instagram });
  if (data.linkedin) entries.push({ key: "linkedin", handle: data.linkedin });
  if (data.twitter) entries.push({ key: "twitter", handle: data.twitter });
  if (data.facebook) entries.push({ key: "facebook", handle: data.facebook });
  if (data.snapchat) entries.push({ key: "snapchat", handle: data.snapchat });
  if (data.tiktok) entries.push({ key: "tiktok", handle: data.tiktok });
  if (entries.length === 0) return "";

  const iconSize = Math.round(size * 0.55);

  const rows = entries
    .map((e) => {
      const s = SOCIAL_ICONS[e.key];
      const href = s.url(e.handle);

      if (mode === "filled") {
        return `<tr><td style="padding:0 0 ${gap}px 0;">
          <a href="${href}" target="_blank" style="text-decoration:none;display:block;">
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
              <tr><td width="${size}" height="${size}" align="center" valign="middle" style="width:${size}px;height:${size}px;background-color:${s.bg};border-radius:6px;text-align:center;vertical-align:middle;">
                <img src="${s.icon}" alt="${e.key}" width="${iconSize}" height="${iconSize}" style="display:block;margin:0 auto;border:0;outline:none;" />
              </td></tr>
            </table>
          </a>
        </td></tr>`;
      }
      return `<tr><td style="padding:0 0 ${gap}px 0;">
        <a href="${href}" target="_blank" style="text-decoration:none;display:block;">
          <img src="${s.iconDark}" alt="${e.key}" width="${iconSize}" height="${iconSize}" style="display:block;border:0;outline:none;" />
        </a>
      </td></tr>`;
    })
    .join("");

  return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">${rows}</table>`;
}

export function buildSignatureHtml(templateId, data, direction = "rtl") {
  const name = safe(data.name, "الاسم الكامل");
  const title = safe(data.title, "المسمى الوظيفي");
  const phone = safe(data.phone, "+213 0X XX XX XX");
  const email = safe(data.email, "votre@email.com");
  const website = safe(data.website, "votresite.com");
  const logoUrl = safe(data.logoUrl, "");
  const dotUrl = safe(data.dotUrl, "");

  const websiteHref = website.startsWith("http") ? website : `https://${website}`;
  const isRtl = direction === "rtl";
  const dirStyle = isRtl ? "rtl" : "ltr";
  const textAlign = isRtl ? "right" : "left";

  // ───────────────────────────────────────
  // Template: Professional Card
  // ───────────────────────────────────────
  if (templateId === "professional-card") {
    const socialCol = buildSocialColumn(data, "filled", 30, 6);
    return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:${dirStyle};max-width:600px;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
  <tr>
    <td style="width:140px;vertical-align:top;padding:0;">
      ${logoUrl
        ? `<img src="${logoUrl}" width="140" height="160" style="display:block;width:140px;height:160px;object-fit:cover;border-radius:${isRtl ? "0 10px 10px 0" : "10px 0 0 10px"};" alt="${name}">`
        : `<div style="width:140px;height:160px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:table;border-radius:${isRtl ? "0 10px 10px 0" : "10px 0 0 10px"};"><div style="display:table-cell;vertical-align:middle;text-align:center;color:#fff;font-size:42px;font-weight:700;">${name.charAt(0)}</div></div>`}
    </td>
    <td style="padding:18px 22px;vertical-align:middle;text-align:${textAlign};width:100%;">
      <div style="font-size:18px;font-weight:700;color:#1a202c;letter-spacing:-0.3px;margin-bottom:3px;">${name}</div>
      <div style="font-size:12px;font-weight:600;color:#667eea;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">${title}</div>
      <div style="width:40px;height:3px;background:linear-gradient(90deg,#667eea,#764ba2);border-radius:2px;margin-bottom:14px;${isRtl ? "margin-right:0;margin-left:auto;" : ""}"></div>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12px;color:#4a5568;line-height:1.6;">
        <tr>
          <td style="padding:3px 0;white-space:nowrap;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✆</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#4a5568;text-decoration:none;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:3px 0;white-space:nowrap;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✉</span><a href="mailto:${email}" style="color:#667eea;text-decoration:none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:3px 0;white-space:nowrap;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">⊕</span><a href="${websiteHref}" style="color:#4a5568;text-decoration:none;">${website}</a></td>
        </tr>
      </table>
      ${dotUrl ? `<div style="margin-top:12px;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-${isRtl ? "left" : "right"}:6px;border-radius:50%;" alt="●"><span style="font-size:11px;color:#48bb78;font-weight:500;">متاح</span></div>` : ""}
    </td>
    ${socialCol ? `<td style="vertical-align:middle;padding:18px 20px;text-align:center;background:#f8fafc;border-${isRtl ? "right" : "left"}:1px solid #e2e8f0;">${socialCol}</td>` : ""}
  </tr>
</table>`;
  }

  // ───────────────────────────────────────
  // Template: Modern Gradient
  // ───────────────────────────────────────
  if (templateId === "modern-gradient") {
    const socialCol = buildSocialColumn(data, "filled", 28, 5);
    return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:${dirStyle};max-width:550px;border-radius:10px;overflow:hidden;border:1px solid #f2ece4;">
  <tr>
    <td style="background:linear-gradient(135deg,#ffffff 0%,#f9f3eb 100%);padding:0;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
        <tr>
          ${logoUrl ? `<td style="vertical-align:middle;padding:24px 16px;"><img src="${logoUrl}" width="64" height="64" style="border-radius:50%;border:3px solid #f2ece4;display:block;" alt="${name}"></td>` : ""}
          <td style="padding:24px 16px;vertical-align:middle;text-align:${textAlign};width:100%;">
            <div style="font-size:19px;font-weight:700;color:#4a332a;margin-bottom:4px;letter-spacing:-0.3px;">${name}</div>
            <div style="font-size:12px;color:#8c7b70;font-weight:600;margin-bottom:16px;">${title}</div>
            <div style="width:36px;height:2px;background:rgba(74,51,42,0.3);border-radius:2px;margin-bottom:16px;${isRtl ? "margin-right:0;margin-left:auto;" : ""}"></div>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12px;color:#5c4033;line-height:1.6;">
              <tr><td style="padding:3px 0;"><span style="color:#8b5a2b;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✆</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#5c4033;text-decoration:none;">${phone}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#8b5a2b;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✉</span><a href="mailto:${email}" style="color:#5c4033;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#8b5a2b;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">⊕</span><a href="${websiteHref}" style="color:#5c4033;text-decoration:none;">${website}</a></td></tr>
            </table>
            ${dotUrl ? `<div style="margin-top:14px;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-${isRtl ? "left" : "right"}:6px;border-radius:50%;" alt="●"><span style="font-size:11px;color:#8c7b70;">متاح الآن</span></div>` : ""}
          </td>
          ${socialCol ? `<td style="vertical-align:middle;padding:24px 20px;text-align:center;border-${isRtl ? "right" : "left"}:1px solid rgba(74,51,42,0.15);">${socialCol}</td>` : ""}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  }

  // ───────────────────────────────────────
  // Template: Professional Light
  // ───────────────────────────────────────
  if (templateId === "professional-light") {
    const socialCol = buildSocialColumn(data, "filled", 28, 5);
    return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:${dirStyle};max-width:550px;">
  <tr>
    <td style="width:4px;background:linear-gradient(180deg,#667eea 0%,#764ba2 100%);border-radius:4px;"></td>
    <td style="padding:0;background:#fafbfc;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
        <tr>
          ${logoUrl ? `<td style="vertical-align:middle;padding:20px 16px;"><img src="${logoUrl}" width="60" height="60" style="border-radius:8px;display:block;" alt="${name}"></td>` : ""}
          <td style="padding:20px 16px;text-align:${textAlign};vertical-align:middle;width:100%;">
            <div style="font-size:17px;font-weight:700;color:#1a202c;margin-bottom:3px;">${name}</div>
            <div style="font-size:12px;font-weight:600;color:#667eea;margin-bottom:14px;">${title}</div>
            <div style="width:36px;height:2px;background:linear-gradient(90deg,#667eea,#764ba2);border-radius:2px;margin-bottom:14px;${isRtl ? "margin-right:0;margin-left:auto;" : ""}"></div>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12px;color:#4a5568;line-height:1.6;">
              <tr><td style="padding:3px 0;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✆</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#4a5568;text-decoration:none;">${phone}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✉</span><a href="mailto:${email}" style="color:#667eea;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#667eea;font-weight:600;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">⊕</span><a href="${websiteHref}" style="color:#4a5568;text-decoration:none;">${website}</a></td></tr>
            </table>
            ${dotUrl ? `<div style="margin-top:12px;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-${isRtl ? "left" : "right"}:6px;border-radius:50%;" alt="●"><span style="font-size:11px;color:#48bb78;font-weight:500;">متاح</span></div>` : ""}
          </td>
          ${socialCol ? `<td style="vertical-align:middle;padding:20px 20px;text-align:center;border-${isRtl ? "right" : "left"}:1px solid #e2e8f0;">${socialCol}</td>` : ""}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
  }

  // ───────────────────────────────────────
  // Template: Minimalist Dark
  // ───────────────────────────────────────
  if (templateId === "minimalist-dark") {
    const socialCol = buildSocialColumn(data, "flat", 20, 8);
    return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:${dirStyle};max-width:550px;background:#111113;border-radius:10px;overflow:hidden;">
  <tr>
    ${logoUrl ? `<td style="vertical-align:middle;padding:24px 16px;"><img src="${logoUrl}" width="56" height="56" style="border-radius:50%;border:2px solid #333;display:block;" alt="${name}"></td>` : ""}
    <td style="padding:24px 16px;text-align:${textAlign};vertical-align:middle;width:100%;">
      <div style="font-size:18px;font-weight:700;color:#f0f0f0;letter-spacing:-0.3px;margin-bottom:3px;">${name}</div>
      <div style="font-size:11px;color:#888;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:16px;">${title}</div>
      <div style="width:30px;height:1px;background:#444;margin-bottom:16px;${isRtl ? "margin-right:0;margin-left:auto;" : ""}"></div>
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12px;color:#aaa;line-height:1.6;">
        <tr><td style="padding:3px 0;"><span style="color:#555;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✆</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#ccc;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:3px 0;"><span style="color:#555;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✉</span><a href="mailto:${email}" style="color:#8b8bff;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:3px 0;"><span style="color:#555;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">⊕</span><a href="${websiteHref}" style="color:#ccc;text-decoration:none;">${website}</a></td></tr>
      </table>
      ${dotUrl ? `<div style="margin-top:14px;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-${isRtl ? "left" : "right"}:6px;border-radius:50%;" alt="●"><span style="font-size:11px;color:#48bb78;">متاح</span></div>` : ""}
    </td>
    ${socialCol ? `<td style="vertical-align:middle;padding:24px 20px;text-align:center;border-${isRtl ? "right" : "left"}:1px solid #2d2d30;">${socialCol}</td>` : ""}
  </tr>
</table>`;
  }

  // ───────────────────────────────────────
  // Template: Luxury Pink (formerly Gold)
  // ───────────────────────────────────────
  const socialCol = buildSocialColumn(data, "filled", 28, 5);
  return `
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;direction:${dirStyle};max-width:550px;background:linear-gradient(160deg,#fff0f5 0%,#fce4ec 60%,#fff0f5 100%);border-radius:10px;overflow:hidden;border:1px solid #f9a8d4;">
  <tr>
    <td style="padding:0;border-${isRtl ? "right" : "left"}:3px solid #7e22ce;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
        <tr>
          ${logoUrl ? `<td style="vertical-align:middle;padding:24px 16px;"><img src="${logoUrl}" width="60" height="60" style="border-radius:4px;border:2px solid #7e22ce;display:block;" alt="${name}"></td>` : ""}
          <td style="padding:24px 16px;text-align:${textAlign};vertical-align:middle;width:100%;">
            <div style="font-size:18px;font-weight:700;color:#7e22ce;letter-spacing:-0.3px;margin-bottom:3px;">${name}</div>
            <div style="font-size:11px;color:#6b7280;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:16px;">${title}</div>
            <div style="width:40px;height:2px;background:linear-gradient(90deg,#7e22ce,transparent);margin-bottom:16px;${isRtl ? "margin-right:0;margin-left:auto;" : ""}"></div>
            <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-size:12px;color:#374151;line-height:1.7;">
              <tr><td style="padding:3px 0;"><span style="color:#7e22ce;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✆</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#374151;text-decoration:none;">${phone}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#7e22ce;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">✉</span><a href="mailto:${email}" style="color:#4b5563;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:3px 0;"><span style="color:#7e22ce;${isRtl ? "margin-left:8px;" : "margin-right:8px;"}">⊕</span><a href="${websiteHref}" style="color:#374151;text-decoration:none;">${website}</a></td></tr>
            </table>
            ${dotUrl ? `<div style="margin-top:14px;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-${isRtl ? "left" : "right"}:6px;border-radius:50%;" alt="●"><span style="font-size:11px;color:#7e22ce;">متاح لمشاريع جديدة</span></div>` : ""}
          </td>
          ${socialCol ? `<td style="vertical-align:middle;padding:24px 20px;text-align:center;border-${isRtl ? "right" : "left"}:1px solid #f9a8d4;">${socialCol}</td>` : ""}
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
