// controllers/groupLinks.js
const groupLinks = {
  "6_english": "https://chat.whatsapp.com/invite/xxxxxxx",
  "6_sinhala": "https://chat.whatsapp.com/invite/yyyyyyy",
  "7_english": "https://chat.whatsapp.com/invite/zzzzzzz",
  "7_sinhala": "https://chat.whatsapp.com/invite/zzzzzzz",
  // add more as needed
};

function getGroupLink(grade, medium) {
  if (!grade || !medium) {
    console.warn("Grade or medium is missing!", { grade, medium });
    return null; // safely return null
  }
  const key = `${grade}_${medium.toLowerCase()}`;
  return groupLinks[key] || null; // returns null if not found
}

module.exports = { getGroupLink };
