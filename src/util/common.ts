export function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
