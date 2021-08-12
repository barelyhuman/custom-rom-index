export function normaliseSearchableString(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[-_.()\[\] ]/g, "");
}
