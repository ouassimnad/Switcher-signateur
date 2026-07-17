// Modern email signature templates with support for RTL/LTR
// Icons are rendered as SVG inline for better compatibility

function safe(v, fallback = "") {
  return v && v.trim() ? v.trim() : fallback;
}

// Modern SVG icons (inline for email compatibility)
const ICONS = {
  phone: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  email: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  globe: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 1 10 4.3M12 2a14.5 14.5 0 0 0-10 4.2M2 12h20M12 2v20"/></svg>`,
  instagram: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`,
  linkedin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>`,
  twitter: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-2 11-4.5a17.46 17.46 0 01-5-5Z"/></svg>`,
  facebook: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a6 6 0 00-6 6v9h-2v4h2v2h4v-2h3v-4h-3V8a1 1 0 011-1h3z"/></svg>`,
};

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
  const marginIcon = isRtl ? "margin-left" : "margin-right";
  const marginContent = isRtl ? "padding-right" : "padding-left";

  // Template: Modern Gradient
  if (templateId === "modern-gradient") {
    const socialLinks = [
      instagram ? `<a href="https://instagram.com/${instagram.replace("@", "")}" style="text-decoration:none;color:inherit;">${ICONS.instagram}</a>` : "",
      linkedin ? `<a href="https://linkedin.com/in/${linkedin.replace("@", "")}" style="text-decoration:none;color:inherit;">${ICONS.linkedin}</a>` : "",
      twitter ? `<a href="https://twitter.com/${twitter.replace("@", "")}" style="text-decoration:none;color:inherit;">${ICONS.twitter}</a>` : "",
      facebook ? `<a href="https://facebook.com/${facebook.replace("@", "")}" style="text-decoration:none;color:inherit;">${ICONS.facebook}</a>` : "",
    ].filter(l => l);

    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:${dirStyle};text-align:${textAlign};width:100%;max-width:500px;">
  <tr>
    <td style="padding:20px;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);border-radius:8px;">
      ${logoUrl ? `<div style="margin-bottom:12px;"><img src="${logoUrl}" width="60" height="60" style="border-radius:50%;border:3px solid #fff;display:block;${isRtl ? 'margin-left' : 'margin-right'}:auto;" alt="${name}"></div>` : ""}
      <div style="color:#fff;font-size:18px;font-weight:bold;margin-bottom:2px;">${name}</div>
      <div style="color:#e0e0ff;font-size:12px;margin-bottom:12px;">${title}</div>
      <div style="height:1px;background:#fff;opacity:0.3;margin-bottom:12px;"></div>
      <div style="color:#f0f0ff;font-size:12px;line-height:1.8;">
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#fff;">${ICONS.phone}</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#f0f0ff;text-decoration:none;vertical-align:middle;">${phone}</a></div>
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#fff;">${ICONS.email}</span><a href="mailto:${email}" style="color:#f0f0ff;text-decoration:none;vertical-align:middle;">${email}</a></div>
        <div><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#fff;">${ICONS.globe}</span><a href="${websiteHref}" style="color:#f0f0ff;text-decoration:none;vertical-align:middle;">${website}</a></div>
      </div>
      ${socialLinks.length > 0 ? `<div style="margin-top:12px;display:flex;gap:10px;flex-direction:${isRtl ? "row-reverse" : "row"};color:#fff;">${socialLinks.join("")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#fff;opacity:0.9;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;${marginIcon}:6px;border-radius:50%;" alt="●"> متاح الآن</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Professional Light
  if (templateId === "professional-light") {
    const socialLinks = [
      instagram ? `<a href="https://instagram.com/${instagram.replace("@", "")}" style="text-decoration:none;color:#667eea;${marginIcon}:8px;">${ICONS.instagram}</a>` : "",
      linkedin ? `<a href="https://linkedin.com/in/${linkedin.replace("@", "")}" style="text-decoration:none;color:#667eea;${marginIcon}:8px;">${ICONS.linkedin}</a>` : "",
      twitter ? `<a href="https://twitter.com/${twitter.replace("@", "")}" style="text-decoration:none;color:#667eea;${marginIcon}:8px;">${ICONS.twitter}</a>` : "",
      facebook ? `<a href="https://facebook.com/${facebook.replace("@", "")}" style="text-decoration:none;color:#667eea;${marginIcon}:8px;">${ICONS.facebook}</a>` : "",
    ].filter(l => l);

    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:${dirStyle};text-align:${textAlign};width:100%;max-width:500px;border-left:4px solid #667eea;">
  <tr>
    <td style="padding:16px 20px;background:#f9fafb;">
      ${logoUrl ? `<div style="margin-bottom:12px;"><img src="${logoUrl}" width="50" height="50" style="border-radius:4px;display:block;${isRtl ? 'margin-left' : 'margin-right'}:auto;" alt="${name}"></div>` : ""}
      <div style="color:#1f2937;font-size:16px;font-weight:600;margin-bottom:2px;">${name}</div>
      <div style="color:#667eea;font-size:12px;font-weight:500;margin-bottom:10px;">${title}</div>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
        <tr>
          <td style="padding:4px 0;color:#374151;font-size:12px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#667eea;">${ICONS.phone}</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#374151;text-decoration:none;vertical-align:middle;">${phone}</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#374151;font-size:12px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#667eea;">${ICONS.email}</span><a href="mailto:${email}" style="color:#667eea;text-decoration:none;vertical-align:middle;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#374151;font-size:12px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#667eea;">${ICONS.globe}</span><a href="${websiteHref}" style="color:#374151;text-decoration:none;vertical-align:middle;">${website}</a></td>
        </tr>
      </table>
      ${socialLinks.length > 0 ? `<div style="margin-top:10px;display:flex;gap:4px;flex-direction:${isRtl ? "row-reverse" : "row"};">${socialLinks.join("")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:8px;font-size:11px;color:#6b7280;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;${marginIcon}:6px;border-radius:50%;" alt="●"> متاح</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Minimalist Dark
  if (templateId === "minimalist-dark") {
    const socialLinks = [
      instagram ? `<a href="https://instagram.com/${instagram.replace("@", "")}" style="text-decoration:none;color:#fff;${marginIcon}:10px;">${ICONS.instagram}</a>` : "",
      linkedin ? `<a href="https://linkedin.com/in/${linkedin.replace("@", "")}" style="text-decoration:none;color:#fff;${marginIcon}:10px;">${ICONS.linkedin}</a>` : "",
      twitter ? `<a href="https://twitter.com/${twitter.replace("@", "")}" style="text-decoration:none;color:#fff;${marginIcon}:10px;">${ICONS.twitter}</a>` : "",
      facebook ? `<a href="https://facebook.com/${facebook.replace("@", "")}" style="text-decoration:none;color:#fff;${marginIcon}:10px;">${ICONS.facebook}</a>` : "",
    ].filter(l => l);

    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:${dirStyle};text-align:${textAlign};width:100%;max-width:500px;background:#1a1a1a;border-radius:6px;overflow:hidden;">
  <tr>
    <td style="padding:20px;">
      ${logoUrl ? `<div style="margin-bottom:16px;"><img src="${logoUrl}" width="56" height="56" style="border-radius:50%;border:2px solid #444;display:block;${isRtl ? 'margin-left' : 'margin-right'}:auto;" alt="${name}"></div>` : ""}
      <div style="color:#fff;font-size:17px;font-weight:bold;margin-bottom:4px;">${name}</div>
      <div style="color:#aaa;font-size:12px;margin-bottom:14px;">${title}</div>
      <div style="color:#ccc;font-size:12px;line-height:1.8;">
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#888;">${ICONS.phone}</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#ccc;text-decoration:none;vertical-align:middle;">${phone}</a></div>
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#888;">${ICONS.email}</span><a href="mailto:${email}" style="color:#aaa;text-decoration:none;vertical-align:middle;">${email}</a></div>
        <div><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#888;">${ICONS.globe}</span><a href="${websiteHref}" style="color:#ccc;text-decoration:none;vertical-align:middle;">${website}</a></div>
      </div>
      ${socialLinks.length > 0 ? `<div style="margin-top:14px;display:flex;gap:8px;flex-direction:${isRtl ? "row-reverse" : "row"};">${socialLinks.join("")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#888;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;${marginIcon}:6px;border-radius:50%;" alt="●"> متاح</div>` : ""}
    </td>
  </tr>
</table>`;
  }

  // Template: Luxury Gold (default)
  const socialLinks = [
    instagram ? `<a href="https://instagram.com/${instagram.replace("@", "")}" style="text-decoration:none;color:#d4af37;${marginIcon}:8px;">${ICONS.instagram}</a>` : "",
    linkedin ? `<a href="https://linkedin.com/in/${linkedin.replace("@", "")}" style="text-decoration:none;color:#d4af37;${marginIcon}:8px;">${ICONS.linkedin}</a>` : "",
    twitter ? `<a href="https://twitter.com/${twitter.replace("@", "")}" style="text-decoration:none;color:#d4af37;${marginIcon}:8px;">${ICONS.twitter}</a>` : "",
    facebook ? `<a href="https://facebook.com/${facebook.replace("@", "")}" style="text-decoration:none;color:#d4af37;${marginIcon}:8px;">${ICONS.facebook}</a>` : "",
  ].filter(l => l);

  return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:'Segoe UI',Tahoma,Arial,sans-serif;direction:${dirStyle};text-align:${textAlign};width:100%;max-width:500px;background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);border:1px solid #d4af37;border-radius:4px;">
  <tr>
    <td style="padding:20px;border-${isRtl ? "right" : "left"}:3px solid #d4af37;">
      ${logoUrl ? `<div style="margin-bottom:14px;"><img src="${logoUrl}" width="54" height="54" style="border-radius:2px;border:2px solid #d4af37;display:block;${isRtl ? 'margin-left' : 'margin-right'}:auto;" alt="${name}"></div>` : ""}
      <div style="color:#d4af37;font-size:16px;font-weight:bold;margin-bottom:2px;">${name}</div>
      <div style="color:#aaa;font-size:11px;font-weight:500;letter-spacing:0.5px;margin-bottom:12px;text-transform:uppercase;">${title}</div>
      <div style="height:1px;background:#d4af37;opacity:0.3;margin-bottom:12px;"></div>
      <div style="color:#ddd;font-size:12px;line-height:1.9;">
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#d4af37;">${ICONS.phone}</span><a href="tel:${phone.replace(/\s/g, "")}" style="color:#ddd;text-decoration:none;vertical-align:middle;">${phone}</a></div>
        <div style="margin-bottom:6px;"><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#d4af37;">${ICONS.email}</span><a href="mailto:${email}" style="color:#aaa;text-decoration:none;vertical-align:middle;">${email}</a></div>
        <div><span style="display:inline-block;${marginIcon}:6px;vertical-align:middle;color:#d4af37;">${ICONS.globe}</span><a href="${websiteHref}" style="color:#ddd;text-decoration:none;vertical-align:middle;">${website}</a></div>
      </div>
      ${socialLinks.length > 0 ? `<div style="margin-top:12px;display:flex;gap:8px;flex-direction:${isRtl ? "row-reverse" : "row"};">${socialLinks.join("")}</div>` : ""}
      ${dotUrl ? `<div style="margin-top:12px;font-size:11px;color:#aaa;"><img src="${dotUrl}" width="8" height="8" style="vertical-align:middle;${marginIcon}:6px;border-radius:50%;" alt="●"> متاح لمشاريع جديدة</div>` : ""}
    </td>
  </tr>
</table>`;
}
