const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const MARKUP = /<\/?[a-z][^>]*>/gi;

/** Normalize untrusted form text. React still escapes all output by default. */
export function sanitizeText(value: string, maxLength: number) {
  return value.replace(CONTROL_CHARS, ' ').replace(MARKUP, '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function sanitizePhone(value: string) {
  return value.replace(/[^0-9+()\-\s.]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
}

export function isBusinessEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}
