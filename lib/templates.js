// Modern email signature templates with support for RTL/LTR
// Using emoji icons for better email client compatibility

function safe(v, fallback = "") {
  return v && v.trim() ? v.trim() : fallback;
}

export const TEMPLATES = [
  { id: "modern-gradient", label: "🌟 حديث ملون", lang: "both" },
  { id: "professional-light", label: "💼 احترافي فاتح", lang: "both" },
  { id: "minimalist-dark", label: "🖤 بسيط داكن", lang: "both" },
  { id: "luxury-gold", label: "✨ فاخر ذهبي", lang: "both" },
];

export function buildSignatureHtml(templateId, data, direction = "rtl") {
  const name = safe(data.name, "الاسم الكامل");
  const title = safe(data.title, "المسمى الوظيفي");
  const phone = safe(data.phone, "+213 0X XX XX XX");
  const email = safe(data.email, "votre@email.com");
  const website = safe(data.website, "votresite.com");
  const instagram = safe(data.instagram, "");
  const linkedin = safe(data.linkedin, "");
  const twitter = safe(data.twitter, "");
  const facebook = safe(data.facebook, "");
  const logoUrl = safe(data.logoUrl, "");
  const dotUrl = safe(data.dotUrl, "");

  const websiteHref = website.startsWith("http") ? website : `https://${website}`;
  const isRtl = direction === "rtl";
  const dirStyle = isRtl ? "rtl" : "ltr";
  const textAlign = isRtl ? "right" : "left";

  // Social links with emoji
  const socialHtml = [];
  if (instagram) {
    const igHandle = instagram.replace("@", "");
    socialHtml.push(`<a href="https://instagram.com/${igHandle}" style="text-decoration:none;color:#e1306c;margin:0 4px;font-size:13px;">📷 Instagram</a>`);
  }
  if (linkedin) {
    const liHandle = linkedin.replace("@", "");
    socialHtml.push(`<a href="https://linkedin.com/in/${liHandle}" style="text-decoration:none;color:#0a66c2;margin:0 4px;font-size:13px;">💼 LinkedIn</a>`);
  }
  if (twitter) {
    const twHandle = twitter.replace("@", "");
    socialHtml.push(`<a href="https://twitter.com/${twHandle}" style="text-decoration:none;color:#1da1f2;margin:0 4px;font-size:13px;">𝕏 Twitter</a>`);
  }
  if (facebook) {
    const fbHandle = facebook.replace("@", "");
    socialHtml.push(`<a href="https://facebook.com/${fbHandle}" style="text-decoration:none;color:#4267b2;margin:0 4px;font-size:13px;">f Facebook</a>`);
  }

  // Template: Modern Gradient
  if (templateId === "modern-gradient") {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Arial',sans-serif;direction:${dirStyle};width:100%;max-width:480px;">
  <tr>
    <td style="padding:24px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:8px;text-align:${textAlign};">
      ${logoUrl ? `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:16px;"><tr><td style="text-align:${textAlign};"><img src="${logoUrl}" width="64" height="64" style="border-radius:50%;border:3px solid #fff;display:inline-block;" alt="${name}"></td></tr></table>` : ""}
      <div style="color:#fff;font-size:18px;font-weight:bold;margin-bottom:4px;">${name}</div>
      <div style="color:#e0e0ff;font-size:13px;margin-bottom:14px;font-weight:500;">${title}</div>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.3);margin:12px 0;"/>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;color:#f0f0ff;font-size:12px;line-height:1.8;">
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">📱</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#f0f0ff;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">✉️</span><a href="mailto:${email}" style="color:#f0f0ff;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">🌐</span><a href="${websiteHref}" style="color:#f0f0ff;text-decoration:none;">${website}</a></td></tr>
      </table>
      ${socialHtml.length > 0 ? `<div style="margin-top:12px;font-size:12px;">${socialHtml.join(" | ")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#fff;opacity:0.9;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-right:6px;border-radius:50%;" alt="●"> متاح الآن</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Professional Light
  if (templateId === "professional-light") {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Arial',sans-serif;direction:${dirStyle};width:100%;max-width:480px;border-left:4px solid #667eea;">
  <tr>
    <td style="padding:18px 20px;background:#f9fafb;text-align:${textAlign};">
      ${logoUrl ? `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:14px;"><tr><td style="text-align:${textAlign};"><img src="${logoUrl}" width="56" height="56" style="border-radius:4px;display:inline-block;" alt="${name}"></td></tr></table>` : ""}
      <div style="color:#1f2937;font-size:16px;font-weight:600;margin-bottom:2px;">${name}</div>
      <div style="color:#667eea;font-size:13px;font-weight:500;margin-bottom:12px;">${title}</div>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;color:#374151;font-size:12px;line-height:1.8;">
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">📱</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#374151;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">✉️</span><a href="mailto:${email}" style="color:#667eea;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">🌐</span><a href="${websiteHref}" style="color:#374151;text-decoration:none;">${website}</a></td></tr>
      </table>
      ${socialHtml.length > 0 ? `<div style="margin-top:10px;font-size:11px;">${socialHtml.join(" | ")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:10px;font-size:11px;color:#6b7280;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-right:6px;border-radius:50%;" alt="●"> متاح</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Minimalist Dark
  if (templateId === "minimalist-dark") {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Arial',sans-serif;direction:${dirStyle};width:100%;max-width:480px;background:#1a1a1a;border-radius:6px;">
  <tr>
    <td style="padding:20px;text-align:${textAlign};">
      ${logoUrl ? `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:16px;"><tr><td style="text-align:${textAlign};"><img src="${logoUrl}" width="56" height="56" style="border-radius:50%;border:2px solid #444;display:inline-block;" alt="${name}"></td></tr></table>` : ""}
      <div style="color:#fff;font-size:17px;font-weight:bold;margin-bottom:4px;">${name}</div>
      <div style="color:#aaa;font-size:12px;margin-bottom:14px;">${title}</div>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;color:#ccc;font-size:12px;line-height:1.8;">
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">📱</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#ccc;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">✉️</span><a href="mailto:${email}" style="color:#aaa;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;">🌐</span><a href="${websiteHref}" style="color:#ccc;text-decoration:none;">${website}</a></td></tr>
      </table>
      ${socialHtml.length > 0 ? `<div style="margin-top:12px;font-size:11px;color:#888;">${socialHtml.join(" | ")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#888;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-right:6px;border-radius:50%;" alt="●"> متاح</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Luxury Gold (default)
  return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Arial',sans-serif;direction:${dirStyle};width:100%;max-width:480px;background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);border:1px solid #d4af37;border-radius:4px;">
  <tr>
    <td style="padding:20px;border-${isRtl ? "right" : "left"}:3px solid #d4af37;text-align:${textAlign};">
      ${logoUrl ? `<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;margin-bottom:14px;"><tr><td style="text-align:${textAlign};"><img src="${logoUrl}" width="56" height="56" style="border-radius:2px;border:2px solid #d4af37;display:inline-block;" alt="${name}"></td></tr></table>` : ""}
      <div style="color:#d4af37;font-size:16px;font-weight:bold;margin-bottom:2px;">${name}</div>
      <div style="color:#aaa;font-size:11px;font-weight:500;letter-spacing:0.5px;margin-bottom:12px;text-transform:uppercase;">${title}</div>
      <hr style="border:none;border-top:1px solid #d4af37;opacity:0.3;margin:12px 0;"/>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;color:#ddd;font-size:12px;line-height:1.9;">
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;color:#d4af37;">📱</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#ddd;text-decoration:none;">${phone}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;color:#d4af37;">✉️</span><a href="mailto:${email}" style="color:#aaa;text-decoration:none;">${email}</a></td></tr>
        <tr><td style="padding:4px 0;"><span style="margin-right:8px;color:#d4af37;">🌐</span><a href="${websiteHref}" style="color:#ddd;text-decoration:none;">${website}</a></td></tr>
      </table>
      ${socialHtml.length > 0 ? `<div style="margin-top:12px;font-size:11px;color:#d4af37;">${socialHtml.join(" | ")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#aaa;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;margin-right:6px;border-radius:50%;" alt="●"> متاح لمشاريع جديدة</div>` : ""}
    </td>
  </tr>
</table>`;
}
