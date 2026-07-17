// Each template takes the same `data` shape and returns a signature as
// an HTML string (table-based, inline styles only — required for email
// client compatibility, since <style> blocks get stripped by Gmail/Outlook).
//
// data = {
//   name, title, phone, email, website, instagram,
//   logoUrl,   // hosted https:// image URL (required for the image to show
//              // up for people who receive your emails — base64 works for
//              // preview but bloats every message)
//   dotUrl,    // optional hosted https:// animated GIF for the "available" dot
// }

function safe(v, fallback = "") {
  return v && v.trim() ? v.trim() : fallback;
}

export const TEMPLATES = [
  { id: "gold-minimal", label: "ذهبي فاخر" },
  { id: "clean-mono", label: "أسود و أبيض بسيط" },
  { id: "card-dark", label: "بطاقة داكنة" },
];

export function buildSignatureHtml(templateId, data) {
  const name = safe(data.name, "الاسم الكامل");
  const title = safe(data.title, "مطوّر ومصمم مواقع وحوانيت إلكترونية");
  const phone = safe(data.phone, "+213 0X XX XX XX XX");
  const email = safe(data.email, "votre@email.com");
  const website = safe(data.website, "votresite.com");
  const instagram = safe(data.instagram, "");
  const logoUrl = safe(data.logoUrl, "");
  const dotUrl = safe(data.dotUrl, "");

  const websiteHref = website.startsWith("http") ? website : `https://${website}`;

  if (templateId === "clean-mono") {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;direction:rtl;">
  <tr>
    <td style="padding-bottom:6px;">
      <span style="font-size:16px;font-weight:bold;color:#111;">${name}</span>
      <span style="font-size:12px;color:#777;">&nbsp;·&nbsp;${title}</span>
    </td>
  </tr>
  <tr><td style="border-top:1px solid #111;padding-top:6px;font-size:12px;color:#333;line-height:1.8;">
    ${phone} &nbsp;|&nbsp;
    <a href="mailto:${email}" style="color:#333;text-decoration:none;">${email}</a> &nbsp;|&nbsp;
    <a href="${websiteHref}" style="color:#333;text-decoration:none;">${website}</a>
    ${instagram ? ` &nbsp;|&nbsp; <a href="https://instagram.com/${instagram.replace("@","")}" style="color:#333;text-decoration:none;">@${instagram.replace("@","")}</a>` : ""}
  </td></tr>
</table>`.trim();
  }

  if (templateId === "card-dark") {
    return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;direction:rtl;background:#12110f;">
  <tr>
    <td style="padding:18px 20px;">
      <div style="font-size:16px;font-weight:bold;color:#ede7db;">${name}</div>
      <div style="font-size:12px;color:#b08d4f;margin-top:2px;">${title}</div>
      <div style="font-size:12px;color:#cfc9bb;margin-top:10px;line-height:1.9;">
        ${phone}<br>
        <a href="mailto:${email}" style="color:#cfc9bb;text-decoration:none;">${email}</a><br>
        <a href="${websiteHref}" style="color:#b08d4f;text-decoration:none;">${website}</a>
        ${instagram ? `<br><a href="https://instagram.com/${instagram.replace("@","")}" style="color:#cfc9bb;text-decoration:none;">@${instagram.replace("@","")}</a>` : ""}
      </div>
    </td>
  </tr>
</table>`.trim();
  }

  // default: gold-minimal
  return `
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-family:Tahoma,Arial,sans-serif;direction:rtl;">
  <tr>
    ${logoUrl ? `<td style="vertical-align:middle;padding-left:14px;" width="78">
      <img src="${logoUrl}" width="62" height="62" style="border-radius:50%;display:block;" alt="${name}">
    </td>` : ""}
    <td style="vertical-align:middle;${logoUrl ? "border-right:2px solid #b08d4f;padding-right:14px;" : ""}">
      <div style="font-size:16px;font-weight:bold;color:#12110f;">${name}</div>
      <div style="font-size:12.5px;color:#8c867a;margin-top:1px;">${title}</div>
      <div style="margin-top:8px;font-size:12.5px;color:#333;line-height:1.9;">
        📞 <a href="tel:${phone.replace(/\s/g,"")}" style="color:#333;text-decoration:none;">${phone}</a><br>
        ✉️ <a href="mailto:${email}" style="color:#333;text-decoration:none;">${email}</a><br>
        🌐 <a href="${websiteHref}" style="color:#333;text-decoration:none;">${website}</a>
        ${instagram ? `<br>📷 <a href="https://instagram.com/${instagram.replace("@","")}" style="color:#333;text-decoration:none;">@${instagram.replace("@","")}</a>` : ""}
      </div>
      ${dotUrl ? `<div style="margin-top:10px;font-size:11.5px;color:#3a8f5a;">
        <img src="${dotUrl}" width="10" height="10" style="vertical-align:middle;margin-left:5px;" alt="●">
        متاح لمشاريع جديدة
      </div>` : ""}
    </td>
  </tr>
</table>`.trim();
}
