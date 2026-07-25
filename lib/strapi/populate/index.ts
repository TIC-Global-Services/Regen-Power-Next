export function populate(...fragments: string[]): string {
  return fragments.filter(Boolean).join("&");
}
