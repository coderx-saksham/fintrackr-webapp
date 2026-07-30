/** Returns true if value looks like an image URL / path, not an emoji */
export function isImageUrl(value) {
  if (!value || typeof value !== "string") return false;
  const v = value.trim();
  if (!v) return false;
  if (/^https?:\/\//i.test(v)) return true;
  if (v.startsWith("data:image")) return true;
  if (v.startsWith("blob:")) return true;
  if (v.startsWith("/")) return true;
  if (/\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/i.test(v)) return true;
  return false;
}

export function isEmoji(value) {
  if (!value || typeof value !== "string") return false;
  if (isImageUrl(value)) return false;
  // Anything short non-url is treated as emoji / text glyph
  return value.trim().length > 0 && value.trim().length <= 8;
}
